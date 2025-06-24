'use client';

import { useState, useEffect } from 'react';
import TaskColumn from './TaskColumn';
import { TaskType } from '@/types/task';

interface TaskBoardProps {
    tasks: TaskType[];
}

export default function TaskBoard({ tasks: initialTasks }: TaskBoardProps) {
    const [tasks, setTasks] = useState<TaskType[]>(initialTasks);

    useEffect(() => {
        setTasks(initialTasks);
    }, [initialTasks]);

    const handleAddTask = (title: string, subtitle: string) => {
        const newTask: TaskType = {
            _id: Date.now().toString(),
            subtitle,
            title,
            status: 'todo',
            progress: { completed: 0, total: 0 },
            createdAt: new Date().toISOString(),
        };
        setTasks(prev => [...prev, newTask]);
    };

    const handleDeleteTask = (taskId: string) => {
        setTasks(prev => prev.filter(task => task._id !== taskId));
    };

    const handleNextTask = (taskId: string) => {
        setTasks(prev =>
            prev.map(task => {
                if (task._id !== taskId) return task;
                let nextStatus: TaskType['status'] = task.status;
                if (task.status === 'todo') nextStatus = 'in-progress';
                else if (task.status === 'in-progress') nextStatus = 'done';
                return { ...task, status: nextStatus };
            })
        );
    };

    const handleEditTask = (taskId: string, updatedTitle: string, updatedSubtitle: string) => {
        setTasks(prev =>
            prev.map(task => {
                if (task._id !== taskId) return task;
                return { ...task, title: updatedTitle, subtitle: updatedSubtitle };
            })
        );
    };

    const todoTasks = tasks.filter(task => task.status === 'todo');
    const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
    const doneTasks = tasks.filter(task => task.status === 'done');

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <TaskColumn title="To Do" color="bg-purple-500" tasks={todoTasks} onAddTask={handleAddTask} onDelete={handleDeleteTask} onNext={handleNextTask} onEdit={handleEditTask} />
            <TaskColumn title="In Progress" color="bg-yellow-400" tasks={inProgressTasks} onAddTask={handleAddTask} onDelete={handleDeleteTask} onNext={handleNextTask} onEdit={handleEditTask} />
            <TaskColumn title="Done" color="bg-green-500" tasks={doneTasks} onAddTask={handleAddTask} onDelete={handleDeleteTask} onNext={handleNextTask} onEdit={handleEditTask} />
        </div>
    );
}
