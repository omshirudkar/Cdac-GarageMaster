import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showResend, setShowResend] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/customer-dash"), 1500);
      } else if (response.status === 401 && data.error === "Account Inactive") {
        setMessage("Your account is inactive. Please verify your email.");
        setShowResend(true);
      } else {
        setMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error! Please try later.");
    }
  };

  const handleResendVerification = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Verification email sent! Please check your inbox.");
        setShowResend(false);
      } else {
        setMessage("Failed to resend verification email. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error sending verification email. Try again later.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login to Your Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
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
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
        {showResend && (
          <button onClick={handleResendVerification} style={styles.resendButton}>
            Resend Verification Email
          </button>
        )}
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
  },
  resendButton: {
    background: "#e67e22",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "bold",
    marginTop: "10px",
  },
  message: {
    marginTop: "15px",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#e74c3c",
  },
};
