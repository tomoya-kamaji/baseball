import { Hono } from "hono";
import { getById } from "@/api/player";

const app = new Hono();

app.get("/:id", (c) => {
  const id = c.req.param("id");

  const player = getById(id);
  return c.json(player);
});

export default app;
