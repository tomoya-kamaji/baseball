import { Result, err, ok } from 'neverthrow'

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

const joinTeam = (user: InitUser, teamId: string): Result<ActiveUser, Error> => {
  if (teamId.length > 5) {
    return err(new Error('チームIDは5文字以下である必要があります'))
  }

  return ok({
    kind: 'active',
    id: user.id,
    name: user.name,
    teamId: teamId
  })
}

export { isInitUser, isActiveUser, type User, type InitUser, type ActiveUser, joinTeam }
