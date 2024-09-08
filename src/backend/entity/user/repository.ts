import { PrismaClient, UserStatus } from '@prisma/client'
import { ResultAsync, ok } from 'neverthrow'
import { User, InitUser, ActiveUser, isInitUser, isActiveUser } from './user'

const prisma = new PrismaClient()

const findUserById = (id: string): ResultAsync<User, Error> => {
  return ResultAsync.fromPromise(
    prisma.user.findUniqueOrThrow({ where: { id } }),
    () => new Error('PrismaClientError')
  ).andThen((user) => {
    if (user.status === UserStatus.INIT) {
      return ok({
        id: user.id,
        name: user.name,
        kind: 'init'
      } as InitUser)
    } else {
      return ok({
        id: user.id,
        name: user.name,
        kind: 'active',
        teamId: '1'
      } as ActiveUser)
    }
  })
}

const createUser = (user: InitUser): ResultAsync<InitUser, Error> => {
  return ResultAsync.fromPromise(
    prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        status: UserStatus.INIT
      }
    }),
    () => new Error('PrismaClientError')
  ).map((createdUser) => {
    return {
      id: createdUser.id,
      name: createdUser.name,
      kind: 'init'
    }
  })
}

export { findUserById, createUser }
