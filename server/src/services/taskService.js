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

//Edit Task

export const updateTaskService = async (taskId,userId,data) =>{
    const task = await Task.findById(taskId);
    if(!task){
        throw new Error("task not found");

    }
    const isCreator = task.createdBy.toString() ===userId.toString();
    if(!isCreator) throw new Error("Not authorized");

    if (data.title) task.title = data.title;
  if (data.description) task.description = data.description;
  if (data.status) task.status = data.status;

    await task.save();
    return task;
}

//Mark completed

export const markCompletedService = async (taskId,userId) =>{
    const task = await Task.findById(taskId);
    if(!task){
        throw new Error("task not found");
    }

    const isCreator = task.createdBy.toString() === userId.toString();
    const isAssignee = task.assignedTo && task.assignedTo.toString() === userId.toString();

    if (!isCreator && !isAssignee)
        throw new Error("not Authorized");

    task.status = "completed";
    await task.save();
    return task;

};

//Delete Tasks

export const deleteTaskService = async (taskId,userId) =>{
    const task = await Task.findById(taskId);
     if(!task){
        throw new Error("task not found");
    }

    const isCreator = task.createdBy.toString() === userId;
    if(!isCreator)
        throw new Error("only creator can delete");
    await task.deleteOne();
};

// assigned tasks

export const assignedTask = async (userId) => {
    return await Task.find({createdBy : userId,
        assignedTo : {$ne : null},
    })
    .populate("assignedTo","name email")
    .sort({createdAt:-1});
};