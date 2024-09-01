import { Hono } from "hono";
import players from "./players";

const app = new Hono();

// プレイヤーエンドポイントを追加
app.route("/players", players);

export const GET = app;
export const POST = app;
