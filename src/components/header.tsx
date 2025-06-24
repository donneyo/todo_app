'use client';

import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import { Bell, LayoutGrid, Plus, Sun, Moon } from 'lucide-react';

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

            {/* Top section */}
            <div className="flex justify-between items-center py-4 px-4 md:px-6">
                <div>
                    <h2 className="text-lg font-semibold">Welcome back, Adeniyi 👋</h2>
                    <p className="hidden md:block text-sm text-gray-400">
                        Here’s your task overview for {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative">
                        <Bell className="text-gray-300" size={20} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">3</span>
                    </button>
                    <img src="https://i.pravatar.cc/40?img=3" alt="Profile" className="w-10 h-10 rounded-full border border-gray-700 shadow" />
                </div>
            </div>

            {/* Bottom section */}

            {/* DESKTOP VIEW */}
            <div className="hidden md:flex justify-between items-center px-6 py-3 border-t border-[#2A2A2E]">
                <div className="flex items-center gap-3 text-sm">
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-[#2A2A2E] transition">
                        <LayoutGrid size={16} /> <span>Board View</span>
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-[#2A2A2E] transition">
                        <Plus size={16} /> <span>Add View</span>
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
                        New Template
                    </button>
                    <button onClick={toggleTheme}>
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </div>
            </div>

            {/* MOBILE VIEW */}
            <div className="flex md:hidden justify-between items-center px-4 py-3 border-t border-[#2A2A2E]">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-[#2A2A2E] transition text-sm">
                    <LayoutGrid size={16} /> <span>Board View</span>
                </button>
                <button onClick={toggleTheme}>
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            </div>
        </div>
    );
}
