import { useState } from "react";
import axios from "../api/axios.jsx"

const TaskCard = ({task,refresh,mode}) =>{

    const user = JSON.parse(localStorage.getItem("user"));
    const isCreator = task.createdBy?._id === user.id;
    const isAssignee = task.assignedTo?._id === user.id;
    const canEdit = task.createdBy?._id === user.id;

    const[editing,setEditing]=useState(false);
    const[form,setForm] = useState({
        title : task.title,
        description: task.description,
        status :task.status,
    });
    console.log("CREATED BY:", task.createdBy);

    const markCompleted = async() => {
        await axios.patch(`/tasks/${task._id}/complete`);
        refresh();
    }
    const deleteTask= async () => {
        await axios.delete(`/tasks/${task._id}`);
        refresh();
    };
    return(
        <div className="bg-white/10 backdrop-blur-xl
        border border-white/20 rounded-2xl p-6 
        shadow-lg hover:shadow-2xl transition-all mb-4">
            <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-semibold text-slate-900">{task.title}</h4>
            <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                task.status === "completed"?
                "bg-green-500/20 text-green-400":
                "bg-yellow-500/20 text-yellow-400"
            }`}>{task.status}</span>
            </div>
            
            <p className="text-slate-900 text-sm mb-4"> {task.description}</p>
            

            {/* {task.assignedTo ===userId && task.status !=="completed" && (<button onClick={markCompleted}>Mark Completed</button>)} */}
            {/* {(isCreator || isAssignee) && task.status === "pending" && (<button onClick={markCompleted}>Mark Completed</button>)}


            {isCreator && (<button onClick={deleteTask}>Delete</button>)}

            {canEdit && (<button onClick={() =>{
                setEditing(true)
            }}>Edit</button>)} */}
            <div className="flex flex-wrap gap-3">
            {mode === "personal" && !editing && (
                <>
                    <button onClick={() => setEditing(true)} 
                        className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">Edit</button>
                    <button onClick={markCompleted}
                    className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30">Completed</button>
                    <button onClick={deleteTask} 
                    className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 ">Delete</button>
                </>
            )}

            {mode === "assignedToMe" && !editing && task.status =="pending" && (
                <button onClick={markCompleted}
                className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30">Completed</button>
            )}

            {mode ==="assignedByMe" && !editing && (
                <>
                    <button onClick={() => setEditing(true)}
                         className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">Edit</button>
                    <button onClick={deleteTask}
                    className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 ">Delete</button>
                </>
            )}
            </div>

            {editing && (
                <form onSubmit={async (e) =>{
                    e.preventDefault();
                    await axios.patch(`/tasks/${task._id}`,form);
                    setEditing(false);
                    refresh();
                }}
                className="space-y-4">
                    <input value = {form.title}
                    onChange={(e) =>setForm({...form,title:e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-slate-900 border border-slate-400" />

                    <textarea value = {form.description}
                    onChange={(e) => setForm({...form,description:e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-slate-900 border border-slate-400 resize-none"/>

                    <select
                    value={form.status}
                    onChange={(e) => setForm({...form,status:e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-slate-900 border border-slate-400">
                        <option value="pending">Pending </option>
                        <option value="completed">Completed</option>
                    </select>
                    <div className="flex gap-3 justify-end">
                        <button type="submit" 
                        className="px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600">save</button>
                    <button type="button" onClick={() => setEditing(false)}
                        className="px-4 py-3 rounded-lg bg-slate-500/20 text-slate-500 hover:bg-slate-500/30">
                        Cancel
                    </button>
                    </div>
                </form>
            )}


        </div>
    );
};

export default TaskCard;