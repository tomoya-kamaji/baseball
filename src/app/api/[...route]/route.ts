import { Hono } from "hono";
import { handle } from "hono/vercel";
import { gameHandlers } from "../games";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// game
const route = app.get("/games", ...gameHandlers.getByTeamId);

export const GET = handle(app);

export type AppType = typeof route;
