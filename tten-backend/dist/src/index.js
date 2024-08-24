import { Hono } from "hono";
import { serve } from "@hono/node-server";
import authRouter from "./api/auth.js";
const app = new Hono();
app.get("/", (c) => c.text("Hello"));
app.route("/api/auth", authRouter);
serve({ fetch: app.fetch, port: 5000 });
