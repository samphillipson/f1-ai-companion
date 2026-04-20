import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "mock-client-id",
      clientSecret: process.env.GITHUB_SECRET || "mock-client-secret",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "mock-google-id",
      clientSecret: process.env.GOOGLE_SECRET || "mock-google-secret",
    })
  ],
  pages: {
    // Custom login page could go here
  }
})

export { handler as GET, handler as POST }
