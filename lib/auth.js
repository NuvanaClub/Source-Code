import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import Twitter from "next-auth/providers/twitter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user || !user.password) return null;
        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role, image: user.image };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" || account?.provider === "discord" || account?.provider === "twitter") {
        try {
          console.log("OAuth signin attempt for:", user.email);
          
          // Check if user exists
          let dbUser = await prisma.user.findUnique({
            where: { email: user.email }
          });

          if (!dbUser) {
            console.log("Creating new user for OAuth:", user.email);
            // Create new user for OAuth
            dbUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                image: user.image,
                role: "USER" // Default role for OAuth users
              }
            });
            console.log("User created successfully:", dbUser.id);
          } else {
            console.log("User already exists:", dbUser.id);
            if (!dbUser.image && user.image) {
              // Update image if not set
              await prisma.user.update({
                where: { id: dbUser.id },
                data: { image: user.image }
              });
            }
          }

          user.id = dbUser.id;
          user.role = dbUser.role;
          console.log("OAuth signin successful, user ID:", user.id);
          return true;
        } catch (error) {
          console.error("OAuth signin error:", error);
          console.error("Error details:", {
            message: error.message,
            code: error.code,
            meta: error.meta
          });
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // If this is a new login, add user data to token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      
      // Ensure token always has an id (use sub if id is missing)
      if (!token.id && token.sub) {
        token.id = token.sub;
      }
      
      return token;
    },
    async session({ session, token }) {
      // Always add token data to session
      if (token) {
        session.user.id = token.id || token.sub;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.image;
      }
      
      return session;
    }
  }
};

export const authHandler = NextAuth(authOptions);