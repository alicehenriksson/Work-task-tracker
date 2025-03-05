'use client';

import { notFound } from "next/navigation";
import { Task } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { TaskDialog } from "@/components/AddTaskDialog";
import { useState } from "react";
import { useTasks } from "@/lib/TaskContext";
import { cn } from "@/lib/utils";
import { CollaboratorAvatar } from "@/components/CollaboratorAvatar";

const categoryStyles = {
  Design: "text-purple-500 border-purple-200 bg-purple-50",
  Code: "text-blue-500 border-blue-200 bg-blue-50",
  Management: "text-amber-500 border-amber-200 bg-amber-50",
} as const;

function getStatusColor(status: Task['status']) {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'ongoing':
      return 'bg-yellow-600';
    case 'deprecated':
      return 'bg-red-500';
    case 'not-started':
      return 'bg-gray-300';
    default:
      return 'bg-gray-300';
  }
}

interface TaskPageProps {
  params: {
    id: string;
  };
}

export default function TaskPage({ params }: TaskPageProps) {
  const { tasks } = useTasks();
  const task = tasks.find(t => t.id === params.id);
  const [isEditing, setIsEditing] = useState(false);

  if (!task) {
    notFound();
  }

  const collaborators = task.collaborators ? task.collaborators.split(',').map(c => c.trim()) : [];

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-24 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{task.title}</h1>
        </div>
        <TaskDialog task={task} />
      </div>

      <div className="relative flex">
        <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${getStatusColor(task.status)}`} />
        <Card className="flex-1">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <CardTitle className="text-xl sm:text-2xl mb-2">{task.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className={cn(categoryStyles[task.category])}>
                    {task.category}
                  </Badge>
                  <Badge variant="outline">
                    {task.estimatedHours} hours
                  </Badge>
                </div>
              </div>
              {task.externalLink && (
                <a 
                  href={task.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                  title={task.externalLink}
                >
                  <Link2 className="h-5 w-5" />
                </a>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{task.description}</p>
            </div>

            {collaborators.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Collaborators</h3>
                <div className="flex -space-x-2">
                  {collaborators.map((collaborator, index) => (
                    <CollaboratorAvatar
                      key={index}
                      name={collaborator}
                      className="border-2 border-background"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Date Started</p>
                  <p>{task.dateStarted.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p>{task.createdAt.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p>{task.updatedAt.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <TaskDialog 
        task={task}
        open={isEditing}
        onOpenChange={setIsEditing}
        trigger={null}
      />
    </main>
  );
} 