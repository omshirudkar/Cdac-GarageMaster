import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import AdminHeader from "./Header"; // Import the admin header

export default function AdminDash() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for redirection

  // Toggle the sidebar open or closed
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle logout functionality
  const handleLogout = () => {
    // Clear any session or token before redirecting (if necessary)
    localStorage.removeItem("userToken"); // Example of removing a token, adjust as per your app
    sessionStorage.removeItem("userToken"); // Example for sessionStorage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div style={styles.wrapper}>
      {/* Button to toggle sidebar */}
      <button
        className="btn btn-primary"
        onClick={toggleSidebar}
        style={styles.toggleButton}
      >
        {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
        style={{
          ...styles.sidebar,
          ...(isSidebarOpen ? styles.sidebarOpen : {}),
        }}
      >
        <div className="sidebar-header">
          <h3 style={styles.heading}>Admin Dashboard</h3>
          <button onClick={toggleSidebar} style={styles.closeButton}>
            {/* Close button content */}
          </button>
        </div>
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
              Service Management
            </Link>
          </li>
          <li>
            <Link to="/accept-request" style={styles.link}>
              Accept Requests
            </Link>
          </li>
          <li>
            <Link to="/inventory-management" style={styles.link}>
              Inventory Management
            </Link>
          </li>
          {/* Add Logout button */}
          <li>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Content area */}
      <div style={styles.contentArea}>
        <AdminHeader />
        <div style={styles.container}>
          <h2>Welcome to the Admin Dashboard</h2>
          <p>This is where you can manage garage operations and staff.</p>
          <div style={styles.card}>
            <h4>Garage Overview</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Garage Name</th>
                  <th>Status</th>
                  <th>Staff Assigned</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Garage A</td>
                  <td>Active</td>
                  <td>John, Jane</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    position: "relative",
    minHeight: "100vh", // Full-page height
    backgroundColor: "#f9f9f9", // Soft off-white background for less strain on eyes
    fontFamily: "'Inter', sans-serif", // Clean, modern font
    lineHeight: "1.6", // Improved readability
  },
  toggleButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    zIndex: 1050, // Ensures it’s above all content
    backgroundColor: "#007bff", // Friendly, accessible blue color
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "16px",
    border: "none",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    cursor: "pointer",
    transition: "all 0.3s ease", // Smooth hover effect
  },
  contentArea: {
    width: "100%",
    padding: "20px",
    marginLeft: "0px",
    transition: "margin-left 0.3s ease", // Smooth transition for layout changes
    overflowY: "auto", // Ensure scrolling if content overflows
  },
  container: {
    padding: "25px",
    backgroundColor: "#fff", // Clean white container background
    borderRadius: "10px", // Smooth, rounded corners
    border: "1px solid #e0e0e0", // Light gray border for definition
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for elevation
    maxWidth: "600px", // Restrict width for better readability
    margin: "50px auto", // Center alignment
  },
  card: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px solid #e0e0e0",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  sidebar: {
    position: "fixed",
    top: 0,
    left: "-250px", // Initially hidden
    width: "250px",
    height: "100%",
    backgroundColor: "#f5f5f5", // Light gray background for sidebar
    color: "#333", // Darker gray for readable text
    paddingTop: "30px",
    paddingLeft: "20px",
    transition: "transform 0.3s ease", // Smooth slide-in effect
    zIndex: 1000,
    borderRight: "1px solid #e0e0e0",
  },
  sidebarOpen: {
    transform: "translateX(250px)", // Slide-in effect
  },
  heading: {
    color: "#333", // Dark gray for strong text contrast
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  link: {
    color: "#007bff", // Accessible blue for links
    display: "block",
    padding: "12px 18px",
    textDecoration: "none",
    marginBottom: "10px",
    borderRadius: "6px",
    backgroundColor: "#f8f9fa", // Light background for links
    border: "1px solid #e0e0e0", // Subtle border for definition
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)", // Subtle shadow
    transition: "all 0.3s ease", // Smooth hover effects
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
