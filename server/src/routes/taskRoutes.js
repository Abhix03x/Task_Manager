import express from "express";

import { createTask, getTask } from "../controllers/taskController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",auth,createTask);
router.get("/",auth,getTask);

export default router;