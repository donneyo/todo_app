import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Task } from '@/models/todo';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();

        const task = await Task.findByIdAndDelete(params.id);
        if (!task) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Delete failed:', err);
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
}
