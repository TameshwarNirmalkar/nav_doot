import type { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    token: string;
    user: {
      id: string;
      clientId: number;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      clientUserId: number;
      profile_image: string;
      token: string;
      refresh_token: string;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string; // The ID you are adding
    role?: string; // The role you are adding
    clientId?: number;
    firstName?: string;
    lastName?: string;
    emailAddres?: string;
  }
}
declare global {
  // namespace NodeJS {
  //   interface ProcessEnv {
  //     JWT_SECERT_KEY?: string;
  //     JWT_SECERT_REFRESH_KEY?: string;
  //     NEXT_PUBLIC_IMBB_SECERET_KEY?: string;
  //     NEXT_PUBLIC_API_BASE_URL: string;
  //     LOCAL_API_URL: string;
  //   }
  // }

  interface RuleSetRule {
    test?: RegExp | RegExp[];
    include?: string | RegExp | (string | RegExp)[];
    exclude?: string | RegExp | (string | RegExp)[];
    issuer?: string | RegExp | (string | RegExp)[];
    use?: RuleSetRule[] | any[] | { loader: string; options?: { [key: string]: any } }[];
    loader?: string;
    options?: { [key: string]: any };
    type?: "asset" | "asset/resource" | "asset/inline" | "asset/source" | "json" | "webassembly/experimental" | "javascript/auto" | "javascript/dynamic" | "javascript/esm";
    parser?: { [key: string]: any };
    generator?: { [key: string]: any };
    resolve?: { [key: string]: any };
    oneOf?: RuleSetRule[];
    rules?: RuleSetRule[];
    enforce?: "pre" | "post";
    sideEffects?: boolean;
    resourceQuery?: RegExp | RegExp[];
    mimetype?: string;
  }

  interface Element {
    _reactRoot?: any;
  }
}
