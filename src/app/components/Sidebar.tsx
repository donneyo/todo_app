'use client';

import { LayoutDashboard, ListChecks, FolderPlus, Plus } from 'lucide-react';

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col px-4 py-6">
            {/* Logo / Title */}
            <div className="text-2xl font-bold mb-8">ToDoApp</div>

            {/* Navigation */}
            <nav className="space-y-4 text-sm font-medium">
                <button className="flex items-center gap-2 text-left hover:bg-gray-800 px-3 py-2 rounded-md transition">
                    <LayoutDashboard size={18} />
                    Dashboard
                </button>
                <button className="flex items-center gap-2 text-left hover:bg-gray-800 px-3 py-2 rounded-md transition">
                    <ListChecks size={18} />
                    My Tasks
                </button>
            </nav>

            {/* Divider */}
            <hr className="my-6 border-gray-700" />

            {/* Projects Label + Add */}
            <div className="flex items-center justify-between mb-2 text-xs uppercase text-gray-400 tracking-wide">
                <span>Projects</span>
                <button className="hover:text-white transition">
                    <Plus size={16} />
                </button>
            </div>

            {/* Project List */}
            <div className="space-y-2 overflow-y-auto flex-1 text-sm">
                {['Work', 'Personal', 'Church', 'Side Project'].map((project, index) => (
                    <button
                        key={index}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-800 transition"
                    >
                        {project}
                    </button>
                ))}
            </div>

            {/* Create New Project */}
            <button className="mt-6 flex items-center justify-center gap-2 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition text-sm">
                <FolderPlus size={16} />
                Create Project
            </button>
        </aside>
    );
}
