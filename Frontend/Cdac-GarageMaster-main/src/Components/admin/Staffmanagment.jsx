import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar"; // Sidebar component

export default function StaffList() {
  const [staff, setStaff] = useState([
    { name: "Om Shirudkar", role: "Owner(Boss)", status: "Active" },
    { name: "John Doe", role: "Manager", status: "Active" },
    { name: "Jane Smith", role: "Mechanic", status: "Active" },
    { name: "Mark Wilson", role: "Assistant", status: "Inactive" },
  ]);

  const [newStaff, setNewStaff] = useState({
    name: "",
    role: "",
    status: "Active", // Default status is Active
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({ ...newStaff, [name]: value });
  };

  // Handle the addition of a new staff member
  const handleAddStaff = (e) => {
    e.preventDefault();
    setStaff([...staff, newStaff]); // Add new staff to the list
    setNewStaff({ name: "", role: "", status: "Active" }); // Reset the form
    setShowAddForm(false); // Hide the form after adding
  };

  // Handle delete staff
  const deleteStaff = (index) => {
    const updatedStaff = staff.filter((_, i) => i !== index);
    setStaff(updatedStaff);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={styles.wrapper}>
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
            ×
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

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h2>Staff Management</h2>

        {/* Centered "Add New Staff" Button */}
        <div style={styles.addButtonContainer}>
          <button
            className="btn btn-primary mb-3"
            onClick={() => setShowAddForm(true)}
            style={styles.addButton}
          >
            Add New Staff
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddStaff} style={styles.form}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newStaff.name}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <div>
              <label>Role:</label>
              <input
                type="text"
                name="role"
                value={newStaff.role}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <div>
              <label>Status:</label>
              <select
                name="status"
                value={newStaff.status}
                onChange={handleInputChange}
                required
                style={styles.input}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <button type="submit" className="btn btn-success">
                Add Staff
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <table className="table table-bordered" style={styles.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{member.name}</td>
                <td>{member.role}</td>
                <td>{member.status}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteStaff(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Back to Dashboard Button (same as before) */}
        <div style={styles.backButtonContainer}>
          <Link to="/admin-dashboard" style={styles.backButton}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(to bottom, #ffffff, #f1f5f9)", // Soft gradient from white
    color: "#333", // Dark text for contrast on a light background
    overflow: "hidden",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    marginLeft: "0px",
    transition: "margin-left 0.3s ease",
    overflowY: "auto",
    background: "#ffffff", // White background for main content area
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  table: {
    width: "100%",
    marginTop: "20px",
    background: "#ffffff", // White background for the table
    borderRadius: "8px",
    border: "1px solid rgba(0, 0, 0, 0.1)", // Slight border for separation
    color: "#333", // Dark text for readability
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
  },
  form: {
    marginTop: "20px",
    padding: "20px",
    background: "#ffffff", // White background for forms
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    border: "1px solid rgba(0, 0, 0, 0.1)", // Light border on input fields
    borderRadius: "8px",
    background: "#f9fafb", // Slightly off-white for inputs
    color: "#333", // Dark text for better contrast
    fontSize: "16px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  sidebar: {
    position: "fixed",
    top: 0,
    left: "-250px",
    width: "250px",
    height: "100%",
    background: "linear-gradient(to top, #f1f5f9, #ffffff)", // Light gradient for sidebar
    color: "#333",
    paddingTop: "40px",
    paddingLeft: "20px",
    transition: "transform 0.3s ease",
    zIndex: 1000,
    borderRight: "2px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "4px 0 8px rgba(0, 0, 0, 0.2)",
  },
  sidebarOpen: {
    transform: "translateX(250px)", // Shift sidebar into view
  },
  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#3b82f6", // Blue text for headings
  },
  link: {
    display: "block",
    fontSize: "18px",
    padding: "10px 0",
    textDecoration: "none",
    color: "#333",
    transition: "background-color 0.3s ease",
  },
  addButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  addButton: {
    width: "100%",
    maxWidth: "250px", // Optional max width for the button
    padding: "12px 0",
    backgroundColor: "#3b82f6", // Blue background
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
  backButtonContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  backButton: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#3b82f6", // Blue background
    color: "#ffffff",
    borderRadius: "8px",
    textDecoration: "none",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "30px",
    color: "#333",
    cursor: "pointer",
  },
};
