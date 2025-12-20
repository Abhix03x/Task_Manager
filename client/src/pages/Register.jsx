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
    <div>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={formData.name}
                onChange={handleChange}
                required />
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="email" value={formData.email}
                onChange={handleChange}
                required />
            </div>
            <div>
                <label>password</label>
                <input type="password" name="password" value={formData.password}
                onChange={handleChange}
                required />
            </div>
            <button type="submit" >Register</button>
        </form>
        {message && (<p>{message}</p>)}
    </div>
)
};

export default Register;