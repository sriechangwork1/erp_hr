// import NextAuth from 'next-auth'
// import KeycloakProvider from 'next-auth/providers/keycloak'

import NextAuth, { User } from "next-auth"
import Keycloak from "next-auth/providers/keycloak";
import CredentialsProvider from "next-auth/providers/credentials"
import jwt, { JwtPayload } from 'jsonwebtoken';

interface ResourceAccess {
    [key: string]: {
        roles: string[];
    };
}
interface UserCustomType extends User {
    access_token?: string;
    refresh_token?: string;
    access_token_expires?: number;
    aud?: string | string[];
    resource_access?: ResourceAccess;
}

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

// const handler = NextAuth({
//   providers: [
//       Keycloak({
//           clientId: process.env.KEYCLOAK_CLIENT_ID!,
//           clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
//           issuer: process.env.KEYCLOAK_ISSUER!,
//           authorization: {
//             params: {
//               prompt: "login",
//             },
//           },
//           profile (profile,tokens) {
//               if(tokens.access_token) {
//                   const decoded: JwtPayload = jwt.decode(tokens.access_token) as JwtPayload || null
//                   return {
//                       id: profile.sub,
//                       name: profile.name ?? profile.preferred_username,
//                       email: profile.email,
//                       access_token: tokens.access_token,
//                       refresh_token: tokens.refresh_token,
//                       access_token_expires: Date.now() + (tokens.expires_at||0) * 1000,
//                       aud: decoded.aud,
//                       resource_access: decoded.resource_access
//                   }
                  
//               }
//               return {
//                   id: profile.sub,
//                   name: profile.name ?? profile.preferred_username,
//                   email: profile.email,
//                   access_token: tokens.access_token,
//                   refresh_token: tokens.refresh_token,
//                   access_token_expires: Date.now() + (tokens.expires_at||0) * 1000,
//               }
//           }
//       }),
//       CredentialsProvider({
//           name: 'Credentials',
//           credentials: {
//               username: { label: "Username", type: "text", placeholder: "Username" },
//               password: { label: "Password", type: "password" },
//           },
//           async authorize(credentials): Promise<UserCustomType|null> {
//               // You need to provide your own logic here that takes the credentials
//               // submitted and returns either a object representing a user or value
//               // that is false/null if the credentials are invalid.
//               // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
//               // You can also use the `req` object to obtain additional parameters
//               // (i.e., the request IP address)
//               if (!credentials?.username || !credentials?.password) {
//                   return null; // ถ้าไม่มี username หรือ password ให้ return null

//               }
//               const { username, password } = credentials;

//               const res = await fetch(process.env.KEYCLOAK_ISSUER+"/protocol/openid-connect/token", {
//                   method: 'POST',
//                   headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
//                   body: new URLSearchParams({
//                       client_id: process.env.KEYCLOAK_CLIENT_ID!,
//                       client_secret: process.env.KEYCLOAK_CLIENT_SECRET!, // ใส่ client secret ถ้าจำเป็น
//                       grant_type: 'password',
//                       username,
//                       password,
//                       scope: 'openid',
//                   })
//               })
//               const data = await res.json();

//               if (res.ok && data.access_token) {
//                   const decoded: JwtPayload = jwt.decode(data.access_token) as JwtPayload || null
//                   return {
//                       id: decoded.sub||'',
//                       name: decoded.name,
//                       email: decoded.email,
//                       access_token: data.access_token,
//                       refresh_token: data.refresh_token,
//                       access_token_expires: Date.now() + data.expires_in * 1000,
//                       aud: decoded.aud,
//                       resource_access: decoded.resource_access
//                   };
//               }
//               // Return null if user data could not be retrieved
//               return null
//           }
//       })
//   ],
//   callbacks: {
//       async jwt({ token, user }) {
//           const userx: UserCustomType = user 
//           if (user) {
//               token.access_token = userx.access_token;
//               token.refresh_token = userx.refresh_token;
//               token.access_token_expires = userx.access_token_expires;
//               token.aud = userx.aud;
//               token.resource_access = userx.resource_access;
//           }
      
//           return token;
//       },
//       async session({ session, token }) {
//           const user = {
//               ...session.user,
//               aud: token.aud,
//               resource_access: token.resource_access,
//               token: token.access_token
//           }
//           return {
//               ...session,
//               user
//           }
//       },
//       // async jwt({ token, user, account }) {
//       //   if (account) {
//       //     token.access_token = account.access_token;
//       //   }
//       //   if (user) {
//       //     // ถ้าใช้ CredentialsProvider
//       //     token.access_token = user.access_token;
//       //   }
//       //   return token;
//       // },
//       // async session({ session, token }) {
//       //   // เพิ่ม access_token เข้า session
//       //   session.access_token = token.access_token;
//       //   session.user.token = token.access_token; // เพื่อให้ใช้ใน useAuthUser().user.token ได้
//       //   return session;
//       // },
//   },
//   session: {
//       strategy: "jwt",
//       maxAge: 60*10,//*60*8
//   },
// });
// export { handler as GET, handler as POST }
