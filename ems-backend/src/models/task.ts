import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; 

// Define the Task interface to match the schema structure
interface ITask extends Document {
    _id: string;
    active: boolean;
    newTask: boolean;
    completedTask: boolean;
    failedTask: boolean;
    taskTitle: string;
    taskDesc: string;
    taskDate: Date;
    category: string;
    employeeId: number;  // Assuming employeeId is a number (e.g., user ID)
  }
  
  // Define the Task schema
  const schema = new mongoose.Schema(
    {
      _id:{
        type: String,
        required: true, 
        default: () => uuidv4(),
      },
      active: {
        type: Boolean,
        required: true,
        default: false,  // Assuming new tasks are not active initially
      },
      newTask: {
        type: Boolean,
        required: true,
        default: true,  // Assuming a task is new when created
      },
      completedTask: {
        type: Boolean,
        required: true,
        default: false,  // Default to not completed
      },
      failedTask: {
        type: Boolean,
        required: true,
        default: false,  // Default to not failed
      },
      taskTitle: {
        type: String,
        required: true,  // Ensure title is required
      },
      taskDesc: {
        type: String,
        required: true,  // Ensure description is required
      },
      taskDate: {
        type: Date,
        required: true,  // Ensure task date is required
      },
      category: {
        type: String,
        required: true,  // Ensure category is required
      },
      employeeId: {
        type: Number,
        required: true,  // Assuming employeeId is a unique number (can link to an employee)
      },
    },
    { timestamps: true }  // Automatically add createdAt and updatedAt
  );

export const Task = mongoose.model<ITask>("Task", schema);