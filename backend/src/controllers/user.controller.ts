import { db } from '../db/database'

export const UserController = {
  async getCurrentUser({ jwt, cookie: { auth } }: any) {
    try {
      const user = await jwt.verify(auth.value)
      
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