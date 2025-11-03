"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) => {
  return (
    <SessionProvider refetchInterval={6000 * 5} session={session}>
      {children}
    </SessionProvider>
  );
};
