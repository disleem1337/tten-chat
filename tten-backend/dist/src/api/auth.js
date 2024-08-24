import { Hono } from "hono";
import db from "../db.js";
const authRouter = new Hono();
authRouter.get("/", (c) => c.text("Hello auth"));
authRouter.get("/register", async (c) => {
    const { username, password } = await c.req.json();
    if (!username.trim() || !password.trim()) {
        return c.json({ error: "username and password are required" }, 400);
    }
    const res = await db
        .insertInto("user")
        .values({ username, password })
        .execute();
    return c.json(res);
});
export default authRouter;
