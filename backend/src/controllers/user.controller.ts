import { db } from '../db/database'
import { JwtProvider } from '../utils/jwt'

export const UserController = {
  async getCurrentUser({ cookie: { auth } }: any) {
    try {
      const user = await JwtProvider.verify(auth.value)

      console.log(user)

      if(!user) throw Error('Not valid token')
        
      const user_finded = await db.user.findFirstOrThrow({
        where: {
          id: user.id
        }
      })

      return { user: user_finded }
    }
    catch(err) {

    }
  }
}