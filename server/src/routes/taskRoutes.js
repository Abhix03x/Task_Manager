import express from "express";

import { createTask } from "../controllers/taskController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",auth,createTask);

export default router;