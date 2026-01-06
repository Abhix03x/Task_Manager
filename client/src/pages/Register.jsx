import react ,{useState}from "react";
import axios from "../api/axios.jsx";

const Register = ()=> {
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:""
    });

const [message , setMessage] = useState("");

const handleChange =(e) =>{
    setFormData({
        ...formData,[e.target.name]: e.target.value
    });
};

const handleRegister = async (e) =>{
    e.preventDefault();

    try{
        const response = await axios.post("/api/auth/register",formData);
        setMessage("user registered successfully");
    }catch(error){
        setMessage(error.response?.data?.message || "registration failed");
    }
}

return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-purple-900 to-blue-500">
        <div className="w-full max-w-md bg-white backdrop-blur-lg rounded-2xl shadow-xl px-10 py-15">
        <h2 className="text-2xl text-center font-bold text-slate-800 mb-8">Register</h2>
        <form onSubmit={handleRegister}
        className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-950 mb-1">Name</label>
                <input type="text" name="name" value={formData.name}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-lg border border-slate-300 mb-1"
                required />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-950 mb-1">Email</label>
                <input type="email" name="email" value={formData.email}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-lg border border-slate-300 mb-1"
                required />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-950 mb-1">password</label>
                <input type="password" name="password" value={formData.password}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-lg border border-slate-300
                 mb-1 text-slate-700 "
                required />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 font-medium rounded-lg">Register</button>
        </form>
        {message && (<p>{message}</p>)}
    </div>
    </div>
)
};

export default Register;