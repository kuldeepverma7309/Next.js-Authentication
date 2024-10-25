## Basic steps for signin for auth.ts ->


import NextAuth, { CredentialsSignin, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHubProvider({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        authorize: async ({ email, password }) => {
            console.log(`email: ${email}, password: ${password}`)
            const user: User = { id: "abc", email: `${email}` }
            if(password !== "password"){
                throw new CredentialsSignin("Invalid password", { status: 401 })
            }
            else{
                return user
            }
        }
    })
  ],
})