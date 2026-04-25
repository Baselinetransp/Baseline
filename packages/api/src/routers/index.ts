import { protectedProcedure, publicProcedure, router } from "../index";
import { todoRouter } from "./todo";
import { applicationsRouter } from "./application";
import { jobsRouter } from "./job";
import { usersRouter } from "./user";
import { bannerAdRouter } from "./banner-ad";


export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
  todo: todoRouter,
  applications: applicationsRouter,
  job: jobsRouter,
  users: usersRouter,
  bannerAd: bannerAdRouter,

});
export type AppRouter = typeof appRouter;
