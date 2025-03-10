export type TaskStatus = 'completed' | 'deprecated' | 'ongoing' | 'not-started';

export type TaskCategory = 'Design' | 'Code' | 'Management';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  category: TaskCategory;
  estimatedHours: number;
  collaborators?: string;
  externalLink?: string;
  dateStarted: Date;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Set up project structure',
    description: 'Initialize the project with Next.js and set up essential configurations',
    status: 'completed',
    category: 'Code',
    estimatedHours: 4,
    collaborators: 'John Doe, Jane Smith',
    dateStarted: new Date('2024-03-01'),
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-02'),
    ownerId: 'user_1',
  },
  {
    id: '2',
    title: 'Design database schema',
    description: 'Create the initial database schema for the application',
    status: 'completed',
    category: 'Design',
    estimatedHours: 6,
    collaborators: 'Alice Johnson',
    externalLink: 'https://dbdiagram.io/example',
    dateStarted: new Date('2024-03-02'),
    createdAt: new Date('2024-03-02'),
    updatedAt: new Date('2024-03-03'),
    ownerId: 'user_1',
  },
  {
    id: '3',
    title: 'Implement authentication',
    description: 'Set up user authentication using NextAuth.js',
    status: 'ongoing',
    category: 'Code',
    estimatedHours: 8,
    collaborators: 'John Doe, Bob Wilson',
    dateStarted: new Date('2024-03-03'),
    createdAt: new Date('2024-03-03'),
    updatedAt: new Date('2024-03-03'),
    ownerId: 'user_1',
  },
  {
    id: '4',
    title: 'Create API endpoints',
    description: 'Implement RESTful API endpoints for the application',
    status: 'not-started',
    category: 'Code',
    estimatedHours: 12,
    dateStarted: new Date('2024-03-03'),
    createdAt: new Date('2024-03-03'),
    updatedAt: new Date('2024-03-03'),
    ownerId: 'user_1',
  },
  {
    id: '5',
    title: 'Project planning and roadmap',
    description: 'Define project milestones and resource allocation',
    status: 'ongoing',
    category: 'Management',
    estimatedHours: 16,
    collaborators: 'Charlie Brown',
    dateStarted: new Date('2024-02-28'),
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-03-01'),
    ownerId: 'user_1',
  },
  {
    id: '6',
    title: 'UI/UX Design System',
    description: 'Create a comprehensive design system for the application',
    status: 'not-started',
    category: 'Design',
    estimatedHours: 4,
    collaborators: 'Alice Johnson, Bob Wilson',
    externalLink: 'https://www.figma.com/example',
    dateStarted: new Date('2024-03-03'),
    createdAt: new Date('2024-03-03'),
    updatedAt: new Date('2024-03-03'),
    ownerId: 'user_1',
  },
]; 