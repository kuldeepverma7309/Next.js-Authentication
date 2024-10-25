"use server"
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

const credentialsLogin = async (email:string, password:string) => {
    try {
        await signIn('credentials', { email, password, redirect: false })

    } catch (error) {
        console.log("error form login.ts", error)
        const err = error as CredentialsSignin;
        return err?.cause;
    }
}

const gitHubSignin = async () => {
    try {
        await signIn('github')
    } catch (error) {
        console.log("error form login.ts", error)
        const err = error as CredentialsSignin;
        return err?.cause;
    }
}
export { credentialsLogin, gitHubSignin }