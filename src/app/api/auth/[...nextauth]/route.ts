import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
