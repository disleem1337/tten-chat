import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import dotenv from "dotenv";
import authRouter from "./api/auth.js";
import { HonoEnv } from "./types/hono.js";
import userRouter from "./api/user.js";
dotenv.config();

const app = new Hono<HonoEnv>();

app.use(cors());

app.get("/", (c) => c.text("Hello"));
app.route("/api/auth", authRouter);
app.route("/api/user", userRouter);

serve({ fetch: app.fetch, port: 5000 });
