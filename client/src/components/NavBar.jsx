import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Profile from "./Profile.jsx";

const Navbar = () =>{
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [openProfile,setOpenProfile] = useState(false);

    

    return (
        <nav className="sticky top-0 z-50 bg-slate-950  text-white px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold">Task Manager</h3>
            <div className="flex items-center gap-4">
                <button onClick={() => setOpenProfile(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-semibold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                </button>
                {openProfile && (
                    <Profile user={user} onClose={() => setOpenProfile(false)}/>
                )}
            </div>
        </nav>
    );
};

export default Navbar;