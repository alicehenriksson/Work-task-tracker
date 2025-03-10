'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export type TaskStatus = 'completed' | 'deprecated' | 'ongoing' | 'not-started';
export type TaskCategory = 'Design' | 'Code' | 'Management';

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dateStarted: Date;
  category: TaskCategory;
  estimatedHours: number;
  externalLink?: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  collaborators?: string;
};

export type TaskContextType = {
  tasks: Task[];
  loading: boolean;
  error: Error | null;
  refreshTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
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

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      await fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add task'));
      throw err;
    }
  };

  const updateTask = async (id: string, taskData: Partial<Task>) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      await fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update task'));
      throw err;
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
    <TaskContext.Provider value={{ tasks, loading, error, refreshTasks: fetchTasks, addTask, updateTask }}>
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