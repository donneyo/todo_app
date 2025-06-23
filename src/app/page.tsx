'use client';

import { ThemeProvider } from '@/context/ThemeContext';

import TaskBoard from '@/components/TaskBoard';
import { TaskType } from '@/types/task';

export default function HomePage() {
    const dummyTasks: TaskType[] = [
        { _id: '1', title: 'Design Landing Page', subtitle: 'Update Figma draft', status: 'todo', progress: { completed: 3, total: 5 }, createdAt: '2025-06-19T12:00:00Z' },
        { _id: '2', title: 'Fix API Bugs', subtitle: 'Resolve POST errors', status: 'in-progress', progress: { completed: 1, total: 4 }, createdAt: '2025-06-18T09:30:00Z' },
        { _id: '3', title: 'Deploy to Production', subtitle: 'Push to Vercel', status: 'done', progress: { completed: 4, total: 4 }, createdAt: '2025-06-17T15:00:00Z' }
    ];

    return (
        <ThemeProvider>
            <div className="min-h-screen">
                <TaskBoard tasks={dummyTasks} />
            </div>
        </ThemeProvider>
    );
}

