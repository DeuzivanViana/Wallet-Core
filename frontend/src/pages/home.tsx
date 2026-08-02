'use client'

import { 
  ChevronRight, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  History,
  User
} from 'lucide-react'
import { Layout } from '../components/Layout'
import { useEffect, useState } from 'react'
import { UserService } from '../services/userService'
import { WalletService } from '../services/walletService'

// Dados Mockados para simular o backend futuramente
const MOCK_TRANSACTIONS = [
  { id: 1, title: 'Netflix', type: 'out', amount: 39.90, date: 'Hoje, 10:45' },
  { id: 2, title: 'Transferência recebida', type: 'in', amount: 1250.00, date: 'Ontem, 15:30' },
  { id: 3, title: 'Mercado Local', type: 'out', amount: 145.20, date: '28 Ago, 19:10' },
]

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
    </Layout>
  )
}