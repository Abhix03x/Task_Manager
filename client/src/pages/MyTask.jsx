import { useEffect,useState } from "react";
import axios from "../api/axios.jsx";
import TaskCard from "../components/TaskCard.jsx";

const MyTask = () => {
    const [personalTasks, setpersonalTasks] = useState([]);
    const [assignedTasks, setAssignedTasks] = useState([]);

    const fetchTasks = async () =>{
        try{
             const res = await axios.get("/tasks");
             console.log("all tasks",res.data);
            
             const myId = JSON.parse(localStorage.getItem("user"))?._id;
             console.log("user id",myId);

             const personal = res.data.filter(
                (task) => task.createdBy?._id === myId && !task.assignedTo
             );
             console.log("my tasks",personal.data);

             const assigned = res.data.filter(
                (task) => task.assignedTo?._id === myId
             );
             console.log("Assigned tasks",assigned.data);

             setpersonalTasks(personal);
             setAssignedTasks(assigned);
        }catch(err){
            console.error("failed to load tasks");
        }
       
    };
    useEffect(() => {
        fetchTasks();
    }, []);

    return(
        <div>
            <h2>My Tasks</h2>
            <section>
                <h3>My Tasks</h3>
                {personalTasks.length === 0 && <p>No personal tasks</p>}
                {personalTasks.map((task) => (
                    <TaskCard key={task._id} task={task} refresh={fetchTasks}/>
                ))}
            </section>
            <section>
                <h3>Assigned Tasks</h3>
                {assignedTasks.length === 0 && <p>No assigned Tasks</p>}
                {assignedTasks.map((task) => (
                     <TaskCard key={task._id} task={task} refresh={fetchTasks}/>
                ))}
            </section>
            
           
        </div>
    );
};

export default MyTask;