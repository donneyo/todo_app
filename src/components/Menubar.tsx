// 'use client';
//
// import { LayoutGrid, MoreHorizontal, Plus, SlidersHorizontal, SortAsc } from 'lucide-react';
//
// interface MenuBarProps {
//     onSearch: (query: string) => void;
//     onFilter: (status: 'all' | 'todo' | 'in-progress' | 'done') => void;
//     currentFilter: 'all' | 'todo' | 'in-progress' | 'done';
// }
//
// export default function MenuBar({ onSearch, onFilter, currentFilter }: MenuBarProps) {
//     return (
//         <div className="flex items-center justify-between px-6 pt-2 pb-4 border-b border-[#2A2A2E] bg-[#1F1F22]">
//             <div className="flex items-center gap-3 text-sm text-white">
//                 <button className="relative flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-[#2A2A2E] transition">
//                     <LayoutGrid size={16} />
//                     <span>Board View</span>
//                     <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-white rounded-full"></span>
//                 </button>
//
//                 <button className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-[#2A2A2E] transition">
//                     <Plus size={16} />
//                     <span>Add View</span>
//                 </button>
//             </div>
//
//             <div className="flex items-center gap-3 text-sm">
//                 <input
//                     type="text"
//                     placeholder="Search tasks..."
//                     onChange={(e) => onSearch(e.target.value)}
//                     className="px-3 py-1.5 rounded-md border border-[#3A3A3D] bg-[#2A2A2E] text-white"
//                 />
//
//                 <select
//                     value={currentFilter}
//                     onChange={(e) => onFilter(e.target.value as any)}
//                     className="px-3 py-1.5 rounded-md border border-[#3A3A3D] bg-[#2A2A2E] text-white"
//                 >
//                     <option value="all">All</option>
//                     <option value="todo">To Do</option>
//                     <option value="in-progress">In Progress</option>
//                     <option value="done">Done</option>
//                 </select>
//
//                 <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#3A3A3D] text-white hover:bg-[#2A2A2E] transition">
//                     <MoreHorizontal size={18} />
//                 </button>
//
//                 <button className="px-4 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
//                     New Template
//                 </button>
//             </div>
//         </div>
//     );
// }

'use client';

import { LayoutGrid, SlidersHorizontal, SortAsc, MoreHorizontal } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface MenuBarProps {
    onSearch: (value: string) => void;
    onFilter: (value: 'all' | 'todo' | 'in-progress' | 'done') => void;
    currentFilter: 'all' | 'todo' | 'in-progress' | 'done';
}

export default function MenuBar({ onSearch, onFilter, currentFilter }: MenuBarProps) {
    const { theme } = useTheme();

    return (
        <div className={`flex items-center justify-between px-6 pt-2 pb-4 border-b 
            ${theme === 'light' ? 'border-[#CCCCCC] bg-white text-black' : 'border-[#2A2A2E] bg-[#1F1F22] text-white'}`}>

            <div className="flex items-center gap-3 text-sm">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-md">
                    <LayoutGrid size={16} />
                    <span>Board View</span>
                </button>

                <input
                    type="text"
                    placeholder="Search tasks..."
                    onChange={(e) => onSearch(e.target.value)}
                    className={`ml-4 px-3 py-1.5 rounded-md border 
                        ${theme === 'light'
                        ? 'bg-white border-[#CCCCCC] text-black'
                        : 'bg-[#2A2A2E] border-[#3A3A3D] text-white'}`}
                />
            </div>

            <div className="flex items-center gap-3 text-sm">
                <select
                    value={currentFilter}
                    onChange={(e) => onFilter(e.target.value as any)}
                    className={`px-3 py-1.5 rounded-md border 
                        ${theme === 'light'
                        ? 'bg-white border-[#CCCCCC] text-black'
                        : 'bg-[#2A2A2E] border-[#3A3A3D] text-white'}`}
                >
                    <option value="all">All</option>
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>

                <button className={`px-4 py-1.5 rounded-md font-semibold 
                    ${theme === 'light' ? 'bg-black text-white hover:bg-[#333333]' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                    New Template
                </button>
            </div>
        </div>
    );
}
