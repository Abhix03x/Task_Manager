import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.jsx";




const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const changePage = (e) => {
    navigate("/register");
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user",JSON.stringify(response.data.user));

      setMessage("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-purple-900 to-blue-500">
      
      <div className="w-full max-w-md bg-white  backdrop-blur-lg rounded-2xl shadow-xl px-10 py-15 ">
         <h2 className="text-2xl font-semibold text-slate-800 text-center mb-2">Welcome Back</h2>
         <h2 className="text-center text-slate-500 mb-8">Login to manage your task</h2>
      <form onSubmit={handleLogin}
      className="space-y-4">
        
         
          <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-12 px-4  rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 text-slate-700"
            required
            placeholder="you@example.com"
          />
      

        
          <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
             className="w-full px-4 h-12 rounded-lg border border-slate-300 text-slate-600"
            required
            placeholder="••••••••"
          />
        <div className="flex justify-center">
             <button
          type="submit"
           className=" bg-blue-600 text-white px-6 py-3 font-medium rounded-lg "
        >
          Login
        </button>
       
        </div>
        <span className="flex justify-center">Don't have an account ?<a href="#" onClick={changePage}> Register</a></span>
       
      </form>
      {message && (
        <p className="text-cener mt-4 text-red-500">
          {message}
        </p>
      )}
    </div>
    </div>
  );
};

export default Login;