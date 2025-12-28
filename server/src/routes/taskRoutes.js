import express from "express";

import { createTask, deleteTask, getAssignedTask, getTask, markCompleted, updateTask } from "../controllers/taskController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",auth,createTask);
router.get("/",auth,getTask);
router.patch("/:id",auth,updateTask);
router.patch("/:id/complete",auth,markCompleted);
router.delete("/:id",auth,deleteTask);
router.get("/assigned-by-me",auth,getAssignedTask);

export default router;