'use client';

import {
    Menu, UserCog, Calendar, BarChart3, UploadCloud, SlidersHorizontal, LogOut,
    Sun, Moon, ChevronRight, ChevronDown, ChevronLeft, X
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
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleSidebar = () => setCollapsed(!collapsed);
    const toggleMobile = () => setMobileOpen(!mobileOpen);

    const sidebarWidth = collapsed ? 'w-0' : 'w-[261px]';
    const themeBg = theme === 'light' ? 'bg-[#F8F8F8] text-[#0D0D0D]' : 'bg-[#18181B] text-white';

    return (
        <>
            {/* Mobile top bar */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 bg-[#121212] text-white z-50">
                <button onClick={toggleMobile}>
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <Image src="/Logo.png" alt="Logo" width={30} height={30} />
            </div>

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 left-0 h-screen w-full z-40 bg-black bg-opacity-50 md:hidden transition ${mobileOpen ? 'block' : 'hidden'}`} onClick={toggleMobile}>
                <div className={`absolute top-0 left-0 h-screen w-[261px] ${themeBg} p-4 transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} transition duration-300`} onClick={(e) => e.stopPropagation()}>
                    <SidebarContent
                        isProjectsOpen={isProjectsOpen}
                        setIsProjectsOpen={setIsProjectsOpen}
                        isTasksOpen={isTasksOpen}
                        setIsTasksOpen={setIsTasksOpen}
                        theme={theme}
                        toggleTheme={toggleTheme}
                    />
                </div>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex h-screen relative">
                {/* Left thin column */}
                <div className="w-16 bg-[#121212] text-white flex flex-col justify-between items-center py-6">
                    <div>
                        <div className="flex gap-2 mb-6">
                            <Dot active /><Dot /><Dot />
                        </div>
                        <div className="mb-10">
                            <Image src="/Logo.png" alt="Logo" width={25} height={25} className="rounded-lg object-contain" />
                        </div>
                        <div className="flex flex-col items-center gap-y-6 mt-[80px]">
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

                {/* Right collapsible sidebar */}
                <div className={`${sidebarWidth} px-4 py-6 flex flex-col justify-between transition-all duration-300 overflow-hidden ${themeBg}`}>
                    {!collapsed && (
                        <SidebarContent
                            isProjectsOpen={isProjectsOpen}
                            setIsProjectsOpen={setIsProjectsOpen}
                            isTasksOpen={isTasksOpen}
                            setIsTasksOpen={setIsTasksOpen}
                            theme={theme}
                            toggleTheme={toggleTheme}
                        />
                    )}
                </div>

                {/* Toggle button (always visible) */}
                <button
                    onClick={toggleSidebar}
                    className="absolute top-6 -right-4 bg-gray-400 hover:bg-gray-500 text-white p-1 rounded-full transition"
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </aside>
        </>
    );
}

function SidebarContent({
                            isProjectsOpen, setIsProjectsOpen, isTasksOpen, setIsTasksOpen, theme, toggleTheme
                        }: any) {
    return (
        <>
            <div>
                <h2 className="text-lg font-bold mb-6">Projects</h2>

                <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium">Team</span>
                    <ChevronRight size={16} />
                </div>

                <div className="flex justify-between items-center py-2 cursor-pointer" onClick={() => setIsProjectsOpen(!isProjectsOpen)}>
                    <span className="text-sm font-medium">Projects</span>
                    <ChevronDown size={16} className={`transition-transform ${isProjectsOpen ? 'rotate-180' : 'rotate-0'}`} />
                </div>

                {isProjectsOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                        <div className={`text-xs ${theme === 'light' ? 'text-[#555]' : 'text-gray-400'}`}>All projects (3)</div>
                        <div className="flex items-center text-xs">
                            <div className={`px-3 py-1 rounded-full ${theme === 'light' ? 'bg-[#E0E0E0]' : 'bg-[#3A3A3D]'}`}>
                                Design system
                            </div>
                        </div>
                        <div className={`text-xs ${theme === 'light' ? 'text-[#555]' : 'text-gray-400'}`}>User flow</div>
                        <div className={`text-xs ${theme === 'light' ? 'text-[#555]' : 'text-gray-400'}`}>Ux research</div>
                    </div>
                )}

                <div className="flex justify-between items-center py-2 mt-4 cursor-pointer" onClick={() => setIsTasksOpen(!isTasksOpen)}>
                    <span className="text-sm font-medium">Tasks</span>
                    <ChevronDown size={16} className={`transition-transform ${isTasksOpen ? 'rotate-180' : 'rotate-0'}`} />
                </div>

                {isTasksOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                        <div className={`text-xs ${theme === 'light' ? 'text-[#555]' : 'text-gray-400'}`}>All tasks (11)</div>
                        <div className={`text-xs ${theme === 'light' ? 'text-[#555]' : 'text-gray-400'}`}>To do (4)</div>
                        <div className="flex items-center text-xs">
                            <div className={`px-3 py-1 rounded-full ${theme === 'light' ? 'bg-[#E0E0E0]' : 'bg-[#3A3A3D]'}`}>
                                In progress (4)
                            </div>
                        </div>
                        <div className={`text-xs ${theme === 'light' ? 'text-[#555]' : 'text-gray-400'}`}>Done (3)</div>
                    </div>
                )}

                <div className="flex justify-between items-center py-2 mt-4">
                    <span className="text-sm font-medium">Reminders</span>
                    <ChevronRight size={16} />
                </div>

                <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium">Messengers</span>
                    <ChevronRight size={16} />
                </div>
            </div>

            <div className="w-[230px] mx-auto bg-[#2A2A2E] p-1 rounded-full flex justify-between items-center shadow-inner">
                <button
                    onClick={() => toggleTheme('light')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${theme === 'light' ? 'bg-[#3A3A3D] shadow-inner' : ''}`}
                >
                    <Sun size={18} className="text-white" />
                    <span className="text-sm text-white">Light</span>
                </button>

                <button
                    onClick={() => toggleTheme('dark')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-[#3A3A3D] shadow-inner' : ''}`}
                >
                    <Moon size={18} className="text-white" />
                    <span className="text-sm text-white">Dark</span>
                </button>
            </div>
        </>
    );
}