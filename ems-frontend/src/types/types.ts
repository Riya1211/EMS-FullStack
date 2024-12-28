export interface User {
    id: string,
    name: string,
    role: string,
    empId: number,
    taskCounts: {
        active:number,
        newTask:number,
        completed:number,
        failed:number,
    }
}