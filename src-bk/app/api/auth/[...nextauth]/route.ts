import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak";
const handler = NextAuth({
    providers: [
        Keycloak({
            clientId: process.env.KEYCLOAK_CLIENT_ID || "",
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
            issuer: process.env.KEYCLOAK_ISSUER,
            authorization: {
              params: {
                prompt: "login",
              },
            },
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.user = {...user, access_token: account?.access_token};
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                ...token
            }
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 60*10,//*60*8
    },
});
export { handler as GET, handler as POST }