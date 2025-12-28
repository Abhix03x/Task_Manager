import { useState } from "react";
import axios from "../api/axios.jsx";
import TaskCard from "../components/TaskCard.jsx";
import { useEffect } from "react";
import Navbar from "../components/NavBar.jsx";

const AssignedTasks = () =>{
    const [tasks,setTasks] = useState([]);

    const fetchTasks = async () => {
        try{
            const res = await axios.get("/tasks/assigned-by-me");
            setTasks(res.data);
        }catch(err){
            console.error("failed to load tasks");
        }
    };

    useEffect(() =>{
        fetchTasks();
    },[]);

    return(
       <>
       <Navbar/>
        <div>
            <h2>Assigned Tasks</h2>

            {tasks.length === 0 && <p>No assigned Tasks</p>}

            {tasks.map((task) =>(
                <TaskCard key={task._id}
                task={task}
                refresh={fetchTasks}
                mode="assignedByMe"/>
            ))}
        </div>
       </>
    );
};

export default AssignedTasks;