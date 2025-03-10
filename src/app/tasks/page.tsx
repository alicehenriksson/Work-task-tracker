'use client';

import { TaskCard } from "@/components/TaskCard";
import { TaskDialog } from "@/components/AddTaskDialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/lib/TaskContext";
import { Input } from "@/components/ui/input";
import { LogoutButton } from "@/components/LogoutButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";
import { Task } from "@/lib/data";
import { Plus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";

type SortOption = 'updatedAt' | 'createdAt' | 'category' | 'status' | 'estimatedHours';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'updatedAt', label: 'Last Updated' },
  { value: 'createdAt', label: 'Creation Date' },
  { value: 'category', label: 'Category' },
  { value: 'status', label: 'Status' },
  { value: 'estimatedHours', label: 'Estimated Hours' },
];

function getSortedTasks(tasks: Task[], sortBy: SortOption, sortDirection: 'asc' | 'desc') {
  return [...tasks].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'updatedAt':
      case 'createdAt':
        comparison = b[sortBy].getTime() - a[sortBy].getTime();
        break;
      case 'category':
      case 'status':
        comparison = a[sortBy].localeCompare(b[sortBy]);
        break;
      case 'estimatedHours':
        comparison = a[sortBy] - b[sortBy];
        break;
    }

    return sortDirection === 'desc' ? comparison : -comparison;
  });
}

export default function TasksPage() {
  const { tasks, loading, error } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedTasks = useMemo(() => {
    // First, filter tasks based on search query
    const filtered = tasks.filter(task => {
      const searchLower = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower) ||
        task.category.toLowerCase().includes(searchLower) ||
        task.status.toLowerCase().includes(searchLower) ||
        task.collaborators?.toLowerCase().includes(searchLower)
      );
    });

    // Then sort the filtered tasks
    return getSortedTasks(filtered, sortBy, sortDirection);
  }, [tasks, searchQuery, sortBy, sortDirection]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <main className="container mx-auto py-6">
          <Skeleton className="h-[400px] w-full" />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <main className="container mx-auto py-6">
          <div className="text-red-500">Error loading tasks: {error.message}</div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="container mx-auto py-6">
        <div className="grid gap-4">
          {tasks.map(task => (
            <div key={task.id} className="p-4 border rounded-lg">
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-sm text-muted-foreground">{task.description}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-medium">{task.status}</span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{task.category}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 