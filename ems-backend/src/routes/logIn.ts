import express from "express";
import { loginUser } from "../controllers/login.js";

const app = express.Router();


// route - /api/v1/login
// adminOnly is a middleware
app.post("/", loginUser);



export default app;