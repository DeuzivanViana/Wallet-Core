import { db } from '../db/database'
import { ValidationError } from 'elysia'
import { AuthService } from '../services/auth.service'
import { WalletService } from '../services/wallet.service'
import { JwtProvider } from '../utils/jwt'

export const AuthController = {
  async signUp({jwt, body, set, cookie: { auth }}: any) {
    try {
      const user = await AuthService.registerUser(body)

      if(user) {
        const wallet = await WalletService.createWallet({ owner_id: user.id })
        console.log(wallet)

        set.status = 200
        return { msg: 'User successfully created, please sign-in' }
      }
      
    } catch(err) {
      set.status = 500
      return { msg: 'User already exists' }
    }
  },

  async signIn({ body, set, cookie: { auth }}: any) {
    try {
      const user = await AuthService.authenticateUser(body)
      
      const token = await JwtProvider.sign({
        id: user.id
      })
      
      auth.set({
        value: token,
        httpOnly: true,
        maxAge: 7 * 60 * 60 * 24,
        path: '/'
      })

      return { msg: 'Successfully logged' }

    } catch(err) {
      set.status = 404
      return { msg: 'User doesn\'t exists' }
    }
  }
}