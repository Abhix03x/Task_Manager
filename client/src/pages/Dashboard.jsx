import {Link} from "react-router-dom";
const Dashboard = () => {

    return (
        <div style={{padding:"30px"}}>
            <h2>Dashboard</h2>
            <ul>
                <li>
                    <Link to="/CreateTask">Create Task</Link>
                </li>
                <li>
                    <Link to="/tasks">My Tasks</Link>
                </li>
            </ul>
        </div>
    );
};

export default Dashboard;