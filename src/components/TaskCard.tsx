'use client';

import { Task } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CollaboratorAvatar } from "@/components/CollaboratorAvatar";

function getStatusColor(status: Task['status']) {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'ongoing':
      return 'bg-yellow-600';
    case 'not-started':
      return 'bg-gray-500';
    case 'deprecated':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'Design':
      return 'bg-purple-100 text-purple-800';
    case 'Code':
      return 'bg-blue-100 text-blue-800';
    case 'Management':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

const CURRENT_USER = "Alice Henriksson";

function getInitialsColor(name: string) {
  if (name.toLowerCase() === CURRENT_USER.toLowerCase()) {
    return 'bg-gradient-to-br from-violet-500 to-purple-700 ring-2 ring-purple-300';
  }

  // Generate a random but consistent color based on the name
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
}

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const collaborators = task.collaborators ? task.collaborators.split(',').map(c => c.trim()) : [];
  const sortedCollaborators = [...collaborators].sort();

  return (
    <Link href={`/task/${task.id}`} className="block transition-transform hover:scale-[1.02]">
      <div className="relative flex">
        <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${getStatusColor(task.status)}`} />
        <Card className="flex-1 cursor-pointer">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold leading-none">{task.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
              </div>
              {task.externalLink && (
                <a 
                  href={task.externalLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-muted-foreground hover:text-foreground"
                  title={task.externalLink}
                >
                  <Link2 className="h-4 w-4" />
                </a>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Badge variant="secondary" className={getCategoryColor(task.category)}>
                  {task.category}
                </Badge>
              </div>
              {sortedCollaborators.length > 0 && (
                <div className="flex -space-x-2">
                  {sortedCollaborators.map((collaborator, index) => (
                    <CollaboratorAvatar 
                      key={collaborator} 
                      name={collaborator}
                      className="border-2 border-background"
                    />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
} 