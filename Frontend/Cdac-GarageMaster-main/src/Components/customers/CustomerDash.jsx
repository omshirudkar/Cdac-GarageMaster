import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export default function CustomerDash() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for redirection

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle logout functionality
  const handleLogout = () => {
    // You can clear any user session or token here if needed
    // localStorage.removeItem("userToken"); // Example if using localStorage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div style={styles.wrapper}>
      <button
        className="btn btn-primary"
        onClick={toggleSidebar}
        style={styles.toggleButton}
      >
        {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>

      <div
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
        style={{
          ...styles.sidebar,
          ...(isSidebarOpen ? styles.sidebarOpen : {}),
        }}
      >
        <div className="sidebar-header">
          <h3 style={styles.heading}>Customer Dashboard</h3>
        </div>
        <ul className="list-unstyled">
          <li>
            <Link to="/service-history" style={styles.link}>
              Service History
            </Link>
          </li>
          <li>
            <Link to="/customer-contact-support" style={styles.link}>
              Contact Support
            </Link>
          </li>
          <li>
            <Link to="/customer-update-details" style={styles.link}>
              Profile Management
            </Link>
          </li>
          <li>
            <Link to="/notifications" style={styles.link}>
              Notifications
            </Link>
          </li>
          <li>
            <Link to="/service-booking" style={styles.link}>
              Service Booking
            </Link>
          </li>
          <li>
            <Link to="/vehicle-tracking" style={styles.link}>
              Vehicle Tracking
            </Link>
          </li>
          {/* Logout button */}
          <li>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div style={styles.contentArea}>
        <div style={styles.container}>
          <h2>Welcome to the Customer Dashboard</h2>
          <p>Manage your services, contact support, or update your details.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    fontFamily: "'Inter', sans-serif",
    lineHeight: "1.6",
  },
  toggleButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    zIndex: 1050,
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "16px",
    border: "none",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  contentArea: {
    width: "100%",
    padding: "20px",
    marginLeft: "0px",
    transition: "margin-left 0.3s ease",
    overflowY: "auto",
  },
  container: {
    padding: "25px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px solid #e0e0e0",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "50px auto",
  },
  sidebar: {
    position: "fixed",
    top: 0,
    left: "-250px",
    width: "250px",
    height: "100%",
    backgroundColor: "#f5f5f5",
    color: "#333",
    paddingTop: "30px",
    paddingLeft: "20px",
    transition: "transform 0.3s ease",
    zIndex: 1000,
    borderRight: "1px solid #e0e0e0",
  },
  sidebarOpen: {
    transform: "translateX(250px)",
  },
  heading: {
    color: "#333",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    letterSpacing: "0.5px",
  },
  link: {
    color: "#007bff",
    display: "block",
    padding: "12px 18px",
    textDecoration: "none",
    marginBottom: "10px",
    borderRadius: "6px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #e0e0e0",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
  },
  logoutButton: {
    backgroundColor: "#dc3545", // Red color for logout
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
    transition: "all 0.3s ease",
  },
};
