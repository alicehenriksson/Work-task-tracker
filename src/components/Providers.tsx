'use client';

import { SessionProvider } from "next-auth/react";
import { TaskProvider } from "@/lib/tasks";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TaskProvider>
        {children}
      </TaskProvider>
    </SessionProvider>
  );
} 