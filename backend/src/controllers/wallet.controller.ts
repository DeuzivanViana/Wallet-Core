import { db } from '../db/database'
import { WalletService } from '../services/wallet.service'
import { JwtProvider } from '../utils/jwt'

export const WalletController = {
  async getCurrentWallet({ cookie: { auth }, set }: any) {
    try {
      const user = await JwtProvider.verify(auth.value)
      
      if(!user) throw Error('No wallet found')

      const wallet = await WalletService.getWallet({owner_id: user.id})

      return { wallet }
    }
    catch(err) {
      set.status = 404
      return { msg: 'No wallet found or not valid token, try guess' }
    }
  }
}