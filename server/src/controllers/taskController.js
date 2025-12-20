import { createTaskService, getTaskService } from "../services/taskService.js";

export const createTask = async (req,res) =>{
    try{
        console.log(req.body);
        console.log(req.user);
        const {title ,description,assignedTo} = req.body;

        const task = await createTaskService({title,description,assignedTo,createdBy:req.user.id,});
        res.status(201).json(task);
    }catch(err){
        res.status(400).json({message:err.message});
    }
};

export const  getTask = async (req,res) => {
    try{
        const tasks =await getTaskService(req.user._id);
        res.json(tasks);
    }catch(err){

    }
}