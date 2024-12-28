import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: "admin" | "employee";
    empId: Number;
    taskCounts:{
        active:{
            type: Number,
            default: 0,
        },
        newTask:{
            type: Number,
            default: 0,
        },
        completed:{
            type: Number,
            default: 0,
        },
        failed:{
            type: Number,
            default: 0,
        }
    },
    createdAt: Date;
    updatedAt: Date;
}

// For mongoose type is need to be in capital
const schema = new mongoose.Schema(
    {
        _id:{
            type: String,
            required: [true, "Please enter ID"],
        },
        name:{
            type: String,
            required: [true, "Please enter Name"],
        },
        email:{
            type: String,
            unique: [true, "Email already Exist"],
            required: [true, "Please enter email"],
            validate: validator.default.isEmail,
        },
        password:{
            type: String,
            default: "123"
        },
        role:{
            type: String,
            enum: ["admin", "employee"],
            default: "employee",
        },
        empId:{
            type: Number,
            required: [true, "Please enter your employee Id"],
        },
        taskCounts: {
            active: {
              type: Number,
              default: 0,
            },
            newTask: {
              type: Number,
              default: 0,
            },
            completed: {
              type: Number,
              default: 0,
            },
            failed: {
              type: Number,
              default: 0,
            },
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model<IUser>("User", schema);