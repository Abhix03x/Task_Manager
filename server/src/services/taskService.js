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
        assignedTo,
    });
    return task;
};