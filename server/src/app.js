import express from 'express';
import cors from 'cors';
import authRourtes from './routes/authRoutes.js';
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRourtes);
app.use("/tasks",taskRoutes);
app.use("/users",userRoutes);

app.get("/", (req, res) => {
    res.send("Api Running...")
});

export default app;
