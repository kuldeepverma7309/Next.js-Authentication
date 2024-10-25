'use client'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { credentialsLogin } from '@/services/login'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { auth } from '@/auth'


const LoginForm = () => {
  const router = useRouter();

  return (
    <div>
        <form action={async(FormData):Promise<any>=>{
          const email = FormData.get('email') as string | undefined
          const password = FormData.get('password') as string | undefined
          if (!email || !password) {
            // @ts-ignore
            return toast.error('Email and password are required')
            
          }
          let toastId = toast.loading('Logging in...')
          let error = await credentialsLogin(email, password)
          if(!error){
            router.refresh()
            return toast.success('Login successful', {id: toastId})
          }else{
            // @ts-ignore
            toast.error(error, {id: toastId})
          
          }
        }} className='flex flex-col gap-4'>
          <Input type='email' placeholder='Enter your email' name="email" />
          <Input type='password' placeholder='Enter your password' name="password" />
          <Button type='submit'>Login</Button>
        </form>
    </div>
  )
}

export default LoginForm