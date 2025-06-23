
'use client';

import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import { Bell, CalendarDays, Search, MoreHorizontal, SlidersHorizontal, SortAsc, LayoutGrid, Plus, Sun, Moon } from 'lucide-react';

export default function Header() {
    const [today, setToday] = useState('');
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const date = new Date();
        setToday(date.toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
        }));
    }, []);

    return (
        <div className={`${theme === 'light' ? 'bg-white text-black' : 'bg-[#1F1F22] text-white'}`}>
            <div className="flex items-center justify-between py-6 px-6">
                <div>
                    <h2 className="text-xl font-semibold">Welcome back, Adeniyi 👋</h2>
                    <p className="text-sm text-gray-400">Here’s your task overview for {new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Search size={20} className="text-gray-400" />
                    <button className="relative">
                        <Bell className="text-gray-300" size={20} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">3</span>
                    </button>
                    <div className="flex items-center gap-1 text-sm text-gray-300">
                        <CalendarDays size={18} /> <span>{today}</span>
                    </div>
                    <img src="https://i.pravatar.cc/40?img=3" alt="Profile" className="w-10 h-10 rounded-full border border-gray-700 shadow" />
                </div>
            </div>

            <div className="flex justify-between items-center px-6 py-4 border-t border-[#2A2A2E]">
                <div className="flex items-center gap-3 text-sm">
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-[#2A2A2E] transition">
                        <LayoutGrid size={16} /> <span>Board View</span>
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-[#2A2A2E] transition">
                        <Plus size={16} /> <span>Add View</span>
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-[#2A2A2E] transition">
                        <SlidersHorizontal size={16} /> <span>Filter</span>
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-[#2A2A2E] transition">
                        <SortAsc size={16} /> <span>Sort</span>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#2A2A2E] transition">
                        <MoreHorizontal size={18} />
                    </button>
                    <button className="px-4 py-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
                        New Template
                    </button>
                    <button onClick={toggleTheme} className="ml-3">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
}