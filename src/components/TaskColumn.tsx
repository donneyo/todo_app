'use client';

import { useState } from 'react';
import TaskCard from './TaskCard';
import { createTask, updateTaskStatus, deleteTask, updateTask } from '@/lib/api';
import { TaskType } from '@/types/task';
import { useTheme } from '@/context/ThemeContext';

interface TaskColumnProps {
    title: string;
    count: number;
    color: string;
    tasks: TaskType[];
    refreshTasks: () => void;
}

export default function TaskColumn({ title, count, color, tasks, refreshTasks }: TaskColumnProps) {
    const { theme } = useTheme();
    const [showForm, setShowForm] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskSubtitle, setNewTaskSubtitle] = useState('');

    const handleAddTask = async () => {
        if (!newTaskTitle.trim()) return;
        try {
            await createTask({ title: newTaskTitle, subtitle: newTaskSubtitle });
            setNewTaskTitle('');
            setNewTaskSubtitle('');
            setShowForm(false);
            refreshTasks();
        } catch (err) {
            console.error(err);
            alert('Failed to create task');
        }
    };

    const handleNextStatus = async (taskId: string, currentStatus: TaskType['status']) => {
        let nextStatus: TaskType['status'];
        if (currentStatus === 'todo') nextStatus = 'in-progress';
        else if (currentStatus === 'in-progress') nextStatus = 'done';
        else nextStatus = 'todo';

        try {
            await updateTaskStatus(taskId, nextStatus);
            refreshTasks();
        } catch (err) {
            console.error(err);
            alert('Failed to update task status');
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            await deleteTask(taskId);
            refreshTasks();
        } catch (err) {
            console.error(err);
            alert('Failed to delete task');
        }
    };

    const handleEditTask = async (taskId: string) => {
        const newTitle = prompt("Enter new title:");
        const newSubtitle = prompt("Enter new subtitle:");
        if (!newTitle) return;

        try {
            await updateTask(taskId, { title: newTitle, subtitle: newSubtitle ?? '' });
            refreshTasks();
        } catch (err) {
            console.error(err);
            alert('Failed to update task');
        }
    };

    return (
        <div className={`rounded-xl p-4 space-y-4 w-full border 
            ${theme === 'light'
            ? 'bg-[#FAFAFA] border-[#CCCCCC] text-black'
            : 'bg-[#2A2A2E] border-[#3A3A3D] text-white'}`}>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${color}`}></span>
                    <h3 className="font-semibold text-sm">
                        {title} <span className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>({count})</span>
                    </h3>
                </div>
                <button
                    className={`text-sm font-medium transition 
            ${theme === 'light' ? 'text-black hover:underline' : 'text-white hover:underline'}`}
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : '+ Add new task'}
                </button>
            </div>


            {/* Form */}
            {showForm && (
                <div className="space-y-2">
                    <input
                        className={`w-full p-2 rounded border 
                            ${theme === 'light'
                            ? 'bg-white border-[#CCCCCC] text-black'
                            : 'bg-[#3A3A3D] border-transparent text-white'}`}
                        placeholder="Task title..."
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    <input
                        className={`w-full p-2 rounded border 
                            ${theme === 'light'
                            ? 'bg-white border-[#CCCCCC] text-black'
                            : 'bg-[#3A3A3D] border-transparent text-white'}`}
                        placeholder="Task subtitle..."
                        value={newTaskSubtitle}
                        onChange={(e) => setNewTaskSubtitle(e.target.value)}
                    />
                    <button
                        className={`w-full p-2 rounded font-semibold 
                            ${theme === 'light'
                            ? 'bg-black text-white hover:bg-[#333333]'
                            : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        onClick={handleAddTask}
                    >
                        Add Task
                    </button>
                </div>
            )}

            {/* Task Cards */}
            <div className="space-y-3">
                {tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        title={task.title}
                        subtitle={task.subtitle || 'No subtitle'}
                        status={task.status}
                        progress={task.progress || { completed: 0, total: 10 }}
                        date={new Date(task.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                        onClickNext={() => handleNextStatus(task._id, task.status)}
                        onDelete={() => handleDeleteTask(task._id)}
                        onEdit={() => handleEditTask(task._id)}
                    />
                ))}
            </div>
        </div>
    );
}
