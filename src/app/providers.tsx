'use client';

import { SessionProvider } from "next-auth/react";
import { TaskProvider } from "@/lib/TaskContext";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TaskProvider>
        {children}
        <Toaster />
      </TaskProvider>
    </SessionProvider>
  );
} 