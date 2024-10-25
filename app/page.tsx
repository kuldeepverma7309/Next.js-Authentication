import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()
  console.log("session -> ", session)
  if(!session?.user){
    redirect('/auth/login')
  }
  return (
   <div className="flex flex-col justify-center items-center h-[100vh]">
    {
      session?.user?.name 
    }
    <form action={async()=>{
      'use server'
      await signOut()
    }
    }>
      <Button type="submit">Logout</Button>
    </form>
   </div>
  );
}
