import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !mobile || !role) {
      setMessage("Please fill in all fields");
      return;
    }

    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("mobile", mobile);
    localStorage.setItem("role", role);

    setMessage("Sign up successful! Redirecting...");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create an Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            pattern="[0-9]{10}"
            style={styles.input}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            style={styles.select}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="mechanic">Mechanic</option>
          </select>
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #2C3E50, #4CA1AF)",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    width: "360px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s ease",
  },
  select: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
    background: "#fff",
    outline: "none",
    cursor: "pointer",
  },
  button: {
    background: "#27AE60",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "bold",
    transition: "0.3s ease",
  },
  message: {
    marginTop: "15px",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#e74c3c",
  },
};
