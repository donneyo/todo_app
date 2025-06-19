import type { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Task } from '@/models/todo';

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
    const { id } = context.params;
    const body = await request.json();
    await connectToDatabase();
    const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });
    return Response.json(updatedTask);
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    const { id } = context.params;
    await connectToDatabase();
    await Task.findByIdAndDelete(id);
    return Response.json({ message: 'Deleted' });
}
