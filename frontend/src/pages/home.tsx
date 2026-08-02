'use client'

import { Layout } from '../components/Layout'
import { useEffect, useState } from 'react'
import { UserService } from '../services/userService'
import { WalletService } from '../services/walletService'
import { ArrowBigDown, ArrowBigLeftDash, ArrowBigUp, MoveDownLeft, Plus, Send } from 'lucide-react'

export const Home = () => {
  const [user, setUser] = useState<any>(null)
  const [wallet, setWallet] = useState<any>(null)

  useEffect(() => {
    (async () => {
      const { data: user_data, response: user_response } = await UserService.getCurrentUser()
      const { data: wallet_data, response: wallet_response } = await WalletService.getCurrentWallet()

      if (user_response.status === 200 && wallet_response.status === 200) {
        setUser(user_data.user)
        setWallet(wallet_data.wallet)
      }
    })()
  }, [])

  return (
    <Layout>
      <div className='p-6 bg-neutral-950 text-neutral-50'>
        <h1 className='font-bold text-2xl'>
          <span className='text-neutral-500 text-lg'>RHO:</span>
          <span>{ wallet ? wallet.balance : 'loading...'}</span>
        </h1>
        <h1 className='text-neutral-500 font-bold'>
          <span className='text-neutral-700'>Welcome back,</span>
          <span>{ user ? user.username : 'loading...' }</span>
        </h1>
      </div>

      <div className='bg-neutral-950 p-6 rounded-md text-neutral-500 flex justify-between fixed w-full bottom-0'>
        <div className='flex flex-col bg-neutral-900 p-4 w-20 h-20 rounded-md justify-center items-center'>
          <MoveDownLeft/>
          <h1>Recive</h1>
        </div>
        <div className='flex flex-col bg-neutral-900 p-4 w-20 h-20 rounded-md justify-center items-center'>
          <Send/>
          <h1>Send</h1>
        </div>
        <div className='flex flex-col bg-neutral-900 p-4 w-20 h-20 rounded-md justify-center items-center'>
          <Plus/>
          <h1>Add</h1>
        </div>
      </div>
      
    </Layout>
  )
}
