import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Task } from '@/models/todo';

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const { id } = context.params;
        await Task.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const { id } = context.params;
        const data = await req.json();

        const updatedTask = await Task.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json(updatedTask);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }
}
