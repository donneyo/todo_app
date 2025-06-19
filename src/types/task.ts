// export interface TaskType {
//     _id: string;
//     title: string;
//     subtitle?: string;
//     status: 'todo' | 'in-progress' | 'done';
//     progress: {
//         completed: number;
//         total: number;
//     };
//     createdAt: string;
// }


export interface TaskType {
    _id: string;
    title: string;
    subtitle?: string;
    status: 'todo' | 'in-progress' | 'done';
    progress?: {
        completed: number;
        total: number;
    };
    createdAt: string;
}
