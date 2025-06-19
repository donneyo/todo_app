// 'use client';
//
// import { useEffect, useState, useCallback } from 'react';
// import TaskColumn from './TaskColumn';
// import { fetchTasks } from '@/lib/api';
// import { TaskType } from '@/types/task';
// import { useTheme } from '@/context/ThemeContext';
// import { LayoutGrid, Plus, SlidersHorizontal, SortAsc, MoreHorizontal } from 'lucide-react';
//
// export default function TaskBoard() {
//     const { theme } = useTheme();
//     const [tasks, setTasks] = useState<TaskType[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filterStatus, setFilterStatus] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all');
//
//     const loadTasks = useCallback(async () => {
//         try {
//             setLoading(true);
//             const data = await fetchTasks();
//             setTasks(data);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     }, []);
//
//     useEffect(() => {
//         loadTasks();
//     }, [loadTasks]);
//
//     const filteredTasks = tasks.filter(task => {
//         const matchesSearch =
//             task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             (task.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()));
//         const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
//         return matchesSearch && matchesStatus;
//     });
//
//     const todo = filteredTasks.filter(task => task.status === 'todo');
//     const inProgress = filteredTasks.filter(task => task.status === 'in-progress');
//     const done = filteredTasks.filter(task => task.status === 'done');
//
//     if (loading) {
//         return (
//             <div className={`w-full text-center py-10 font-semibold text-lg ${theme === 'light' ? 'text-black' : 'text-white'}`}>
//                 Loading...
//             </div>
//         );
//     }
//
//     return (
//         <>
//             {/* Top Menu */}
//             <div className={`flex items-center justify-between px-6 pt-2 pb-4 border-b
//                 ${theme === 'light' ? 'border-[#CCCCCC] bg-white text-black' : 'border-[#2A2A2E] bg-[#1F1F22] text-white'}`}>
//
//                 {/* Left side buttons */}
//                 <div className="flex items-center gap-3 text-sm">
//                     <button className="relative flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-[#2A2A2E] transition">
//                         <LayoutGrid size={16} />
//                         <span>Board View</span>
//                         <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-white rounded-full"></span>
//                     </button>
//
//                     <button className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-[#2A2A2E] transition">
//                         <Plus size={16} />
//                         <span>Add View</span>
//                     </button>
//                 </div>
//
//                 {/* Right side actions */}
//                 <div className="flex items-center gap-3 text-sm">
//                     <div className="relative">
//                         <input
//                             type="text"
//                             placeholder="Search tasks..."
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className={`pl-9 pr-4 py-2 rounded-lg border text-sm
//                                 ${theme === 'light'
//                                 ? 'bg-white border-[#CCCCCC] text-black'
//                                 : 'bg-[#2A2A2E] border-[#3A3A3D] text-white'}`}
//                         />
//                         <span className="absolute left-3 top-2.5 text-gray-400">
//                             🔍
//                         </span>
//                     </div>
//
//                     <button
//                         onClick={() => setFilterStatus('all')}
//                         className={`flex items-center gap-1 px-3 py-1.5 rounded-md border
//                             ${theme === 'light'
//                             ? 'border-[#CCCCCC] text-black hover:bg-[#f3f3f3]'
//                             : 'border-[#3A3A3D] text-white hover:bg-[#2A2A2E]'}`}
//                     >
//                         <SlidersHorizontal size={16} />
//                         <span>Filter</span>
//                     </button>
//
//                     <button
//                         onClick={() => setFilterStatus('todo')}
//                         className={`flex items-center gap-1 px-3 py-1.5 rounded-md border
//                             ${theme === 'light'
//                             ? 'border-[#CCCCCC] text-black hover:bg-[#f3f3f3]'
//                             : 'border-[#3A3A3D] text-white hover:bg-[#2A2A2E]'}`}
//                     >
//                         <SortAsc size={16} />
//                         <span>Sort Todo</span>
//                     </button>
//
//                     <button className={`w-8 h-8 flex items-center justify-center rounded-full border
//                         ${theme === 'light'
//                         ? 'border-[#CCCCCC] text-black hover:bg-[#f3f3f3]'
//                         : 'border-[#3A3A3D] text-white hover:bg-[#2A2A2E]'}`}>
//                         <MoreHorizontal size={18} />
//                     </button>
//
//                     <button className={`px-4 py-1.5 rounded-md font-semibold
//                         ${theme === 'light' ? 'bg-black text-white hover:bg-[#333333]' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
//                         New Template
//                     </button>
//                 </div>
//             </div>
//
//             {/* Columns */}
//             <div className="grid gap-6 md:grid-cols-3 w-full p-6">
//                 <TaskColumn title="To Do" count={todo.length} color="bg-purple-500" tasks={todo} refreshTasks={loadTasks} />
//                 <TaskColumn title="In Progress" count={inProgress.length} color="bg-yellow-400" tasks={inProgress} refreshTasks={loadTasks} />
//                 <TaskColumn title="Done" count={done.length} color="bg-green-500" tasks={done} refreshTasks={loadTasks} />
//             </div>
//         </>
//     );
// }


import TaskColumn from './TaskColumn';
import { TaskType } from '@/types/task';

interface TaskBoardProps {
    tasks: TaskType[];
    refreshTasks: () => void;
}

export default function TaskBoard({ tasks, refreshTasks }: TaskBoardProps) {
    const todoTasks = tasks.filter(task => task.status === 'todo');
    const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
    const doneTasks = tasks.filter(task => task.status === 'done');

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TaskColumn title="To Do" tasks={todoTasks} refreshTasks={refreshTasks} status="todo" />
            <TaskColumn title="In Progress" tasks={inProgressTasks} refreshTasks={refreshTasks} status="in-progress" />
            <TaskColumn title="Done" tasks={doneTasks} refreshTasks={refreshTasks} status="done" />
        </div>
    );
}
