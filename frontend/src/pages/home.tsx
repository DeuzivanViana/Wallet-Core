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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const { data: user_data, response: user_response } = await UserService.getCurrentUser()
        const { data: wallet_data, response: wallet_response } = await WalletService.getCurrentWallet()

        if (user_response.status === 200 && wallet_response.status === 200) {
          setUser(user_data.user)
          setWallet(wallet_data.wallet)
        }
      } catch (error) {
        console.error("Erro ao carregar dados", error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return (
    <Layout>
      {/* Wrapper principal: Fundo totalmente preto para contraste máximo */}
      <div className="min-h-screen bg-black text-neutral-50 p-6 flex flex-col gap-8 font-sans">
        
        {/* 1. HEADER: Saudação e Perfil */}
        <header className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center border border-neutral-800">
              <User size={24} className="text-neutral-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-neutral-400">Bem-vindo de volta,</span>
              {isLoading ? (
                <div className="h-5 w-24 bg-neutral-800 rounded animate-pulse mt-1"></div>
              ) : (
                <span className="font-bold text-lg">{user?.displayName || 'Usuário'}</span>
              )}
            </div>
          </div>
        </header>

        {/* 2. CARD PRINCIPAL: Saldo e Ações Rápidas */}
        <section className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800/50 shadow-2xl">
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-neutral-400 text-sm font-medium">Saldo Disponível</h2>
              {isLoading ? (
                <div className="h-8 w-32 bg-neutral-800 rounded animate-pulse mt-2"></div>
              ) : (
                <p className="text-4xl font-bold tracking-tight">
                  <span className="text-neutral-500 text-2xl mr-2">RHO</span>
                  {wallet?.balance ?? '0.00'}
                </p>
              )}
            </div>
            <button className="p-2 bg-neutral-800/50 hover:bg-neutral-700 rounded-full transition-colors">
              <ChevronRight size={20} className="text-neutral-400" />
            </button>
          </div>

          {/* Botões de Ação */}
          <div className="grid grid-cols-3 gap-3">
            <button className="flex flex-col items-center justify-center bg-neutral-950 hover:bg-neutral-800 p-4 rounded-2xl transition-colors border border-neutral-800/50">
              <div className="bg-neutral-800 p-2 rounded-full mb-2">
                <ArrowUpRight size={20} className="text-white" />
              </div>
              <span className="text-xs font-medium">Enviar</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-neutral-950 hover:bg-neutral-800 p-4 rounded-2xl transition-colors border border-neutral-800/50">
              <div className="bg-neutral-800 p-2 rounded-full mb-2">
                <ArrowDownLeft size={20} className="text-white" />
              </div>
              <span className="text-xs font-medium">Receber</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-neutral-950 hover:bg-neutral-800 p-4 rounded-2xl transition-colors border border-neutral-800/50">
              <div className="bg-neutral-800 p-2 rounded-full mb-2">
                <Plus size={20} className="text-white" />
              </div>
              <span className="text-xs font-medium">Adicionar</span>
            </button>
          </div>
        </section>

        {/* 3. ATALHOS: Meus Cartões */}
        <section>
          <button className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800/50 p-5 rounded-2xl flex items-center justify-between transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-neutral-950 p-2.5 rounded-xl">
                <CreditCard size={24} className="text-neutral-300" />
              </div>
              <span className="font-semibold text-neutral-100">Meus Cartões</span>
            </div>
            <ChevronRight size={20} className="text-neutral-500" />
          </button>
        </section>

        {/* 4. HISTÓRICO: Transações Recentes (Mockadas) */}
        <section className="flex-1">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold text-neutral-300 flex items-center gap-2">
              <History size={18} />
              Atividade Recente
            </h3>
            <button className="text-xs font-medium text-neutral-500 hover:text-neutral-300">
              Ver tudo
            </button>
          </div>
          
          <div className="flex flex-col gap-3">
            {MOCK_TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center bg-neutral-900/50 border border-neutral-800/30 p-4 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-full ${tx.type === 'in' ? 'bg-emerald-500/10' : 'bg-neutral-800'}`}>
                    {tx.type === 'in' ? (
                      <ArrowDownLeft size={18} className="text-emerald-400" />
                    ) : (
                      <ArrowUpRight size={18} className="text-neutral-400" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-neutral-200">{tx.title}</span>
                    <span className="text-xs text-neutral-500">{tx.date}</span>
                  </div>
                </div>
                <span className={`font-semibold ${tx.type === 'in' ? 'text-emerald-400' : 'text-neutral-200'}`}>
                  {tx.type === 'in' ? '+' : '-'} RHO {tx.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </Layout>
  )
}