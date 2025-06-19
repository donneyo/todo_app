import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Task } from '@/models/todo';

export async function DELETE(req: NextRequest) {
    try {
        await connectToDatabase();

        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();  // Extract the ID from the URL path

        if (!id) {
            return NextResponse.json({ error: 'Missing task id' }, { status: 400 });
        }

        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Delete failed:', err);
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
}
