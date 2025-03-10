'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TaskDistributionChart } from "@/components/TaskDistributionChart";
import { TaskDialog } from "@/components/AddTaskDialog";
import { TaskCard } from "@/components/TaskCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/lib/TaskContext";
import { LogoutButton } from "@/components/LogoutButton";
import { Plus } from "lucide-react";

export default function Home() {
  const { tasks } = useTasks();
  
  // Calculate task statistics
  const taskStats = tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const pieData = Object.entries(taskStats).map(([name, value]) => ({
    name: name === 'not-started' 
      ? 'Not started'
      : name === 'deprecated'
      ? 'Deprecated'
      : name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const totalTasks = tasks.length;
  const completionRate = Math.round(
    ((taskStats.completed || 0) / totalTasks) * 100 || 0
  );
  const activeTasks = taskStats.ongoing || 0;

  // Filter tasks for the lists
  const ongoingTasks = tasks.filter(task => task.status === 'ongoing');
  const previousTasks = tasks
    .filter(task => task.status === 'completed' || task.status === 'deprecated')
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-24 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Alice Henriksson's Tasks</h1>
        <LogoutButton />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <Tabs defaultValue="overview" className="w-full sm:w-[400px]">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="tasks" className="flex-1" asChild>
              <Link href="/tasks">Tasks</Link>
            </TabsTrigger>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <TaskDistributionChart data={pieData} />

        {/* Metrics Card */}
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-2">Completion Rate</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{completionRate}%</span>
                <span className="text-sm text-muted-foreground">of tasks completed</span>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-sm font-medium mb-2">Active Tasks</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{activeTasks}</span>
                <span className="text-sm text-muted-foreground">tasks in progress</span>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-sm font-medium mb-2">Total Tasks</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{totalTasks}</span>
                <span className="text-sm text-muted-foreground">tasks tracked</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Tasks */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Active Tasks</h2>
          <div className="space-y-4">
            {ongoingTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
            {ongoingTasks.length === 0 && (
              <p className="text-muted-foreground text-center py-4">No active tasks</p>
            )}
          </div>
        </div>

        {/* Previous Tasks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Previous Tasks</h2>
            <Link 
              href="/tasks" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {previousTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
            {previousTasks.length === 0 && (
              <p className="text-muted-foreground text-center py-4">No previous tasks</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
