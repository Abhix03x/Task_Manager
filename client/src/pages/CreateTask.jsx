import { useState,useEffect } from "react";
import axios from "../api/axios.jsx";

const CreateTask = () =>{
    const [formData,setFormData] = useState({
        title:"",
        description:"",
        assignedTo:"",
    });
    const [message,setMessage]=useState("");
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        const fetchUser = async () =>{
            const res = await axios.get("/users");
            console.log("Users API response:", res.data); 
            setUsers(res.data);
           
        }
        fetchUser();
    },[]);

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log(formData);
            await axios.post("/tasks",formData);
            setMessage('Task created Successfully');
            setFormData({title:"",
        description:"",
        assignedTo:"",});
        }catch(err){
        setMessage("failed to create task");
    }
    }

    return(
        <div>
            <h2>Create Task</h2>

            <form onSubmit={handleSubmit}>
                <input name="title" placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required/>

                <textarea 
                name= "description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required/>

                <select 
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                required
                >
                    <option value="">Select User</option>
                   
                    {Array.isArray(users) && users.map((user)=>(
                        <option key={user._id} value={user._id}>
                            {user.name}
                        </option> 
                    ))}
                  
                </select>
                <button type="submit"> Create task</button>
              
            </form>
        </div>
    );

};

export default CreateTask;
