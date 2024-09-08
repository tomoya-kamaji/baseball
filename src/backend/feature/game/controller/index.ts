import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { findGameUseCase } from '@/backend/feature/game/useCase'
import { createFactory } from 'hono/factory'

const factory = createFactory()

export const gameHandlers = {
  getByTeamId: factory.createHandlers(
    zValidator(
      'query',
      z.object({
        teamId: z.string().optional()
      })
    ),
    async (c) => {
      const teamId = c.req.query('teamId')
      const games = await findGameUseCase(teamId)
      return c.json(games)
    }
  ),
  getByTeamId: factory.createHandlers(
    zValidator(
      'query',
      z.object({
        teamId: z.string().optional()
      })
    ),
    async (c) => {
      const teamId = c.req.query('teamId')
      const games = await findGameUseCase(teamId)
      return c.json(games)
    }
  )
}
