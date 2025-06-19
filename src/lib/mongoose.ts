// // /lib/mongoose.ts
// import mongoose from 'mongoose';
//
// const MONGODB_URI = process.env.MONGODB_URI as string;
//
// if (!MONGODB_URI) {
//     throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }
//
// let cached = (global as any).mongoose || { conn: null, promise: null };
//
// export async function connectToDatabase() {
//     if (cached.conn) {
//         return cached.conn;
//     }
//
//     if (!cached.promise) {
//         cached.promise = mongoose.connect(MONGODB_URI, {
//             bufferCommands: false,
//         }).then((mongoose) => {
//             return mongoose;
//         });
//     }
//     cached.conn = await cached.promise;
//     return cached.conn;
// }
import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDatabase() {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'todo_app', // <-- replace with your DB name
        });
        isConnected = true;
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection failed:', err);
    }
}
