import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Task } from '@/models/todo';

export async function GET() {
    await connectToDatabase();
    const tasks = await Task.find();
    return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
    await connectToDatabase();
    const body = await req.json();
    const task = new Task(body);
    await task.save();
    return NextResponse.json(task);
}
