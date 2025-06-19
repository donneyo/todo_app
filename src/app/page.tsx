'use client';

import { useState, useEffect } from 'react';
import MenuBar from '@/components/Menubar';
import TaskBoard from '@/components/TaskBoard';
import { TaskType } from '@/types/task';

export default function HomePage() {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all');

    const refreshTasks = async () => {
        try {
            const res = await fetch('/api/tasks');
            const allTasks = await res.json();
            setTasks(allTasks);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        refreshTasks();
    }, []);

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (task.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <section>
            <MenuBar
                onSearch={setSearchQuery}
                onFilter={setFilterStatus}
                currentFilter={filterStatus}
            />
            <div className="p-6">
                <TaskBoard tasks={filteredTasks} refreshTasks={refreshTasks} />
            </div>
        </section>
    );
}
