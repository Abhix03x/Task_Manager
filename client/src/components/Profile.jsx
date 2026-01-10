const Profile = ({user,onClose}) =>{
    const handleLogout  = () => {
        // localStorage.removeItem("token");
        // localStorage.removeItem("user");
        // navigate("/login");
        localStorage.clear();
        window.location.href="/login";
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className=" absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}/>

            <div className="relative bg-black/40 rounded-xl shadow-xl w-95 p-6 z-10 animate-fadeIn ">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold">Profile</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">×</button>
                </div>

                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                </div>

                <div className="space-y-1 text-center mb-6">
                    <p className="text-lg font-medium text-slate-200">{user?.name}</p>
                    <p className="text-slate-200">{user?.email}</p>
                </div>

                <div className="flex flex-col gap-3">
                    <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Profile;