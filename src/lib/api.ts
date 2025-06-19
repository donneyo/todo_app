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

// import { connectToDatabase  } from '@/lib/mongoose';
// import { Task } from '@/models/todo';
//
// export async function getAllTasks() {
//     await connectToDatabase();
//     return await Task.find().sort({ createdAt: -1 });
// }
//
// export async function createTask(data: {
//     title: string;
//     subtitle?: string;
// }) {
//     await connectToDatabase();
//     const task = new Task({
//         title: data.title,
//         subtitle: data.subtitle || '',
//     });
//     return await task.save();
// }
//
// export async function updateTask(taskId: string, updates: {
//     title?: string;
//     subtitle?: string;
// }) {
//     await connectToDatabase();
//     return await Task.findByIdAndUpdate(taskId, updates, { new: true });
// }
//
// export async function updateTaskStatus(taskId: string, status: 'todo' | 'in-progress' | 'done') {
//     await connectToDatabase();
//     return await Task.findByIdAndUpdate(taskId, { status }, { new: true });
// }
//
// export async function deleteTask(taskId: string) {
//     await connectToDatabase();
//     return await Task.findByIdAndDelete(taskId);
// }
//
// import { connectToDatabase } from '@/lib/mongoose';
// import { Task } from '@/models/todo';
//
// export async function getAllTasks() {
//     await connectToDatabase();
//     return await Task.find().sort({ createdAt: -1 });
// }
//
// export async function createTask(data: any) {
//     await connectToDatabase();
//     const task = new Task(data);
//     await task.save();
//     return task;
// }
//
// export async function deleteTask(id: string) {
//     await connectToDatabase();
//     await Task.findByIdAndDelete(id);
// }

import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Task } from '@/models/todo';

export async function GET() {
    await connectToDatabase();
    const tasks = await Task.find();
    return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const task = new Task(body);
        await task.save();
        return NextResponse.json(task);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}
