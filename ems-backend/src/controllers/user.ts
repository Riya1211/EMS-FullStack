// import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";

// Getting All Users
export const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find({ role: "employee" }).select("_id name empId taskCounts");
  
    return res.status(200).json({
      success: true,
      users,
    });
});
  
  // Getting Single User
export const getUser = TryCatch(async (req, res, next) => {

  const {id} = req.params;
  const data = await User.findById(id).select("taskCounts");

  if(!data){
    return next(new ErrorHandler("Invalid ID", 400));
  }
  return res.status(200).json({
    success: true,
    data,
  });
});
  