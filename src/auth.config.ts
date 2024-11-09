import { fetchCustomer, loginCustomer } from "@/lib/shopify";
import type { NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { log } from "util";
import { z } from "zod";

const CredentialsSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

declare module "next-auth/jwt" {
    interface JWT {
        id: string | undefined;
        accessToken?: string;
        firstName?: string;
        lastName?: string;
    }
}

declare module "next-auth" {
    interface User {
        firstName?: string;
        lastName?: string;
        accessToken?: string;
    }

    interface Session {
        user: {
            id?: string;
            email?: string | null;
            firstName?: string;
            lastName?: string;
            accessToken?: string;
        };
    }
}

export default {
    providers: [
        CredentialsProvider({
            name: "Shopify",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const validatedFields = CredentialsSchema.safeParse(credentials);

                if (!validatedFields.success) {
                    throw new Error("Invalid credentials format");
                }

                const { email, password } = validatedFields.data;

                const loginResponse = await loginCustomer(email, password);

                if (loginResponse?.data?.customerAccessTokenCreate?.userErrors.length) {
                    throw new Error(loginResponse.data.customerAccessTokenCreate.userErrors[0].message);
                }

                const accessToken = loginResponse.data.customerAccessTokenCreate.customerAccessToken.accessToken;

                if (!accessToken) {
                    return null;
                }


                const customerData = await fetchCustomer(accessToken);

                if (!customerData) {
                    return null;
                }


                return {
                    id: customerData.id,
                    email: customerData.email,
                    firstName: customerData.firstName,
                    lastName: customerData.lastName,
                    accessToken: accessToken,
                };
            },
        }),
    ],
    pages: {
        signIn: "/account/login",
        error: "/account/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.accessToken = user.accessToken;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.id) {
                session.user.id = token.id;
                session.user.accessToken = token.accessToken;
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
            }
            return session;
        },
    },
    trustHost: process.env.NODE_ENV === "development" ? true : false,
} satisfies NextAuthConfig;
