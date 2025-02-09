import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    const storedRole = localStorage.getItem("role");

    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (email === storedEmail && password === storedPassword) {
      setMessage("Login successful!");
      storedRole === "admin"
        ? navigate("/admin-dashboard")
        : storedRole === "mechanic"
        ? navigate("/mechanic-dashboard")
        : navigate("/customer-dash");
    } else {
      setMessage("Invalid email or password.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.card}>
        <h2 style={styles.title}>Garage Service Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              style={styles.select}
            >
              <option value="user">Customer</option>
              <option value="admin">Admin</option>
              <option value="mechanic">Mechanic</option>
            </select>
          </div>
          <button type="submit" style={styles.button}>
            Log In
          </button>
        </form>
        {message && (
          <p style={message.includes("successful") ? styles.success : styles.error}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

// Modern & Responsive Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage:
      "url('https://source.unsplash.com/1600x900/?garage,mechanic,tools')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    position: "relative",
    padding: "10px",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(243, 197, 197, 0.6)", // Dark overlay for readability
  },
  card: {
    width: "90%",
    maxWidth: "400px",
    backgroundColor: "rgba(255, 255, 255, 0.98)", // Slight transparency
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  title: {
    marginBottom: "20px",
    color: "#333",
    fontSize: "26px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#444",
    fontSize: "14px",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    transition: "border 0.3s",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#ff9800", // Garage-style orange
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
  },
  buttonHover: {
    backgroundColor: "#e68900",
    transform: "scale(1.05)",
  },
  success: {
    color: "green",
    marginTop: "10px",
    fontSize: "14px",
  },
  error: {
    color: "red",
    marginTop: "10px",
    fontSize: "14px",
  },
};

