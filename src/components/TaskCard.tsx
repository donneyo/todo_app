'use client';

import { useState } from 'react';
import { Menu } from "lucide-react";
import { useTheme } from '@/context/ThemeContext';

interface TaskCardProps {
    title: string;
    subtitle: string;
    status: 'todo' | 'in-progress' | 'done';
    progress: {
        completed: number;
        total: number;
    };
    date: string;
    onClickNext: () => void;
    onDelete: () => void;
    onEdit?: () => void;
}

export default function TaskCard({
                                     title,
                                     subtitle,
                                     status,
                                     progress,
                                     date,
                                     onClickNext,
                                     onDelete,
                                     onEdit
                                 }: TaskCardProps) {
    const { theme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    let progressColor = '';
    let progressPercentage = 0;

    if (status === 'todo') {
        progressColor = 'bg-purple-500';
        progressPercentage = 33;
    } else if (status === 'in-progress') {
        progressColor = 'bg-orange-400';
        progressPercentage = 66;
    } else if (status === 'done') {
        progressColor = 'bg-green-400';
        progressPercentage = 100;
    }

    return (
        <div className={`relative rounded-lg p-4 space-y-2 
            ${theme === 'light' ? 'bg-white border border-[#DDDDDD] text-black shadow-sm' : 'bg-[#3A3A3D] text-white'}`}>

            {/* Top Row */}
            <div className="flex justify-between items-center">
                <div>
                    <h4 className={`font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>{title}</h4>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{subtitle}</p>
                </div>

                <div className="relative">
                    <button
                        className={`w-6 h-6 rounded-full text-xs flex items-center justify-center 
                            ${theme === 'light' ? 'bg-[#EEEEEE] text-black' : 'bg-[#4A4A4D] text-white'}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ⋯
                    </button>

                    {menuOpen && (
                        <div className={`absolute right-0 mt-2 w-32 rounded shadow z-50 
                            ${theme === 'light' ? 'bg-white border border-[#CCCCCC] text-black' : 'bg-[#4A4A4D] text-white'}`}>
                            {status === 'todo' && (
                                <>
                                    <button onClick={onEdit} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Edit</button>
                                    <button onClick={onDelete} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Delete</button>
                                    <button onClick={onClickNext} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Next</button>
                                </>
                            )}
                            {status === 'in-progress' && (
                                <>
                                    <button onClick={onDelete} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Delete</button>
                                    <button onClick={onClickNext} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Next</button>
                                </>
                            )}
                            {status === 'done' && (
                                <button onClick={onDelete} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Delete</button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Progress Row */}
            <div className="space-y-1">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        <Menu size={12} className={`${theme === 'light' ? 'text-black' : 'text-white'}`} />
                        <span className="text-sm">Progress</span>
                    </div>
                    <div className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        {progress.completed}/{progress.total}
                    </div>
                </div>

                <div className={`relative w-full h-2 rounded ${theme === 'light' ? 'bg-gray-200' : 'bg-[#555]'}`}>
                    <div className={`absolute top-0 left-0 h-2 ${progressColor} rounded`} style={{ width: `${progressPercentage}%` }} />
                </div>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-center">
                <span className={`text-xs shadow-md rounded-full px-3 py-1 
                    ${theme === 'light' ? 'bg-[#F5F5F5] text-gray-600' : 'bg-[#4A4A4D] text-gray-300'}`}>
                    {date}
                </span>
                <div className="flex gap-2">
                    <span>💬</span>
                    <span>📎</span>
                </div>
            </div>
        </div>
    );
}
