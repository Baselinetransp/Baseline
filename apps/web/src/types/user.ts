import { authClient } from "@/lib/auth-client";

export type UserRole = "DRIVER" | "RECRUITER" | "ADMIN";

// Use the inferred session type from better-auth
export type Session = typeof authClient.$Infer.Session;

// Extended user type with role
export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role?: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  session: Session | null;
}
