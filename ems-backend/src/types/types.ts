import { NextFunction, Request, Response } from "express";

// This is created for Error Handling
export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response<any, Record<string, any>>>;

  export interface NewTaskRequestBody {
    taskTitle: string;
    taskDesc: string;
    taskDate: Date;
    category: string;
    employeeId: number;
  }