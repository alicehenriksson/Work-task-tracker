import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface CollaboratorAvatarProps {
  name: string;
  className?: string;
}

export function CollaboratorAvatar({ name, className }: CollaboratorAvatarProps) {
  // Get initials from name (up to 2 characters)
  const initials = name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Generate a consistent color based on the name
  const colors = [
    "bg-red-100 text-red-700",
    "bg-green-100 text-green-700",
    "bg-blue-100 text-blue-700",
    "bg-yellow-100 text-yellow-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-indigo-100 text-indigo-700",
  ];

  const colorIndex = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

  const colorClass = colors[colorIndex];

  return (
    <Avatar className={cn("h-8 w-8", className)}>
      <AvatarFallback className={cn("text-xs font-medium", colorClass)}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
} 