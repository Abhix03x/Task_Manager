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
        <nav className="sticky top-0 z-50 bg-slate-950  text-white px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold">Task Manager</h3>
            <div>
                {user && <span className="px-5">User - {user.name}</span>}
                <button onClick={handleLogout} className="bg-red-700 px-3 py-1 rounded-lg">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;