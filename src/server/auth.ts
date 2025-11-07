import { cookies } from "next/headers";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { userService } from "./services/userService";

// The core configuration is now exported from the default function.
export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  // Configuration options are passed directly to the function.
  // The 'session' strategy is 'jwt' by default in v5 when not using an adapter,
  // so you can often omit it unless you need to change other properties.
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },

  callbacks: {
    // (1) signIn callback is the same, controlling if the user can sign in.
    async signIn({ user }) {
      console.log("auth.ts signIn callback ------------------- ", user);
      if (user && user.id) {
        return true;
      } else {
        return false;
      }
    },
    // (2) The jwt callback runs *after* a successful signIn.
    // Use it to persist custom data (like your 'token') from the 'user' object into the JWT 'token'.
    async jwt({ token, user }) {
      if (user) {
        // Spread the user object (containing your API response data like 'token' and 'clientId') onto the JWT token.
        return { ...token, ...user };
      }
      return token;
    },
    // (3) The session callback runs when a session is checked.
    // It takes the JWT 'token' and puts the custom data from it onto the 'session.user' object.
    async session({ session, token }) {
      // The 'token' object here is the result of the 'jwt' callback.
      // We map the token data to the session user object.
      (session.user as any) = {
        ...token,
      };
      return session;
    },
  },
  events: {
    async signIn({ user }: { user: any }) {
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const cookiesStore = await cookies();
      cookiesStore.set("session", user.token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
        // Note: maxAge should typically match your session maxAge or API token expiry
        maxAge: 1 * 24 * 60 * 60, // 1 day
      });
    },
    async signOut() {
      const cookiesStore = await cookies();
      cookiesStore.delete("session");
    },
    // session event is useful for debugging but often removed in production
    // async session({ token }) {
    //   console.log("auth.ts session event ------------------- ", token);
    // },
  },

  pages: {
    signIn: "/login",
    error: "/error",
  },

  providers: [
    Credentials({
      // Credentials configuration is largely unchanged.
      name: "Credentials",
      credentials: {
        email_address: {
          label: "Email Address",
          type: "text",
          placeholder: "Enter email address",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        // The object returned here is passed to the 'signIn' and 'jwt' callbacks.
        return await userService.authenticate({
          ...credentials,
        });
      },
    }),
  ],
});
