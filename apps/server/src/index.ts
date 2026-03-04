import { createContext } from "@baseline/api/context";
import { appRouter } from "@baseline/api/routers/index";
import { auth } from "@baseline/auth";
import { env } from "@baseline/env/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import type { Express, Request, Response, NextFunction } from "express";
import { rateLimit  } from "express-rate-limit";
import type { RateLimitRequestHandler } from "express-rate-limit";
import helmet from "helmet";
import { v4 as uuidv4 } from "uuid";

// ============================================================================
// Configuration & Validation
// ============================================================================

const validateEnv = () => {
  if (!env.CORS_ORIGIN) {
    throw new Error("CORS_ORIGIN environment variable is required");
  }
};

validateEnv();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// ============================================================================
// Logging Utilities
// ============================================================================

type LogLevel = "info" | "warn" | "error" | "debug";

const log = (level: LogLevel, message: string, data?: Record<string, unknown>) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level: level.toUpperCase(),
    message,
    ...(data && { data }),
  };
  console.log(JSON.stringify(logEntry));
};

// ============================================================================
// Express App Setup
// ============================================================================

const app: Express = express();

// Security: Trust the first proxy (typically a load balancer)
app.set("trust proxy", 1);

// Security: Add security headers with helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
      },
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
  }),
);

// ============================================================================
// Middleware: Request ID & Logging
// ============================================================================

app.use((req: Request, res: Response, next: NextFunction) => {
  const requestId = req.headers["x-request-id"] || uuidv4();
  req.id = requestId as string;

  // Attach to response headers for client tracking
  res.setHeader("x-request-id", requestId);

  // Log incoming request
  log("info", "Incoming request", {
    requestId: req.id,
    method: req.method,
    path: req.path,
    ip: req.ip,
  });

  // Log response when finished
  res.on("finish", () => {
    log("info", "Response sent", {
      requestId: req.id,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
    });
  });

  next();
});

// Extend Express Request type for request ID
declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

// ============================================================================
// Rate Limiting Configuration
// ============================================================================

// Strict rate limiting for auth endpoints (higher per request sensitivity)
const authLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50, // More restrictive for auth
  standardHeaders: "draft-7",
  legacyHeaders: false,
  validate: { trustProxy: true, keyGeneratorIpFallback: false }, 
  skip: (req) => {
    // Skip health checks
    return req.path === "/";
  },
 keyGenerator: (req) => {
  const username = (req.body as any)?.username || (req.body as any)?.email || "";
  const ip = req.ip || "unknown";
  return username ? `${ip}:${username}` : ip;
},
  handler: (_req, res) => {
    res.status(429).json({
      error: "Too many authentication attempts. Please try again after 15 minutes.",
      retryAfter: 900,
    });
  },
});

// General API rate limiting (more permissive)
const apiLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 300, // Higher limit for general API usage
  standardHeaders: "draft-7",
  legacyHeaders: false,
  validate: { trustProxy: true, keyGeneratorIpFallback: false },
  skip: (req) => {
    // Skip health checks
    return req.path === "/";
  },
  handler: (_req, res) => {
    res.status(429).json({
      error: "Rate limit exceeded. Please try again later.",
      retryAfter: 900,
    });
  },
});

// ============================================================================
// Body & CORS Middleware
// ============================================================================

app.use(express.json({ limit: "10mb" }));

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-request-id"],
    credentials: true,
    maxAge: 86400, // 24 hours
  }),
);

// ============================================================================
// Route-Specific Rate Limiting
// ============================================================================

// Auth routes - stricter rate limiting
app.use("/api/auth", authLimiter);

// API routes - general rate limiting
app.use("/trpc", apiLimiter);

// ============================================================================
// Routes
// ============================================================================

// Health check (no rate limiting)
app.get("/", (_req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Health check endpoint for load balancers
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Authentication routes (middleware already applied via app.use above)
app.use("/api/auth", toNodeHandler(auth));

// tRPC routes
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

// ============================================================================
// Error Handling Middleware
// ============================================================================

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    error: "Not Found",
    statusCode: 404,
  });
});

// Global error handler (must be last)
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = (err as any).statusCode || 500;
  const isDevelopment = process.env.NODE_ENV === "development";

  log("error", "Unhandled error", {
    requestId: req.id,
    message: err.message,
    statusCode,
    stack: isDevelopment ? err.stack : undefined,
  });

  res.status(statusCode).json({
    error: isDevelopment ? err.message : "Internal Server Error",
    requestId: req.id,
    statusCode,
    ...(isDevelopment && { stack: err.stack }),
  });
});

// ============================================================================
// Server & Graceful Shutdown
// ============================================================================

const server = app.listen(PORT, () => {
  log("info", "Server started", {
    port: PORT,
    environment: process.env.NODE_ENV || "production",
    corsOrigin: env.CORS_ORIGIN,
  });
});

// Graceful shutdown handlers
const gracefulShutdown = (signal: string) => {
  log("warn", `${signal} received. Starting graceful shutdown...`, {});

  server.close(() => {
    log("info", "Server closed. Exiting process.", {});
    process.exit(0);
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    log("error", "Forcing shutdown after timeout", {});
    process.exit(1);
  }, 30000);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  log("error", "Uncaught exception", {
    message: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  log("error", "Unhandled rejection", {
    reason: String(reason),
    promise: String(promise),
  });
  process.exit(1);
});

export default app;