import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongose';
import { Task } from '@/models/todo';

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const tasks = await Task.find().sort({ createdAt: -1 });
        return NextResponse.json(tasks);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const { title, subtitle } = await req.json();

        const newTask = new Task({ title, subtitle });
        await newTask.save();

        return NextResponse.json(newTask, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}
