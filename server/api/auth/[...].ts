import { NuxtAuthHandler } from '#auth'
import Google from 'next-auth/providers/google'

export default NuxtAuthHandler({
    secret: process.env.AUTH_SECRET || 'default',
    pages: {
        signIn: '/login',
    },
    providers: [
        // @ts-expect-error Use .default here for it to work during SSR.
        Google.default({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: 'openid email profile https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar',
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                token.idToken = account.id_token
            }
            return token
        },
        async session({ session, token }) {
            
            return {
                ...session,
                user: {
                    id: token.id,
                    email: token.email,
                    name: token.name,
                    image: token.picture
                }
            }
        },
    }
})