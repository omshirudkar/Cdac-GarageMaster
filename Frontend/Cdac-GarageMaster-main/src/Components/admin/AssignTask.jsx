import React, { useState } from "react";

export default function AssignTask({ onTaskAssigned }) {
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
      status: "Pending",
    };

    if (typeof onTaskAssigned === "function") {
      onTaskAssigned(newTask);
    } else {
      console.error("onTaskAssigned is not a function");
    }

    alert(`Task "${task}" has been assigned to ${assignedStaff}.`);

    setTask("");
    setTaskType("");
    setAssignedStaff("");
    setDeliveryTime("");
    setCarDetails("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Assign a New Task</h2>

      <div style={styles.formGroup}>
        <label>Task Name:</label>
        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} style={styles.input} />
      </div>

      <div style={styles.formGroup}>
        <label>Task Type:</label>
        <input type="text" value={taskType} onChange={(e) => setTaskType(e.target.value)} style={styles.input} />
      </div>

      <div style={styles.formGroup}>
        <label>Assigned Staff:</label>
        <select value={assignedStaff} onChange={(e) => setAssignedStaff(e.target.value)} style={styles.select}>
          <option value="">Select Staff</option>
          {staffList.map((staff, index) => (
            <option key={index} value={staff}>{staff}</option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label>Car Details:</label>
        <input type="text" value={carDetails} onChange={(e) => setCarDetails(e.target.value)} style={styles.input} />
      </div>

      <div style={styles.formGroup}>
        <label>Delivery Time:</label>
        <input type="datetime-local" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} style={styles.input} />
      </div>

      <button onClick={assignTask} style={styles.button}>Assign Task</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  select: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
