import { Hono } from "hono";
import { authMiddleware } from "../midlewares/auth.js";
import { HonoEnv } from "../types/hono.js";
import db from "../db.js";

const userRouter = new Hono<HonoEnv>();

userRouter.get("/", (c) => c.text("Hello user"));
userRouter.get("/me", authMiddleware, async (c) => {
  const username = c.get("user").username;

  const user = await db
    .selectFrom("user")
    .selectAll()
    .where("username", "=", username)
    .executeTakeFirstOrThrow();

  return c.json({
    success: true,
    data: {
      username: user.username,
      createdAt: user.createdAt,
    },
  });
});

export default userRouter;
