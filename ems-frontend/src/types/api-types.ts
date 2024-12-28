export interface LoginRequest {
    email:string;
    password: string;
}
export interface LoginReseponse {
    id: string;
    name: string;
    role: "admin" | "employee";
}
//Task
// geting all data of users
export interface AdminAllUserTaskResponse {    
    _id: string,
    empId: number,
    name: string,
    taskCounts: [
        active: number,
        newTask: number,
        completed: number,
        failed: number,
    ]
}
export interface AdminCreateTaskRequest {
    taskTitle: string;
    taskDesc : string;
    taskDate : string;
    category : string;
    employeeId : string;
}
export interface AdminCreateTaskResponse {
    success: string;
    message: string;
}

export interface EmployeeAllTasksResponse {    
    _id: string,
    active: boolean,
    failedTask: boolean,
    completedTAsk: boolean,
    newTask: boolean,
    taskTitle: string;
    taskDesc : string;
    taskDate : string;
    category : string;
    createdAt: string;
    updatedAt: string;
}