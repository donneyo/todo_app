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

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = (global as any).mongoose || { conn: null, promise: null };

if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
        dbName: 'todo_app',
    }).then(mongoose => {
        return mongoose;
    });
}

export async function dbConnect() {
    if (!cached.conn) {
        cached.conn = await cached.promise;
    }
    return cached.conn;
}
