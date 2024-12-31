import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing

export default function AssignTask() {
  const [staffList] = useState([
    "John Doe",
    "Jane Smith",
    "Mark Wilson",
    "Alice Johnson",
  ]);

  const [task, setTask] = useState("");
  const [taskType, setTaskType] = useState("");
  const [assignedStaff, setAssignedStaff] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [carDetails, setCarDetails] = useState("");
  const [taskRecords, setTaskRecords] = useState([]); // Stores all task records

  const assignTask = () => {
    if (!task || !taskType || !assignedStaff || !deliveryTime || !carDetails) {
      alert("Please fill in all the fields before assigning the task.");
      return;
    }

    const newTask = {
      task,
      taskType,
      assignedStaff,
      carDetails,
      deliveryTime,
    };

    setTaskRecords([...taskRecords, newTask]); // Add the new task to the task records
    alert(`Task "${task}" has been assigned to ${assignedStaff}.`);

    // Clear the input fields
    setTask("");
    setTaskType("");
    setAssignedStaff("");
    setDeliveryTime("");
    setCarDetails("");
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Service Management</h2>

      {/* Task Assignment Form with Border */}
      <div style={styles.formWrapper}>
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Task Description</label>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task description"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Task Type</label>
            <select
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
              style={styles.input}
            >
              <option value="">Select task type</option>
              <option value="Car Washing">Car Washing</option>
              <option value="Car Repair">Car Repair</option>
              <option value="Oil Change">Oil Change</option>
              <option value="General Service">General Service</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Assign to Staff</label>
            <select
              value={assignedStaff}
              onChange={(e) => setAssignedStaff(e.target.value)}
              style={styles.input}
            >
              <option value="">Select a staff member</option>
              {staffList.map((staff, index) => (
                <option key={index} value={staff}>
                  {staff}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Car Details</label>
            <input
              type="text"
              value={carDetails}
              onChange={(e) => setCarDetails(e.target.value)}
              placeholder="Enter car model or registration number"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Delivery Time</label>
            <input
              type="time"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              style={styles.input}
            />
          </div>

          <button onClick={assignTask} style={styles.assignButton}>
            Assign Task
          </button>
        </div>
      </div>

      {/* Task Records Table Below the Form */}
      <h3 style={styles.heading}>Assigned Tasks</h3>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Task Description</th>
              <th>Task Type</th>
              <th>Assigned Staff</th>
              <th>Car Details</th>
              <th>Delivery Time</th>
            </tr>
          </thead>
          <tbody>
            {taskRecords.length === 0 ? (
              <tr>
                <td colSpan="5" style={styles.noData}>
                  No tasks assigned yet.
                </td>
              </tr>
            ) : (
              taskRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.task}</td>
                  <td>{record.taskType}</td>
                  <td>{record.assignedStaff}</td>
                  <td>{record.carDetails}</td>
                  <td>{record.deliveryTime}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Centered Back to Dashboard Button */}
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
  formWrapper: {
    border: "2px solid #007bff", // Add border around the form
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "30px", // Space between the form and table
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px", // Providing space between form elements
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column", // Stack labels and inputs vertically
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  assignButton: {
    backgroundColor: "#007bff", // Button color matching header
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "16px",
    alignSelf: "center", // Center the button horizontally
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
