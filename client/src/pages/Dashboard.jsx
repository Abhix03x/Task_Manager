import {Link} from "react-router-dom";
import Navbar from "../components/NavBar";
const Dashboard = () => {

    return (
        <>
        <Navbar/>
         <div className="min-h-screen flex justify-center items-center bg-slate-900">
            {/* <h2 className=" block text-2xl font-semibold text-white ">Dashboard</h2> */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <li>
                    <Link to="/CreateTask"  className="
                block
                bg-white/80 backdrop-blur-md
                border border-slate-200
                rounded-xl
                p-6
                shadow-md
                hover:shadow-lg ">Create Task</Link>
                </li>
                <li>
                    <Link to="/tasks" 
                    className="block bg-white/80 backdrop-blur-md
                    border border-slate-200 rounded-xl p-6 shadow-md
                    hover:shadow-lg ">My Tasks</Link>
                </li>
                <li>
                    <Link to="/assigned-tasks" className="
                block
                bg-white/80 backdrop-blur-md
                border border-slate-200
                rounded-xl
                p-6
                shadow-md
                hover:shadow-lg ">Assigned</Link>
                </li>
            </ul>
        </div>
        </>
       
    );
};

export default Dashboard;