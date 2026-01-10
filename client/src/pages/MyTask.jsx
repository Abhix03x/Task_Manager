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
         <div className="min-h-screen p-6 bg-slate-900">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <section className="bg-white/70 backdrop-blur-xl border border-slate-300 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">My Tasks</h2>
                <div className="space-y-4">{personalTasks.length === 0 && <p className="text-slate-700">No personal tasks</p>}</div>
                {personalTasks.map((task) => (
                    <TaskCard key={task._id} task={task} refresh={fetchTasks} mode="personal"/>
                ))}
            </section>
            <section className="bg-white/70 backdrop-blur-xl border border-slate-300 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Assigned Tasks</h2>
                <div className="space-y-4">{assignedTasks.length === 0 && <p className="text-slate-700">No assigned Tasks</p>}</div>
                {assignedTasks.map((task) => (
                     <TaskCard key={task._id} task={task} refresh={fetchTasks} mode="assignedToMe"/>
                ))}
            </section>
            
           
        </div>
        </div>
       </>
    );
};

export default MyTask;