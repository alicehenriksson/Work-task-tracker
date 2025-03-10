'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  dateStarted: Date;
  category: string;
  estimatedHours: number;
  externalLink?: string;
  ownerId: string;
};

type TaskContextType = {
  tasks: Task[];
  loading: boolean;
  error: Error | null;
  refreshTasks: () => Promise<void>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [session]);

  return (
    <TaskContext.Provider value={{ tasks, loading, error, refreshTasks: fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
} 