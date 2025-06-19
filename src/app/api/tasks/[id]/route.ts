import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongose';
import { Task } from '@/models/todo';

interface Params {
    params: { id: string }
}

export async function PATCH(req: NextRequest, { params }: Params) {
    const { id } = params;
    try {
        await connectToDatabase();
        const updates = await req.json();

        const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedTask) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json(updatedTask);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: Params) {
    const { id } = params;
    try {
        await connectToDatabase();

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Task deleted' });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
}
