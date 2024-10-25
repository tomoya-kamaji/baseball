import { gameHandlers } from '@/backend/feature/game/controller'
import { morphologicalHandlers } from '@/backend/feature/morphological'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

const route = app.get('/games', ...gameHandlers.getByTeamId)
const morphologicalRoute = app.post(
  '/morphological/add-furigana',
  ...morphologicalHandlers.addFurigana
)

export const GET = handle(app)

export type AppType = typeof route | typeof morphologicalRoute
