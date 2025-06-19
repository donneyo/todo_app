'use client';

import { useState } from 'react';
import { TaskType } from '@/types/task';

interface TaskColumnProps {
    title: string;
    tasks: TaskType[];
    refreshTasks: () => void;
    status: 'todo' | 'in-progress' | 'done';
}

export default function TaskColumn({ title, tasks, refreshTasks, status }: TaskColumnProps) {
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleCreate = async () => {
        if (!newTaskTitle.trim()) return;
        await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTaskTitle, status })
        });
        setNewTaskTitle('');
        refreshTasks();
    };

    const handleDelete = async (id: string) => {
        await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
        refreshTasks();
    };

    const handleUpdateStatus = async (id: string, newStatus: 'todo' | 'in-progress' | 'done') => {
        await fetch(`/api/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        refreshTasks();
    };

    return (
        <div className="bg-[#18181B] p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-4">{title}</h3>

            <div className="space-y-2 mb-4">
                {tasks.map(task => (
                    <div key={task._id} className="bg-[#2A2A2E] p-2 rounded flex justify-between items-center">
                        <span>{task.title}</span>
                        <div className="flex gap-2">
                            {status !== 'done' && (
                                <button onClick={() => handleUpdateStatus(task._id, 'done')} className="text-green-400">✔</button>
                            )}
                            <button onClick={() => handleDelete(task._id)} className="text-red-400">🗑</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    placeholder="New task..."
                    className="flex-1 px-2 py-1 rounded bg-[#2A2A2E] text-white"
                />
                <button onClick={handleCreate} className="bg-blue-500 text-white px-3 rounded">Add</button>
            </div>
        </div>
    );
}
