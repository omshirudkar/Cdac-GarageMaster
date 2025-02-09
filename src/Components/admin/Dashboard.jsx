import React, { useState } from "react";
import AssignTask from "./AssignTask"; // Import the AssignTask component
import MechanicDashboard from "./MechanicDashboard"; // Import the MechanicDashboard component

export default function Dashboard() {
  // Initialize the state for tasks
  const [tasks, setTasks] = useState([]);

  // Method to handle task assignment
  const handleTaskAssigned = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task to existing tasks
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Render MechanicDashboard and pass tasks as props */}
      <MechanicDashboard tasks={tasks} />

      {/* Render AssignTask and pass handleTaskAssigned method */}
      <AssignTask onTaskAssigned={handleTaskAssigned} />
    </div>
  );
}
