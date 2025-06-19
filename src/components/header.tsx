'use client';

import { useEffect, useState } from 'react';
import { CalendarDays, Bell, Search } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
    const [today, setToday] = useState('');
    const { theme } = useTheme();

    useEffect(() => {
        const date = new Date();
        const formatted = date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
        setToday(formatted);
    }, []);

    return (
        <div className={`flex items-center justify-between py-4 px-6 shadow-sm mb-6 
            ${theme === 'light' ? 'bg-white text-[#0D0D0D]' : 'bg-[#1F1F22] text-white'}`}>

            {/* Left: Greeting */}
            <div>
                <h2 className={`text-xl font-semibold ${theme === 'light' ? 'text-[#0D0D0D]' : ''}`}>
                    Welcome back, Adeniyi 👋
                </h2>
                <p className={`text-sm ${theme === 'light' ? 'text-[#333333]' : 'text-gray-400'}`}>
                    Here’s your task overview for {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                </p>
            </div>

            {/* Right: Search + Icons */}
            <div className="flex items-center gap-4">

                <div className="flex items-center gap-4">
                    {/* Search Icon */}
                    <div className="flex items-center">
                        <Search size={20} className={`${theme === 'light' ? 'text-[#666666]' : 'text-gray-400'}`} />
                    </div>

                    {/* Notification Bell */}
                    <button className="relative">
                        <Bell className={`${theme === 'light' ? 'text-[#333333]' : 'text-gray-300'}`} size={20} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">3</span>
                    </button>

                    {/* Date + Calendar Icon */}
                    <div className={`flex items-center gap-1 text-sm ${theme === 'light' ? 'text-[#333333]' : 'text-gray-300'}`}>
                        <CalendarDays size={18} />
                        <span>{today}</span>
                    </div>
                </div>





                {/* Profile Image */}
                <img
                    src="https://i.pravatar.cc/40?img=3"
                    alt="Profile"
                    className={`w-10 h-10 rounded-full object-cover border 
                        ${theme === 'light' ? 'border-[#CCCCCC]' : 'border-gray-700'} shadow`}
                />
            </div>
        </div>
    );
}
