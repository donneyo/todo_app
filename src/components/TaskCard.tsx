'use client';

import { useState } from 'react';
import { MoreHorizontal, MessageSquare, Paperclip } from 'lucide-react';
import { TaskType } from '@/types/task';
import { useTheme } from '@/context/ThemeContext';

interface TaskCardProps {
    onDelete: (taskId: string) => void;
    task: TaskType;
    onNext: (taskId: string) => void;
    onEdit: (taskId: string, updatedTitle: string, updatedSubtitle: string) => void;
}

export default function TaskCard({ task, onDelete, onNext, onEdit }: TaskCardProps) {
    const { theme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedSubtitle, setEditedSubtitle] = useState(task.subtitle || '');

    let completed = 0;
    let progressPercentage = 0;
    let progressColor = '';

    if (task.status === 'todo') {
        completed = 1;
        progressPercentage = 33;
        progressColor = 'bg-purple-400';
    } else if (task.status === 'in-progress') {
        completed = 2;
        progressPercentage = 66;
        progressColor = 'bg-orange-400';
    } else if (task.status === 'done') {
        completed = 3;
        progressPercentage = 100;
        progressColor = 'bg-green-400';
    }

    const formattedDate = new Date(task.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    const getMenuItems = () => {
        if (task.status === 'todo') return ['Edit', 'Delete', 'Next'];
        if (task.status === 'in-progress') return ['Delete', 'Next'];
        if (task.status === 'done') return ['Delete'];
        return [];
    };

    const handleMenuAction = (action: string) => {
        setMenuOpen(false);
        if (action === 'Edit') setEditMode(true);
        if (action === 'Delete') onDelete(task._id);
        if (action === 'Next') onNext(task._id);
    };

    const handleSaveEdit = () => {
        onEdit(task._id, editedTitle, editedSubtitle);
        setEditMode(false);
    };

    return (
        <div className={`${theme === 'light' ? 'bg-white text-black' : 'bg-[#3A3A3D] text-white'} relative rounded-lg p-4 space-y-3 transition w-full max-w-full`}>
            <div className="flex justify-between items-start">
                {editMode ? (
                    <div className="flex flex-col gap-1 w-full">
                        <input
                            className={`p-2 rounded border ${theme === 'light' ? 'bg-white text-black border-gray-300' : 'bg-[#4A4A4D] text-white border-gray-600'}`}
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            placeholder="Title"
                        />
                        <input
                            className={`p-2 rounded border ${theme === 'light' ? 'bg-white text-black border-gray-300' : 'bg-[#4A4A4D] text-white border-gray-600'}`}
                            value={editedSubtitle}
                            onChange={(e) => setEditedSubtitle(e.target.value)}
                            placeholder="Subtitle"
                        />
                        <button
                            onClick={handleSaveEdit}
                            className="mt-1 bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div>
                        <h4 className="font-semibold text-sm">{task.title}</h4>
                        <p className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} text-xs mt-1`}>{task.subtitle}</p>
                    </div>
                )}

                {!editMode && (
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-[#EFEFEF] text-black' : 'bg-[#4A4A4D] text-white'}`}
                        >
                            <MoreHorizontal size={16} />
                        </button>

                        {menuOpen && (
                            <div className={`absolute right-0 mt-2 w-32 rounded shadow-lg z-50 ${theme === 'light' ? 'bg-white text-black' : 'bg-[#4A4A4D] text-white'}`}>
                                {getMenuItems().map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleMenuAction(item)}
                                        className="block w-full text-left px-4 py-2 hover:bg-opacity-70"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div>
                <div className="flex justify-between items-center text-xs mb-1">
                    <span>Progress</span>
                    <span>{completed}/3</span>
                </div>
                <div className="relative w-full h-2 bg-[#555] rounded">
                    <div className={`absolute top-0 left-0 h-2 ${progressColor} rounded`} style={{ width: `${progressPercentage}%` }} />
                </div>
            </div>

            <div className="flex justify-between items-center">
                <span className={`text-xs px-3 py-1 rounded-full ${theme === 'light' ? 'bg-[#EFEFEF] text-black' : 'bg-[#4A4A4D] text-gray-300'}`}>
                    {formattedDate}
                </span>
                <div className={`flex items-center gap-3 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                    <MessageSquare size={16} />
                    <Paperclip size={16} />
                </div>
            </div>
        </div>
    );
}
