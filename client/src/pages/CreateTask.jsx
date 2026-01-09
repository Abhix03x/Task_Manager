import { useState,useEffect } from "react";
import axios from "../api/axios.jsx";
import Navbar from "../components/NavBar.jsx";

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

    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
          <div className="w-full max-w-md bg-white/10 rounded-lg px-3 py-4">
            <h2 className="text-2xl font-semibold text-center text-slate-100 mb-6">
              Create Task
            </h2>

            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setType("personal")}
                className={`flex-1 py-2 rounded-lg text-medium text-sm transition 
                    ${
                      type === "personal"
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
              >
                My Task
              </button>
              <button
                onClick={() => setType("assign")}
                className={`flex-1 py-2 rounded-lg text-medium text-sm transition 
                    ${
                      type === "assign"
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
              >
                Assign Task
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-400 mb-3"
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-400 resize-none mb-3"
                required
              />

              {type === "assign" && (
                <select
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className="w-s px-4 py-3 rounded-lg border border-slate-300 bg-slate-400 mb-3"
                  required
                >
                  <option value="">Select User</option>

                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium 
            hover:bg-blue-700 transition"
              >
                {" "}
                Create task
              </button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </>
    );

};

export default CreateTask;
