'use client';

import { useState } from 'react';
import TaskCard from './TaskCard';
import { TaskType } from '@/types/task';
import { Plus, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface TaskColumnProps {
    title: string;
    color: string;
    tasks: TaskType[];
    onAddTask: (title: string, subtitle: string) => void;
    onDelete: (taskId: string) => void;
    onNext: (taskId: string) => void;
    onEdit: (taskId: string, updatedTitle: string, updatedSubtitle: string) => void;
}

export default function TaskColumn({ title, color, tasks, onAddTask, onDelete, onNext, onEdit }: TaskColumnProps) {
    const { theme } = useTheme();
    const [showForm, setShowForm] = useState(false);
    const [titleInput, setTitleInput] = useState('');
    const [subtitleInput, setSubtitleInput] = useState('');

    const handleSubmit = () => {
        if (titleInput.trim() === '') return;
        onAddTask(titleInput, subtitleInput);
        setTitleInput('');
        setSubtitleInput('');
        setShowForm(false);
    };

    return (
        <div className={`${theme === 'light' ? 'bg-[#F5F5F5]' : 'bg-[#2A2A2E]'} rounded-lg p-4 flex flex-col gap-4`}>
            <div className="flex justify-between items-center mb-2">
                <h3 className="flex items-center gap-2 text-sm font-medium">
                    <span className={`${color} w-2.5 h-2.5 rounded-full`}></span> {title}
                </h3>
                <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1 text-xs bg-[#4A4A4D] text-white px-2.5 py-1 rounded hover:bg-[#5A5A5D]">
                    {showForm ? <X size={14} /> : <Plus size={14} />} {showForm ? 'Close' : 'Add New Task'}
                </button>
            </div>

            {/* New Task Form */}
            {showForm && (
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Title"
                        className="p-2 rounded text-black"
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Subtitle"
                        className="p-2 rounded text-black"
                        value={subtitleInput}
                        onChange={(e) => setSubtitleInput(e.target.value)}
                    />
                    <button onClick={handleSubmit} className="bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700">
                        Add Task
                    </button>
                </div>
            )}

            {/* Task Cards */}
            <div className="flex flex-col gap-3">
                {tasks.map(task => (
                    <TaskCard key={task._id} task={task} onDelete={onDelete} onNext={onNext} onEdit={onEdit} />
                ))}
            </div>
        </div>
    );
}

