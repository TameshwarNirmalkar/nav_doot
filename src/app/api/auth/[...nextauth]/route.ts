// /src/app/api/auth/[...nextauth]/route.ts

import { handlers } from "@server/auth";

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
export const { GET, POST } = handlers;
