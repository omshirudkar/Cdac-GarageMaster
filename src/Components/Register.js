import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("user"); // Default role is 'user'
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  // Email validation regex pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any fields are empty
    if (!name || !email || !password || !mobile || !role) {
      setMessage("Please fill in all fields");
      return;
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    // Store the data in localStorage (could be replaced with API call)
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("mobile", mobile);
    localStorage.setItem("role", role);

    setMessage("Sign up successful! You can now log in.");

    // Navigate to login page after successful registration
    setTimeout(() => {
      navigate("/login"); // Redirect to login page
    }, 2000); // Wait for 2 seconds before redirecting
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          <label>Mobile Number: </label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            pattern="[0-9]{10}" // This regex enforces 10 digit mobile number format
            placeholder="Enter your 10-digit mobile number"
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
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
