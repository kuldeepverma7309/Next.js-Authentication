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
import User from '@/lib/models/userModel'
import { redirect } from 'next/navigation'


const Page = () => {

    const handleSignUp = async(formData:FormData)=>{
        'use server'
        const name = formData.get('name') as string | undefined
        const email = formData.get('email') as string | undefined
        const password = formData.get('password') as string | undefined
        await connectDB()
        const existingUser = await User.findOne({email})
        if(existingUser){
            throw new Error('User already exists')
        }
        const user = await User.create({name,email,password})
        console.log(user)
        redirect('/auth/login')
    }
  return (
    <div className='flex justify-center items-center h-dvh'>
      <Card>
      <CardHeader>
        <CardTitle>SignUp</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSignUp} className='flex flex-col gap-4'>
            
          <Input type='text' placeholder='Enter your name' name="name" />
          <Input type='email' placeholder='Enter your email' name="email"/>
          <Input type='password' placeholder='Enter your password' name="password"/>
          <Button type='submit'>SignUp</Button>
        </form>
      </CardContent>
      <CardFooter className='flex flex-col'>
        <span>or</span>
        <form action="" className='flex flex-col gap-4 w-full'>
          <Button type='submit' variant={'outline'}>Login with Google</Button>
        </form>

        <Link href='/auth/register'>
         Have an account? Login
        </Link>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Page