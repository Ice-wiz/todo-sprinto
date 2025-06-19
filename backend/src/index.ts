import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth';
import taskRoutes from './routes/task'
import {authMiddleware} from './middleware/auth'

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/tasks", authMiddleware , taskRoutes);

app.get('/',(req,res)=>{
    res.send("hello")
})

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
    catch (err) {
        console.error(err);
    }
}

startServer();