// import { TaskType } from "@/types/task";
//
// // Fetch all tasks
// export async function fetchTasks(): Promise<TaskType[]> {
//     const res = await fetch('/api/tasks', { cache: 'no-store' });
//     if (!res.ok) throw new Error('Failed to fetch tasks');
//     return res.json();
// }
//
// // Create new task
// export async function createTask(data: { title: string; subtitle?: string }) {
//     const res = await fetch('/api/tasks', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//     });
//     if (!res.ok) throw new Error('Failed to create task');
//     return res.json();
// }
//
// // Update task status
// export async function updateTaskStatus(taskId: string, status: 'todo' | 'in-progress' | 'done') {
//     const res = await fetch(`/api/tasks/${taskId}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status }),
//     });
//     if (!res.ok) throw new Error('Failed to update task status');
//     return res.json();
// }
//
// // Update full task (title, subtitle, etc.)
// export async function updateTask(taskId: string, updates: Partial<TaskType>) {
//     const res = await fetch(`/api/tasks/${taskId}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updates),
//     });
//     if (!res.ok) throw new Error('Failed to update task');
//     return res.json();
// }
//
// // Delete task
// export async function deleteTask(taskId: string) {
//     const res = await fetch(`/api/tasks/${taskId}`, {
//         method: 'DELETE',
//     });
//     if (!res.ok) throw new Error('Failed to delete task');
//     return res.json();
// }

import { dbConnect } from '@/lib/mongose';
import { Task } from '@/models/todo';

export async function getAllTasks() {
    await dbConnect();
    return await Task.find().sort({ createdAt: -1 });
}

export async function createTask(data: {
    title: string;
    subtitle?: string;
}) {
    await dbConnect();
    const task = new Task({
        title: data.title,
        subtitle: data.subtitle || '',
    });
    return await task.save();
}

export async function updateTask(taskId: string, updates: {
    title?: string;
    subtitle?: string;
}) {
    await dbConnect();
    return await Task.findByIdAndUpdate(taskId, updates, { new: true });
}

export async function updateTaskStatus(taskId: string, status: 'todo' | 'in-progress' | 'done') {
    await dbConnect();
    return await Task.findByIdAndUpdate(taskId, { status }, { new: true });
}

export async function deleteTask(taskId: string) {
    await dbConnect();
    return await Task.findByIdAndDelete(taskId);
}
