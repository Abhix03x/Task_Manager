import { assignedTask, createTaskService, deleteTaskService, getTaskService, markCompletedService, updateTaskService } from "../services/taskService.js";

export const createTask = async (req,res) =>{
    try{
        console.log(req.body);
        console.log(req.user);
        const {title ,description,assignedTo} = req.body;

        const task = await createTaskService({title,description,createdBy:req.user.id,assignedTo,});
        res.status(201).json(task);
    }catch(err){
        res.status(400).json({message:err.message});
    }
};

export const  getTask = async (req,res) => {
    try{
        const tasks =await getTaskService(req.user.id);
        res.json(tasks);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

export const updateTask = async (req,res) =>{
    try{
        const updateTask = await updateTaskService(
            req.params.id,req.user.id,req.body,
        );
        res.json(updateTask);
    }catch(err){
        res.status(403).json({message:err.message});
    }
}

export const markCompleted = async (req,res) =>{
    try{
        const task = await markCompletedService(
            req.params.id,req.user.id
        );
        res.json(task);
    }catch(err){
        res.status(403).json({message:err.message});
    }
};

export const deleteTask = async (req,res) =>{
    try{
        await deleteTaskService(req.params.id,req.user.id);
        res.json({message:"task Deleted"});
    }catch(err){
        res.status(403).json({message:err.message});
    }
};

export const getAssignedTask = async(req,res) => {
    try{
        const tasks = await assignedTask(req.user.id);
        res.json(tasks);
    }catch(err){
        res.status(400).json({message:err.message});
    }
};