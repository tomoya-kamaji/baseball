import { Result, ResultAsync, err, ok } from 'neverthrow'
import { findUserById } from './repository'

type InitUser = {
  kind: 'init'
  id: string
  name: string
}

type ActiveUser = {
  kind: 'active'
  id: string
  name: string
  teamId: string
}
type User = ActiveUser | InitUser

const isInitUser = (user: User): user is InitUser => {
  return user.kind === 'init'
}

const isActiveUser = (user: User): user is ActiveUser => {
  return user.kind === 'active'
}

type Input = {
  userId: string
  teamId: string
}

// DBから必要情報を取得した状態
type InputCommand = {
  kind: 'InputCommand'
  user: InitUser
  teamId: string
}

type JoinTeam = {
  kind: 'JoinTeam'
  user: ActiveUser
}

const createInputCommand =
  () =>
  (input: Input): ResultAsync<InputCommand, Error> => {
    const { userId, teamId } = input
    return findUserById(userId).andThen((user) =>
      isInitUser(user)
        ? ok({
            kind: 'InputCommand',
            user,
            teamId
          } satisfies InputCommand)
        : err(new Error('既にチームに参加しています'))
    )
  }

// チームに参加させる
const joinTeam =
  () =>
  (command: InputCommand): Result<JoinTeam, Error> => {
    const { user, teamId } = command
    if (teamId.length > 5) {
      return err(new Error('チームIDは5文字以下である必要があります'))
    }
    const activeUser: ActiveUser = {
      kind: 'active',
      id: user.id,
      name: user.name,
      teamId: teamId
    }

    return ok({
      kind: 'JoinTeam',
      user: activeUser
    })
  }

export {
  type User,
  type InitUser,
  type ActiveUser,
  isInitUser,
  isActiveUser,
  joinTeam,
  createInputCommand
}
