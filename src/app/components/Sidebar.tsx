'use client';

import {
    Menu, UserCog, Calendar, BarChart3, UploadCloud, SlidersHorizontal, LogOut,
    Sun, Moon, ChevronRight, ChevronDown
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

function Dot({ active = false }: { active?: boolean }) {
    return (
        <div className={`w-[6px] h-[6px] rounded-full ${active ? 'bg-white' : 'bg-gray-500'} transition`} />
    );
}

export default function Sidebar() {
    const { theme, toggleTheme } = useTheme();
    const [isProjectsOpen, setIsProjectsOpen] = useState(true);
    const [isTasksOpen, setIsTasksOpen] = useState(true);

    return (
        <aside className="flex h-screen">

            {/* Left thin column - always dark */}
            <div className="w-16 bg-[#121212] text-white flex flex-col justify-between items-center py-[24px]">
                <div>
                    <div className="flex gap-x-[8px] mb-6">
                        <Dot active />
                        <Dot />
                        <Dot />
                    </div>

                    <div className="mb-10">
                        <Image
                            src="/Logo.png"
                            alt="Logo"
                            width={25}
                            height={25}
                            className="rounded-lg object-contain"
                        />
                    </div>

                    <div className="flex flex-col items-center gap-y-6 mt-[80px]">
                        <div className="bg-gray-700 p-1 rounded-full">
                            <Menu size={18} className="text-white" />
                        </div>
                        <UserCog size={18} className="text-white" />
                        <Calendar size={18} className="text-white" />
                        <BarChart3 size={18} className="text-white" />
                        <UploadCloud size={18} className="text-white" />
                        <SlidersHorizontal size={18} className="text-white" />
                    </div>
                </div>

                <div className="mb-4">
                    <LogOut size={18} className="text-white" />
                </div>
            </div>

            {/* Right wide sidebar */}
            <div className={`w-[261px] px-4 py-6 flex flex-col justify-between 
                ${theme === 'light' ? 'bg-[#F8F8F8] text-[#0D0D0D]' : 'bg-[#18181B] text-white'}`}>

                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold">Projects</h2>
                    </div>

                    <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium">Team</span>
                        <ChevronRight size={16} />
                    </div>

                    <div className="mt-2">
                        <div
                            onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                            className="flex justify-between items-center py-2 cursor-pointer"
                        >
                            <span className="text-sm font-medium">Projects</span>
                            <ChevronDown size={16} className={`transform transition-transform ${isProjectsOpen ? 'rotate-180' : 'rotate-0'}`} />
                        </div>

                        {isProjectsOpen && (
                            <div className="ml-4 mt-2 space-y-2">
                                <div className={`text-xs ${theme === 'light' ? 'text-[#555555]' : 'text-gray-400'}`}>All projects (3)</div>
                                <div className="flex items-center text-xs">
                                    <div className={`px-3 py-1 rounded-full ${theme === 'light' ? 'bg-[#E0E0E0]' : 'bg-[#3A3A3D]'}`}>
                                        Design system
                                    </div>
                                </div>
                                <div className={`text-xs ${theme === 'light' ? 'text-[#555555]' : 'text-gray-400'}`}>User flow</div>
                                <div className={`text-xs ${theme === 'light' ? 'text-[#555555]' : 'text-gray-400'}`}>Ux research</div>
                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <div
                            onClick={() => setIsTasksOpen(!isTasksOpen)}
                            className="flex justify-between items-center py-2 cursor-pointer"
                        >
                            <span className="text-sm font-medium">Tasks</span>
                            <ChevronDown size={16} className={`transform transition-transform ${isTasksOpen ? 'rotate-180' : 'rotate-0'}`} />
                        </div>

                        {isTasksOpen && (
                            <div className="ml-4 mt-2 space-y-2">
                                <div className={`text-xs ${theme === 'light' ? 'text-[#555555]' : 'text-gray-400'}`}>All tasks (11)</div>
                                <div className={`text-xs ${theme === 'light' ? 'text-[#555555]' : 'text-gray-400'}`}>To do (4)</div>
                                <div className="flex items-center text-xs">
                                    <div className={`px-3 py-1 rounded-full ${theme === 'light' ? 'bg-[#E0E0E0]' : 'bg-[#3A3A3D]'}`}>
                                        In progress (4)
                                    </div>
                                </div>
                                <div className={`text-xs ${theme === 'light' ? 'text-[#555555]' : 'text-gray-400'}`}>Done (3)</div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center py-2 mt-4">
                        <span className="text-sm font-medium">Reminders</span>
                        <ChevronRight size={16} />
                    </div>

                    <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium">Messengers</span>
                        <ChevronRight size={16} />
                    </div>
                </div>

                {/* Theme toggle */}
                <div className="w-[230px] mx-auto bg-[#2A2A2E] p-1 rounded-full flex justify-between items-center shadow-inner">
                    <button
                        onClick={() => toggleTheme('light')}
                        className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 
                            ${theme === 'light' ? 'bg-[#3A3A3D] shadow-inner' : ''}`}
                    >
                        <Sun size={18} className="text-white" />
                        <span className="text-sm text-white">Light</span>
                    </button>

                    <button
                        onClick={() => toggleTheme('dark')}
                        className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 
                            ${theme === 'dark' ? 'bg-[#3A3A3D] shadow-inner' : ''}`}
                    >
                        <Moon size={18} className="text-white" />
                        <span className="text-sm text-white">Dark</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}


