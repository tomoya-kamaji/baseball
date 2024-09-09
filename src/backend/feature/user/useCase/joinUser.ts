// ユーザーをチームに参加させる

import { createInputCommand, joinTeam } from '@/backend/entity/user'
import { Input } from 'hono'
import { okAsync, ok } from 'neverthrow'

// ワークフローを組み立てる
// const joinUserUseCase = (input: Input) =>
//   okAsync(input).andThen(createInputCommand()).andThen(joinTeam())
