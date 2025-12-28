import {Link} from "react-router-dom";
import Navbar from "../components/NavBar";
const Dashboard = () => {

    return (
        <>
        <Navbar/>
         <div style={{padding:"30px"}}>
            <h2>Dashboard</h2>
            <ul>
                <li>
                    <Link to="/CreateTask">Create Task</Link>
                </li>
                <li>
                    <Link to="/tasks">My Tasks</Link>
                </li>
                <li>
                    <Link to="/assigned-tasks">Assigned</Link>
                </li>
            </ul>
        </div>
        </>
       
    );
};

export default Dashboard;