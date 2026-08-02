import { db } from '../db/database'

type WalletProps = {
  owner_id: string
}

export const WalletService = {
  async createWallet(data: WalletProps) {
    const wallet = await db.wallet.create({
      data: {
        owner_id: data.owner_id
      }
    })

    return wallet
  },
  async getWallet(data: WalletProps) {
    const wallet = await db.wallet.findFirstOrThrow({
      where: {
        owner_id: data.owner_id
      }
    })

    return wallet
  }
}