// // src/types/task.ts
//
// export interface TaskType {
//     _id: string;
//     title: string;
//     subtitle: string;
//     status: 'todo' | 'in-progress' | 'done';
//     progress: {
//         completed: number;
//         total: number;
//     };
//     createdAt: string; // ISO date string
// }

export interface TaskType {
    _id: string;
    title: string;
    subtitle: string;
    status: 'todo' | 'in-progress' | 'done';
    progress: {
        completed: number;
        total: number;
    };
    createdAt: string;
}
