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
        <div>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>{task.status}</p>

            {/* {task.assignedTo ===userId && task.status !=="completed" && (<button onClick={markCompleted}>Mark Completed</button>)} */}
            {/* {(isCreator || isAssignee) && task.status === "pending" && (<button onClick={markCompleted}>Mark Completed</button>)}


            {isCreator && (<button onClick={deleteTask}>Delete</button>)}

            {canEdit && (<button onClick={() =>{
                setEditing(true)
            }}>Edit</button>)} */}

            {mode === "personal" && !editing && (
                <>
                    <button onClick={() => setEditing(true)}>Edit</button>
                    <button onClick={markCompleted}>Completed</button>
                    <button onClick={deleteTask}>Delete</button>
                </>
            )}

            {mode === "assignedToMe" && !editing && task.status =="pending" && (
                <button onClick={markCompleted}>Completed</button>
            )}

            {mode ==="assignedByMe" && !editing && (
                <>
                    <button onClick={() => setEditing(true)}>Edit</button>
                    <button onClick={deleteTask}>Delete</button>
                </>
            )}

            {editing && (
                <form onSubmit={async (e) =>{
                    e.preventDefault();
                    await axios.patch(`/tasks/${task._id}`,form);
                    setEditing(false);
                    refresh();
                }}>
                    <input value = {form.title}
                    onChange={(e) =>setForm({...form,title:e.target.value})} />

                    <textarea value = {form.description}
                    onChange={(e) => setForm({...form,description:e.target.value})}/>

                    <select
                    value={form.status}
                    onChange={(e) => setForm({...form,status:e.target.value})}>
                        <option value="pending">Pending </option>
                        <option value="completed">Completed</option>
                    </select>
                    <button type="submit">save</button>
                    <button type="button" onClick={() => setEditing(false)}>
                        Cancel
                    </button>
                </form>
            )}


        </div>
    );
};

export default TaskCard;