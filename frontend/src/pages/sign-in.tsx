import type React from 'react'
import { Layout } from '../components/Layout'
import { AuthService } from '../services/authService'

export const SignIn = () => {
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form_data = new FormData(event.target)

    const data = await AuthService.signIn({
      username: form_data.get('username'),
      password: form_data.get('password')
    })

    console.log(data)
  }

  return <Layout className='h-screen flex flex-col justify-center'>
    <form onSubmit={handleSubmit} className='p-6 m-4 flex flex-col gap-4 rounded-md bg-neutral-950 mb-40'>
      <input name='username' placeholder='Username' type='text' className='bg-neutral-900 p-4 rounded-lg placeholder-neutral-500 text-neutral-100'/>
      <input name='password' placeholder='Password' type='password' className='bg-neutral-900 p-4 rounded-lg placeholder-neutral-500 text-neutral-100'/>
      
      <button type='submit' className='bg-blue-500 p-4 rounded-lg uppercase font-bold'>Sign-Up</button>
    </form>
  </Layout>
}