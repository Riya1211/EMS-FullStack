import { Request, Response, NextFunction } from "express";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";

export const loginUser = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  const user = await User.findOne({ email, password });

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  return res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
      empId: user.empId,
      taskCounts: user.taskCounts
    },
  });
});
