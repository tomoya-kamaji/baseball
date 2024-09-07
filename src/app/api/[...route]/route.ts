import { gameHandlers } from '@/backend/feature/game/controller'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

const route = app.get('/games', ...gameHandlers.getByTeamId)

export const GET = handle(app)

export type AppType = typeof route
