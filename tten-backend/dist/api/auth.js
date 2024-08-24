import { Hono } from "hono";
import db from "../db.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { NoResultError } from "kysely";
const authRouter = new Hono();
authRouter.post("/login", async (c) => {
    const { username, password } = await c.req.json();
    if (!username?.trim() || !password?.trim()) {
        return c.json({ success: false, error: "username and password are required" }, 400);
    }
    try {
        const res = await db
            .selectFrom("user")
            .select(["user.username", "user.password"])
            .where("user.username", "=", username)
            .executeTakeFirstOrThrow();
        const compareResult = await compare(password, res.password);
        if (!compareResult) {
            return c.json({
                success: false,
                error: "username or password is incorrect",
            }, 401);
        }
        const data = { username: res.username };
        const token = jwt.sign({ username: res.username }, process.env.JWT_SECRET);
        return c.json({
            success: true,
            data: {
                authToken: token,
            },
        });
    }
    catch (err) {
        if (err.code === "SQLITE_CONSTRAINT_PRIMARYKEY") {
            return c.json({ success: false, error: "username already exists" }, 400);
        }
        if (err instanceof NoResultError) {
            return c.json({ success: false, error: "username or password is incorrect" }, 401);
        }
        return c.json({ success: false, error: "something went wrong" }, 500);
    }
});
authRouter.post("/register", async (c) => {
    const { username, password } = await c.req.json();
    if (!username?.trim() || !password?.trim()) {
        return c.json({ success: false, error: "username and password are required" }, 400);
    }
    try {
        const passwordHash = await hash(password, 10);
        const res = await db
            .insertInto("user")
            .values({ username, password: passwordHash })
            .execute();
        return c.json({
            success: true,
        });
    }
    catch (err) {
        if (err.code === "SQLITE_CONSTRAINT_PRIMARYKEY") {
            return c.json({ success: false, error: "username already exists" }, 400);
        }
        return c.json({ success: false, error: "something went wrong" }, 500);
    }
});
export default authRouter;
