// import NextAuth from 'next-auth'
// import KeycloakProvider from 'next-auth/providers/keycloak'

// const handler = NextAuth({
//   providers: [
//     KeycloakProvider({
//       clientId: process.env.KEYCLOAK_CLIENT_ID!,
//       clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
//       issuer: process.env.KEYCLOAK_ISSUER!,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, account, profile }) {
//       if (account && account.access_token) {
//         token.accessToken = account.access_token;

//         // Decode access_token เพื่อเอา role มาใส่
//         const payload = JSON.parse(Buffer.from(account.id_token?.split('.')[1] || '', 'base64').toString());
//         token.roles = payload.realm_access?.roles || [];
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.accessToken = token.accessToken;
//       session.roles = token.roles;
//       return session;
//     },
//   },
// })

// export { handler as GET, handler as POST }


// /pages/api/auth/[...nextauth].ts

import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: 'erp_hr',
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: 'https://erp.msu.ac.th/sso/realms/erpmsu',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };

