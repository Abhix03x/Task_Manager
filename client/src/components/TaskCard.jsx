import axios from "../api/axios.jsx"

const TaskCard = ({task,refresh}) =>{

    const userId = JSON.parse(localStorage.getItem("user"))?.id;

    const markCompleted = async() => {
        await axios.put(`/tasks/$task._id`,{status:"completed"});
        refresh();
    }
    return(
        <div>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>{task.status}</p>

            {task.assignedTo ===userId && task.status !=="completed" && (<button onClick={markCompleted}>Mark Completed</button>)}
        </div>
    );
};

export default TaskCard;