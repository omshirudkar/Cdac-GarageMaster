import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Login.css"; // Import the CSS file

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is 'user'
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); // Hook for navigation

  // Email validation regex pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get stored email, password, and role from localStorage
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    const storedRole = localStorage.getItem("role");

    // Check if email and password match the stored values
    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    // Check if credentials match
    if (email === storedEmail && password === storedPassword) {
      setMessage("Login successful!");

      // After successful login, navigate based on the role
      if (storedRole === "admin") {
        navigate("/admin-dashboard"); // Redirect to Admin Dashboard
      } else if (storedRole === "mechanic") {
        navigate("/machanicdashboard"); // Redirect to Mechanic Dashboard
      } else if (storedRole === "user") {
        navigate("/customer-dash"); // Redirect to User Dashboard
      } else {
        console.log("Not selected");
      }
    } else {
      setMessage("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role: </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="mechanic">Mechanic</option>
          </select>
        </div>
        <button type="submit">Log In</button>
      </form>
      {message && (
        <p className={message.includes("successful") ? "success" : "message"}>
          {message}
        </p>
      )}
    </div>
  );
}
