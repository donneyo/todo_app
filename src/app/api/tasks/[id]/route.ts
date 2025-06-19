import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Task } from '@/models/todo';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const { id } = params;
        const { title, subtitle, status } = await req.json();

        const updatedTask = await Task.findByIdAndUpdate(id, { title, subtitle, status }, { new: true });
        return NextResponse.json(updatedTask);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const { id } = params;

        await Task.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
}
