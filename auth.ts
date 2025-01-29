import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { client } from './sanity/lib/client';
import { AUTHOR_GITHUB_QUERY } from './sanity/lib/queries';
import { writeClient } from './sanity/lib/write-client';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_GITHUB_QUERY, {
          id: profile?.id,
        });
      if (!existingUser) {
        await writeClient.create({
          _type: 'author',
          id: profile?.id,
          username: profile?.login,
          bio: profile?.bio || '',
          name: user?.name,
          email: user?.email,
          image: user?.image,
        });
      }
      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_GITHUB_QUERY, { id: profile.id });

        if (user) {
          token.id = user._id;
        } else {
          console.log('No user found for profile.id', profile.id);
        }
      } else {
        console.log('Missing account or profile data');
      }
      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
