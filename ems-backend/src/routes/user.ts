import express from "express";
import { getAllUsers, getUser } from "../controllers/user.js";

const app = express.Router();


// route - /api/v1/user/all
// adminOnly is a middleware
app.get("/all", getAllUsers);

// route - /api/v1/user/dynamicID
app.get("/:id", getUser);


export default app;
