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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", formData);

      localStorage.setItem("token", response.data.token);

      setMessage("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ width: "400px", margin: "50px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "6px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "6px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#2ecc71",
            color: "#fff",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "15px", color: message.includes("success") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Login;