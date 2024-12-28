import express from "express";
import { getAllTask, getSingleUserTask, newTask, updateTask } from "../controllers/task.js";

const app = express.Router();

// route - /api/v1/task/new
app.post("/new", newTask);

// route - /api/v1/task/all
// adminOnly is a middleware
app.get("/all", getAllTask);

// route - /api/v1/task/dynamicID
//make sure to give employee id
app.get("/:id", getSingleUserTask);

//make sure to give task id and empId
app.put("/:empId/:t_id", updateTask);


export default app;