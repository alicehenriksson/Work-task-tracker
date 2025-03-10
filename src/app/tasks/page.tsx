'use client';

import { TaskCard } from "@/components/TaskCard";
import { TaskDialog } from "@/components/AddTaskDialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/lib/TaskContext";
import { Input } from "@/components/ui/input";
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
  const { tasks } = useTasks();
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

  return (
    <main className="min-h-screen p-8 md:p-24 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Alice Henriksson's Tasks</h1>
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
            <Button className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
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
  );
} 