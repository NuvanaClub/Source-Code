import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) return null;
        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("JWT callback - user:", user);
      console.log("JWT callback - token:", token);
      console.log("JWT callback - account:", account);
      
      // If this is a new login, add user data to token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
      }
      
      // Ensure token always has an id (use sub if id is missing)
      if (!token.id && token.sub) {
        token.id = token.sub;
      }
      
      console.log("JWT callback - final token:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback - token:", token);
      console.log("Session callback - session before:", session);
      
      // Always add token data to session
      if (token) {
        session.user.id = token.id || token.sub;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      
      console.log("Session callback - session after:", session);
      return session;
    }
  }
};

export const authHandler = NextAuth(authOptions);