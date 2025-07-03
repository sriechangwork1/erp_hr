import NextAuth, { User } from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
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
    id: string;
}

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
            profile (profile,tokens) {
                if(tokens.access_token) {
                    const decoded: JwtPayload = jwt.decode(tokens.access_token) as JwtPayload || null
                    return {
                        id: profile.sub,
                        name: profile.name ?? profile.preferred_username,
                        email: profile.email,
                        access_token: tokens.access_token,
                        refresh_token: tokens.refresh_token,
                        access_token_expires: Date.now() + (tokens.expires_at||0) * 1000,
                        aud: decoded.aud,
                        resource_access: decoded.resource_access
                    }
                    
                }
                return {
                    id: profile.sub,
                    name: profile.name ?? profile.preferred_username,
                    email: profile.email,
                    access_token: tokens.access_token,
                    refresh_token: tokens.refresh_token,
                    access_token_expires: Date.now() + (tokens.expires_at||0) * 1000,
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            const userx: UserCustomType = user 
            if (user) {
                token.user = {...user, access_token: account?.access_token};
                token.access_token = userx.access_token;
                token.refresh_token = userx.refresh_token;
                token.access_token_expires = userx.access_token_expires;
                token.aud = userx.aud;
                token.resource_access = userx.resource_access;
            }
            return token;
        },
        async session({ session, token }) {
            const user = {
                ...session.user,
                aud: token.aud,
                resource_access: token.resource_access,
                token: token.access_token,
                id: token.sub,
            }
            return {
                ...session,
                user
            }
        },
        async signIn({ account }): Promise<boolean | string> {
            // ตรวจสอบว่า account และ access_token มีอยู่จริง
            if (account?.provider === "keycloak" && account.access_token) {
                try {
                    const decoded = jwt.decode(account.access_token) as JwtPayload | null;
                    
                    const resourceAccess = decoded?.resource_access;
                    const resourceNames = resourceAccess ? Object.keys(resourceAccess) : [];

                    if (!decoded || !decoded.aud || resourceNames.length === 0) {
                        console.error("Sign-in denied: Access token cannot be decoded or 'aud' claim is missing.");
                        return false; // ปฏิเสธการเข้าสู่ระบบถ้า decode ไม่ได้ หรือไม่มี aud
                    }

                    const audience = resourceNames;
                    const requiredAudience = "erp_hr";

                    // ตรวจสอบว่า 'aud' claim มี "hr_app" หรือไม่
                    // 'aud' สามารถเป็น string หรือ array of strings
                    const isAudienceValid = Array.isArray(audience)
                        ? audience.includes(requiredAudience)
                        : audience === requiredAudience;

                    if (isAudienceValid) {
                        console.log(`Sign-in allowed: Audience '${requiredAudience}' found.`);
                        return true; // อนุญาตให้เข้าสู่ระบบ
                    } else {
                        console.warn(`Sign-in denied: Required audience '${requiredAudience}' not found in token's 'aud' claim. Found:`, audience);
                        // คุณอาจจะ redirect ไปหน้า error หรือหน้าแจ้งเตือนแทนการ return false
                        // return "/unauthorized";
                        return false; // ปฏิเสธการเข้าสู่ระบบ
                    }
                } catch (error) {
                    console.error("Error during sign-in callback while decoding token:", error);
                    return false; // ปฏิเสธการเข้าสู่ระบบหากมีข้อผิดพลาด
                }
            }
            // ถ้าไม่ใช่ provider keycloak หรือไม่มี access_token ก็อนุญาตผ่านไปก่อน (อาจมี provider อื่น)
            // หรือจะปรับ logic ตรงนี้ให้เข้มงวดขึ้นก็ได้ตามต้องการ
            return true;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 60*60,//*60*8
    },
});
export { handler as GET, handler as POST }