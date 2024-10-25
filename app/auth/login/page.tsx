import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import connectDB from '@/lib/connectDB'
import { auth, signIn } from '@/auth'
import { CredentialsSignin } from 'next-auth'
import LoginForm from '@/components/client/loginForm'
import { redirect } from 'next/navigation'
import { gitHubSignin } from '@/services/login'


const Page = async() => {

const session = await auth()
if(session?.user){
  redirect('/')
}
  return (
    <div className='flex justify-center items-center h-dvh'>
      <Card>
        <CardHeader>
          <CardTitle className='text-center'>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className='flex flex-col'>
          <span>or</span>
          <form action={async()=>{
            'use server'
           await signIn('github')
          }} className='flex flex-col gap-4 w-full'>
            <Button type='submit' variant={'destructive'}>Login with GitHub</Button>
          </form>

          <Link href='/auth/register'>
            Don't have an account? Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page