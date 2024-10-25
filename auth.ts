
import NextAuth, { AuthError, CredentialsSignin } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import User from "./lib/models/userModel";
import connectDB from "./lib/connectDB";

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
            authorize: async (credentials) => {

                try {
                    const email = credentials.email as string | undefined;
                    const password = credentials.password as string | undefined;
                    if (!email || !password) {
                        throw new CredentialsSignin({ cause: "Email and password are required" })
                    }
                    await connectDB();
                    const user = await User.findOne({ email });
                    if (!user) {
                        throw new CredentialsSignin({ cause: "User not found" })
                    }

                    if (!user.password) {
                        throw new CredentialsSignin({ cause: "You need to sign in with Google" })
                    }

                    const isMatch = await user.matchPassword(password);
                    if (!isMatch) {
                        throw new CredentialsSignin({ cause: "Invalid password" })
                    }
                    // console.log(user)
                    return { email: user.email, name: user.name, id: user._id }
                } catch (error) {
                    throw new CredentialsSignin({ cause: "Invalid credentials" })
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        // error: "/auth/error",
        // verifyRequest: "/auth/verify-request",
        // newUser: "/auth/signup",
    },
    callbacks: {
        signIn: async ({ user, account }) => {
            if (account?.provider === "credentials") {
                return true;
            }
            if (account?.provider === "github") {
                try {
                    const { name, id } = user;
                    console.log("user", user, "name", name)
                    await connectDB();
                    const existingUser = await User.findOne({  name });
                    if (!existingUser) {
                        const newUser = new User({ name, gitHubId: id });
                        await newUser.save();
                    }
                    return true;
                } catch (error) {
                    console.error("Error signing in with GitHub:", error);
                    throw new Error("Error signing in with GitHub");
                }
            }
            return false;
        }
    }    
})