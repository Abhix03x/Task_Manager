import { useEffect,useState } from "react";
import axios from "../api/axios.jsx";
import TaskCard from "../components/TaskCard.jsx";
import Navbar from "../components/NavBar.jsx";

const MyTask = () => {
    const [personalTasks, setpersonalTasks] = useState([]);
    const [assignedTasks, setAssignedTasks] = useState([]);

    const fetchTasks = async () =>{
        try{
             const res = await axios.get("/tasks");
             console.log("all tasks",res.data);
            
             const user = JSON.parse(localStorage.getItem("user"));
             const myId = user?.id;
             if(!myId){
                console.log("user not in local storage");
                return;
             }
             console.log("user id",myId);

             const personal = res.data.filter(
                (task) => task.createdBy?._id === myId && task.assignedTo == null
             );
             console.log("my tasks",personal);

             const assigned = res.data.filter(
                (task) => task.assignedTo?._id === myId
             );
             console.log("Assigned tasks",assigned);

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
       <>
        <Navbar/>
         <div>
            <h2>My Tasks</h2>
            <section>
                <h3>My Tasks</h3>
                {personalTasks.length === 0 && <p>No personal tasks</p>}
                {personalTasks.map((task) => (
                    <TaskCard key={task._id} task={task} refresh={fetchTasks} mode="personal"/>
                ))}
            </section>
            <section>
                <h3>Assigned Tasks</h3>
                {assignedTasks.length === 0 && <p>No assigned Tasks</p>}
                {assignedTasks.map((task) => (
                     <TaskCard key={task._id} task={task} refresh={fetchTasks} mode="assignedToMe"/>
                ))}
            </section>
            
           
        </div>
       </>
    );
};

export default MyTask;