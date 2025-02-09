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
      status: "Pending", // Set initial status as "Pending"
    };

    // Ensure that onTaskAssigned is being passed as a function
    if (typeof onTaskAssigned === "function") {
      onTaskAssigned(newTask); // Call the function passed from the parent
    } else {
      console.error("onTaskAssigned is not a function");
    }

    alert(`Task "${task}" has been assigned to ${assignedStaff}.`);

    // Clear input fields
    setTask("");
    setTaskType("");
    setAssignedStaff("");
    setDeliveryTime("");
    setCarDetails("");
  };

  return (
    <div>
      <h2>Assign a New Task</h2>

      <div>
        <div>
          <label htmlFor="taskName">Task Name:</label>
          <input
            type="text"
            id="taskName"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="taskType">Task Type:</label>
          <input
            type="text"
            id="taskType"
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="assignedStaff">Assigned Staff:</label>
          <select
            id="assignedStaff"
            value={assignedStaff}
            onChange={(e) => setAssignedStaff(e.target.value)}
          >
            <option value="">Select Staff</option>
            {staffList.map((staff, index) => (
              <option key={index} value={staff}>
                {staff}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="carDetails">Car Details:</label>
          <input
            type="text"
            id="carDetails"
            value={carDetails}
            onChange={(e) => setCarDetails(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="deliveryTime">Delivery Time:</label>
          <input
            type="datetime-local"
            id="deliveryTime"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
          />
        </div>

        <button onClick={assignTask}>Assign Task</button>
      </div>
    </div>
  );
}
