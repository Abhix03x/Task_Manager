import { useNavigate } from "react-router-dom"

const Navbar = () =>{
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout  = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav>
            <h3>Task Manager</h3>
            <div>
                {user && <span>{user.name}</span>}
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;