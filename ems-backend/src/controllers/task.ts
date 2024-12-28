import { NextFunction, Request, Response } from "express";
import { NewTaskRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import { Task } from "../models/task.js";
import { User } from "../models/user.js";

// Creating New Task
export const newTask = TryCatch(
    async (
      req: Request<{}, {}, NewTaskRequestBody>, //for custom use this is created in types folder
      res: Response,
      next: NextFunction
    ) => {
      const { taskTitle, taskDesc, taskDate, category, employeeId } = req.body;

      if (!taskTitle || !taskDesc || !taskDate || !category || !employeeId) {
        return next(new ErrorHandler("Please add all fields", 400));
      }
  
      const user = await User.findOne({ empId: employeeId });

      // Creating new Task
      let task = await Task.create({
        taskTitle,
        taskDesc,
        category,
        employeeId,
        taskDate: new Date(taskDate),
      });
  
       // Increment the newTask count in the User table
       user.taskCounts.newTask = (user.taskCounts.newTask || 0) + 1;
       await user?.save();

      return res.status(201).json({
        success: true,
        message: `Task ${task.taskTitle} is created`,
      });
    }
);

// Getting All Users
export const getAllTask = TryCatch(async (req, res, next) => {
    const task = await Task.find({});
  
    return res.status(200).json({
      success: true,
      task,
    });
});


// Getting Single User
export const getSingleUserTask = TryCatch(async (req, res, next) => {

  const {id} = req.params;
  // Find tasks by employeeId
  const tasks = await Task.find({ employeeId: id });

  if (!tasks || tasks.length === 0) {
    return next(new ErrorHandler("No Tasks Found for this Employee", 404));
  }

  return res.status(200).json({
    success: true,
    tasks,
  });
});

export const updateTask = TryCatch(async (req, res, next) => {
  const { empId, t_id  } = req.params;
  const { active, newTask, completedTask, failedTask } = req.body; // Extract the parameters to update

  // Validate the presence of required parameters
  if (active === undefined && newTask === undefined && completedTask === undefined && failedTask === undefined) {
    return next(new ErrorHandler("No parameters provided to update", 400));
  }

   // Determine which counts to update
   const updates: Record<any, any> = {};
   if (active === true) {
     updates["taskCounts.active"] = 1; // Increment active tasks
     updates["taskCounts.newTask"] = -1; // Decrement new tasks
   } else if (completedTask === true) {
     updates["taskCounts.completed"] = 1; // Increment completed tasks
     updates["taskCounts.active"] = -1; // Decrement active tasks
   } else if (failedTask === true) {
     updates["taskCounts.failed"] = 1; // Increment failed tasks
     updates["taskCounts.active"] = -1; // Decrement active tasks
   }
 
   // Update the task status
   const updatedTask = await Task.findByIdAndUpdate(
     t_id,
     { $set: { active, newTask, completedTask, failedTask } },
     { new: true, runValidators: true } // Return the updated document and apply schema validation
   );
 
   if (!updatedTask) {
     return next(new ErrorHandler("Failed to update task", 500));
   }

  //  console.log("Updates object:", updates);
 
   // Update the employee's task counts
   const updatedEmployee = await User.findOneAndUpdate(
    { empId: empId }, // Match using the custom empId field
    { $inc: updates }, // Increment/decrement task counts
    { new: true } // Return the updated document
  );
 
   if (!updatedEmployee) {
     return next(new ErrorHandler("Failed to update employee task counts", 500));
   }

  //  console.log("employee:", updatedEmployee);
 
   // Return success response
   return res.status(200).json({
     success: true,
    //  task: updatedTask,
    //  employee: updatedEmployee,
   });
});