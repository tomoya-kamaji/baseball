import { hc } from 'hono/client'
import { AppType } from './api/[...route]/route'

export const honoClient = hc<AppType>('/')
