import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { Session, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

export const options = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST }; 