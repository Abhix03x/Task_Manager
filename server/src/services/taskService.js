import Task from "../models/Tasks.js";

export const createTaskService = async({
    title,
    description,
    createdBy,
    assignedTo
}) => {
    const task = await Task.create({
        title,
        description,
        createdBy,
        assignedTo: assignedTo || null,
        
    });
    return task;
};

//get Task

export const getTaskService = async (userId) =>{
    return await Task.find({$or:[{createdBy:userId},{assignedTo:userId}],
    })
    .populate("assignedTo","name email")
    .populate("createdBy","name email");
};