import { zValidator } from '@hono/zod-validator'
import { createFactory } from 'hono/factory'
import { z } from 'zod'
import { addFurigana } from './usecase/addFrigana'

const factory = createFactory()

export const morphologicalHandlers = {
  // POST /api/morphological/add-furigana
  addFurigana: factory.createHandlers(
    zValidator('json', z.object({ text: z.string() })),
    async (c) => {
      const text = c.req.valid('json').text
      const furiganaText = await addFurigana(text)
      return c.json({ furiganaText })
    }
  )
}
