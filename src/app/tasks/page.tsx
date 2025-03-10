'use client';

import { TaskCard } from "@/components/TaskCard";
import { TaskDialog } from "@/components/AddTaskDialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/lib/tasks";
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
import { Task } from "@/lib/tasks";
import { Plus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  if (!session) {
    return (
      <div>
        <Navbar />
        <main className="min-h-screen p-4 md:p-8 lg:p-24 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-3xl font-bold">Welcome to Task Tracker</h1>
            <p className="text-muted-foreground">Please sign in to manage your tasks.</p>
          </div>
        </main>
      </div>
    );
  }

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

  return (
    <div>
      <Navbar />
      <main className="min-h-screen p-8 md:p-24 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{session.user.name}'s Tasks</h1>
          <LogoutButton />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <Tabs defaultValue="tasks" className="w-full sm:w-[400px]">
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="flex-1" asChild>
                <Link href="/">Overview</Link>
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex-1">Tasks</TabsTrigger>
            </TabsList>
          </Tabs>
          <TaskDialog 
            trigger={
              <Button variant="blue" className="w-full sm:w-auto">
                Add Task
              </Button>
            }
          />
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex gap-2 items-center">
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="px-3"
            >
              {sortDirection === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredAndSortedTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
          {filteredAndSortedTasks.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              {searchQuery ? 'No tasks found matching your search.' : 'No tasks available.'}
            </p>
          )}
        </div>
      </main>
    </div>
  );
} 