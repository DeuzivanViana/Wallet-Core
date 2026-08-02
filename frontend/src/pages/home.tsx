'use client'

import { ChevronRight, CreditCard } from 'lucide-react'
import { Layout } from '../components/Layout'
import { useEffect, useState } from 'react'
import { UserService } from '../services/userService'
import { WalletService } from '../services/walletService'

export const Home = () => {
  const [user, setUser] = useState<any>()
  const [wallet, setWallet] = useState<any>(null)

  useEffect(() => {(async () => {
    const { data: user_data, response: user_response } = await UserService.getCurrentUser()
    const { data: wallet_data, response: wallet_response } = await WalletService.getCurrentWallet()

    if(user_response.status == 200 && wallet_response.status == 200)
    {
      setUser(user_data.user)
      setWallet(wallet_data.wallet)
    }
  })()}, [])

  return <Layout>
    <div className='p-6 bg-neutral-950 text-neutral-50 flex justify-between'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-neutral-400 uppercase'>Money</h1>
        <p className='text-sm font-bold'>{ wallet ? ('RHO ' + String(wallet?.balance)) : 'loading...' }</p>
      </div>

      <ChevronRight/>
    </div>
    <div className='bg-neutral-950 p-6 text-neutral-50'>
      { user ? 'Hello ' + user?.displayName : 'loading...' }
    </div>

    <div className='text-neutral-50 flex p-6 gap-4 bg-neutral-900 m-4 rounded-lg'>
      <CreditCard/>
      <p>My cards</p>
    </div>
  </Layout>
}