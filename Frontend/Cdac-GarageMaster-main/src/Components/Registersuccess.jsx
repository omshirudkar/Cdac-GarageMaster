import React from "react";
import { Link } from "react-router-dom";

export default function RegisterSuccess() {
  return (
    <div className="success-container">
      <div className="card">
        <h2>Registration Successful!</h2>
        <p>Thank you for registering with us. We're excited to have you on board!</p>
        <Link to="/login">
          <button className="login-button">Go to Login</button>
        </Link>
      </div>

      <style jsx>{`
        .success-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(145deg, #f5f7fa, #e1e6ee);
          font-family: "Poppins", sans-serif;
        }

        .card {
          text-align: center;
          background: #ffffff;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 90%;
        }

        h2 {
          font-size: 28px;
          color: #2c3e50;
          margin-bottom: 20px;
          font-weight: bold;
        }

        p {
          font-size: 16px;
          color: #555555;
          margin-bottom: 30px;
        }

        .login-button {
          padding: 12px 20px;
          font-size: 16px;
          color: white;
          background: linear-gradient(135deg, #4a90e2, #007aff);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .login-button:hover {
          background: linear-gradient(135deg, #007aff, #0056b3);
          transform: translateY(-2px);
        }

        .login-button:active {
          background: #0056b3;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
