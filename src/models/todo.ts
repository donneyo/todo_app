// // import mongoose, { Schema, Document } from 'mongoose';
// //
// // export interface ITask extends Document {
// //     title: string;
// //     subtitle?: string;
// //     status: 'todo' | 'in-progress' | 'done';
// //     progress: {
// //         completed: number;
// //         total: number;
// //     };
// //     createdAt: Date;
// //     updatedAt: Date;
// // }
// //
// // const TaskSchema = new Schema<ITask>(
// //     {
// //         title: { type: String, required: true },
// //         subtitle: { type: String },
// //         status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
// //         progress: {
// //             completed: { type: Number, default: 0 },
// //             total: { type: Number, default: 10 },
// //         }
// //     },
// //     { timestamps: true }
// // );
// //
// // export const Task = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
//
//
// import mongoose, { Schema, models, model } from 'mongoose';
//
// const taskSchema = new Schema({
//     title: { type: String, required: true },
//     subtitle: { type: String },
//     status: {
//         type: String,
//         enum: ['todo', 'in-progress', 'done'],
//         default: 'todo',
//     },
//     progress: {
//         completed: { type: Number, default: 0 },
//         total: { type: Number, default: 10 },
//     },
// }, { timestamps: true });
//
// export const Task = models.Task || model('Task', taskSchema);

import mongoose, { Schema, models, model } from 'mongoose';

const taskSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
    progress: {
        completed: { type: Number, default: 0 },
        total: { type: Number, default: 3 }
    },
    date: { type: Date, default: Date.now }
});

export const Task = models.Task || model('Task', taskSchema);
