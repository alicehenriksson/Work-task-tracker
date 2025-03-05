'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { Task, tasks as initialTasks } from './data';

const CURRENT_USER = "Alice Henriksson";

// Helper function to ensure current user is in collaborators
function ensureCurrentUserInCollaborators(collaborators: string | undefined): string {
  const collabArray = collaborators ? collaborators.split(',').map(c => c.trim()) : [];
  if (!collabArray.some(c => c.toLowerCase() === CURRENT_USER.toLowerCase())) {
    collabArray.push(CURRENT_USER);
  }
  return collabArray.join(', ');
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask?: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Ensure current user is in collaborators for initial tasks
    return initialTasks.map(task => ({
      ...task,
      collaborators: ensureCurrentUserInCollaborators(task.collaborators || ''),
    }));
  });

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
      collaborators: ensureCurrentUserInCollaborators(taskData.collaborators || ''),
      createdAt: now,
      updatedAt: now,
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const updateTask = useCallback((id: string, taskData: Partial<Task>) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const updatedTask = {
          ...task,
          ...taskData,
          updatedAt: new Date(),
        };
        // Ensure current user remains in collaborators even after updates
        if ('collaborators' in taskData) {
          updatedTask.collaborators = ensureCurrentUserInCollaborators(taskData.collaborators);
        }
        return updatedTask;
      }
      return task;
    }));
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask }}>
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