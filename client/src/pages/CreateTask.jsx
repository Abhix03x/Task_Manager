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
    const [type,setType] = useState("personal");

    useEffect(()=>{
        
        if (type === "assign") {
         axios.get("/users").then((res) => setUsers(res.data));
       }
       
    },[type]);

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = 
        type === "personal"
        ? {title:formData.title,description:formData.description}
        : formData;
        try{
            
            await axios.post("/tasks",payload);
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

            <div>
                <button onClick={() => setType("personal")}>My Task</button>
                <button onClick={() => setType("assign")}>Assign Task</button>
            </div>

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

                {type === "assign" && (
                    <select 
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                required
                >
                    <option value="">Select User</option>
                   
                    { users.map((user)=>(
                        <option key={user._id} value={user._id}>
                            {user.name}
                        </option> 
                    ))}
                  
                </select>
                )}
                
                <button type="submit"> Create task</button>
              
            </form>
            {message && <p>{message}</p>}
        </div>
    );

};

export default CreateTask;
