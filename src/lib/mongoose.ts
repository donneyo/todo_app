import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDatabase() {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'todo_app',
        });
        isConnected = true;
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection failed:', err);
    }
}
