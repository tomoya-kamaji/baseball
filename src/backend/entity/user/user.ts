type ActiveUser = {
  id: number
  name: string
}

type InitUser = {
  id: number
  name: string
  teamId: string
}

type User = ActiveUser | InitUser

export type { User, ActiveUser, InitUser }
