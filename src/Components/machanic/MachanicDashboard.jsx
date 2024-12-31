import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MechanicDashboard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      taskName: "Car Washing",
      carModel: "Toyota Corolla",
      assignedBy: "John Doe",
      deliveryTime: "2024-12-31 10:00",
      status: "In Progress",
    },
    {
      id: 2,
      taskName: "Brake Repair",
      carModel: "Honda Civic",
      assignedBy: "Alice Johnson",
      deliveryTime: "2024-12-31 15:00",
      status: "Pending",
    },
    {
      id: 3,
      taskName: "Oil Change",
      carModel: "BMW X5",
      assignedBy: "Mark Wilson",
      deliveryTime: "2024-12-31 18:00",
      status: "Completed",
    },
  ]);

  // Handle task status update
  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Mechanic Dashboard</h2>

      <div style={styles.quickOverview}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Assigned Tasks</h3>
          <p style={styles.cardText}>3 Tasks</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Completed Tasks</h3>
          <p style={styles.cardText}>1 Task</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Pending Tasks</h3>
          <p style={styles.cardText}>1 Task</p>
        </div>
      </div>

      <h3 style={styles.heading}>Assigned Tasks</h3>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Task</th>
              <th>Car Model</th>
              <th>Assigned By</th>
              <th>Delivery Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.noData}>
                  No tasks assigned.
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.taskName}</td>
                  <td>{task.carModel}</td>
                  <td>{task.assignedBy}</td>
                  <td>{task.deliveryTime}</td>
                  <td>
                    <span
                      style={{
                        ...styles.status,
                        backgroundColor:
                          task.status === "Completed"
                            ? "#28a745"
                            : task.status === "In Progress"
                            ? "#ffc107"
                            : "#dc3545",
                      }}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => updateTaskStatus(task.id, "In Progress")}
                      style={styles.updateButton}
                    >
                      Start Task
                    </button>
                    <button
                      onClick={() => updateTaskStatus(task.id, "Completed")}
                      style={styles.updateButton}
                    >
                      Complete Task
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Back to Dashboard Button */}
      <div style={styles.buttonContainer}>
        <Link to="/admin-dashboard" className="btn btn-secondary" style={styles.backButton}>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "1000px", // Limiting the width of the container
    margin: "0 auto", // Centering the container
  },
  heading: {
    marginBottom: "20px",
    color: "#007bff", // Header color for headings
    textAlign: "center", // Center aligning the headings
  },
  quickOverview: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    flex: 1,
    margin: "0 10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    fontSize: "18px",
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#007bff",
  },
  cardText: {
    fontSize: "16px",
    color: "#343a40",
  },
  tableContainer: {
    marginTop: "20px", // Adding space between the table and the form
    overflowX: "auto", // For responsiveness on smaller screens
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px", // Space at the bottom of the table
  },
  noData: {
    textAlign: "center",
    fontStyle: "italic",
  },
  status: {
    padding: "5px 10px",
    borderRadius: "4px",
    color: "#fff",
  },
  updateButton: {
    backgroundColor: "#007bff", // Button color matching header
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
    marginRight: "10px", // Space between buttons
  },
  backButton: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#007bff", // Matching button color
    color: "#fff",
    textAlign: "center",
    textDecoration: "none",
    borderRadius: "4px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center", // Center the Back to Dashboard button
    marginTop: "20px",
  },
};
