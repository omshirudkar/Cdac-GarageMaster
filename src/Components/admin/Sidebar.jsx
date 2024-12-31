import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h3 style={styles.heading}>Admin Dashboard</h3>
      <ul className="list-unstyled">
        <li>
          <Link to="/admin-dashboard" style={styles.link}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/staff" style={styles.link}>
            Staff Management
          </Link>
        </li>
        <li>
          <Link to="/customer" style={styles.link}>
            Customer Management
          </Link>
        </li>
        <li>
          <Link to="/assign-task" style={styles.link}>
            Assign Tasks
          </Link>
        </li>
        <li>
          <Link to="/accept-request" style={styles.link}>
            Accept Requests
          </Link>
        </li>
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "250px", // Increase width for better readability
    backgroundColor: "#1f2937", // Darker background for a modern look
    height: "100vh",
    color: "white",
    paddingTop: "30px", // Increase top padding for better spacing
    paddingLeft: "20px",
    boxShadow: "4px 0px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow to create depth
    position: "fixed", // Ensure it stays in place
    top: 0,
    left: 0,
  },
  heading: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    letterSpacing: "1px", // Spacing for a cleaner appearance
  },
  link: {
    color: "white",
    display: "block",
    padding: "12px 18px", // Increase padding for better clickability
    textDecoration: "none",
    marginBottom: "12px", // Add spacing between links
    borderRadius: "6px", // Rounded corners for a modern look
    transition: "all 0.3s ease", // Smooth hover transition
    backgroundColor: "transparent",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow effect
  },
  linkHover: {
    backgroundColor: "#3b82f6", // Highlight color on hover
    transform: "translateX(5px)", // Slight hover movement for interactivity
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Darker shadow on hover
  },
};
