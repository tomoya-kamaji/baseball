type ActiveUser = {
  id: number
  name: string
  kind: 'active'
}

type InitUser = {
  id: number
  name: string
  teamId: string
  kind: 'init'
}

type User = ActiveUser | InitUser

const isInitUser = (user: User): user is InitUser => {
  return user.kind === 'init'
}

const isActiveUser = (user: User): user is ActiveUser => {
  return user.kind === 'active'
}

export { isInitUser, isActiveUser, type User, type InitUser, type ActiveUser }

const test = () => {
  // if (isInitUser(user)) {
}
