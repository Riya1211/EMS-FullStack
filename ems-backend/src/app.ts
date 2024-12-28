import express from 'express';
import { config } from "dotenv";
import morgan from 'morgan';
import cors from 'cors';
import { errorMiddleware } from './middlewares/error.js';
import { connectDB } from './utils/features.js';

// Importing Routes
import userRoutes from './routes/user.js'
import taskRoutes from './routes/task.js'
import loginRoutes from './routes/logIn.js'
import { MongoClient } from 'mongodb';

// Setting Up the ENVIORMENT for Variables
config({
    path:"./.env",
});

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";

// Connecting DataBase
connectDB(mongoURI);

//to update some info that was entered manually 
// async function updateUser() {
//     const uri = mongoURI;
//     const client = new MongoClient(uri);

//     try {
//         await client.connect();
//         const database = client.db("cluster0");
//         const users = database.collection("users");

//         const result = await users.updateOne(
//             { _id: "6762c6d78d096b48beb1fdd5" },
//             {
//                 $set: {
//                     createdAt: new Date(),
//                     updatedAt: new Date(),
//                 },
//             }
//         );

//         console.log(`Matched ${result.matchedCount} document(s)`);
//         console.log(`Modified ${result.modifiedCount} document(s)`);
//     } finally {
//         await client.close();
//     }
// }

// updateUser().catch(console.error);

const app = express();

// using middleware for using json
app.use(express.json());

// Whatever API we have called it will tell the info in the terminal
app.use(morgan("dev"));

// CORS
app.use(cors());

// for get 
app.get("/", (req, res) =>{
    res.send("API is working with /api/v1");
})

// using routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/login", loginRoutes);

app.use(errorMiddleware);

app.listen(port, ()=>{
    console.log(`Express is working on http://localhost:${port}`)
})