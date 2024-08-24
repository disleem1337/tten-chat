import { Context, Next } from "hono";
import jwt from "jsonwebtoken";

export const authMiddleware = async (c: Context, next: Next) => {
  const { authorization } = c.req.header();

  if (authorization) {
    try {
      const decoded = await jwt.verify(authorization, process.env.JWT_SECRET!);

      c.set("user", decoded);
      await next();
    } catch (err) {
      return c.json(
        {
          success: false,
          error: "Unauthorized",
        },
        401
      );
    }
  } else {
    return c.json(
      {
        success: false,
        error: "Unauthorized",
      },
      401
    );
  }
};
