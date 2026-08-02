import { db } from '../db/database'

export const AuthService = {
  async registerUser(data: any) {
    const passwordHash = await Bun.password.hash(data.password, {
      algorithm: 'bcrypt',
      cost: 10
    })

    const user = await db.user.create({
      data: {
        username: data.username,
        displayName: data.displayName,
        passwordHash: passwordHash
      }
    })

    return user
  },
  async authenticateUser(data: any) {
    const user = await db.user.findFirstOrThrow({
      where: {
        username: data.username
      }
    })

    if(!await Bun.password.verify(data.password, user.passwordHash)) throw new Error('The passowrd it\'s no valid')

    const session = await db.session.create({
      data: {
        owner_id: user.id
      }
    })

    return user
  }
}