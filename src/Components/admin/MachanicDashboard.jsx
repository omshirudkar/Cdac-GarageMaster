import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MechanicDashboard() {
  const [tasks, setTasks] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setTasks([
        { id: 1, task: "Oil Change", carDetails: "Toyota Camry", assignedStaff: "John", deliveryTime: "2 PM", status: "Pending" },
        { id: 2, task: "Brake Inspection", carDetails: "Honda Civic", assignedStaff: "Mike", deliveryTime: "4 PM", status: "In Progress" },
      ]);
    }, 2000);
  }, []);

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  const logout = () => {
    navigate("/login");
  };

  if (!tasks) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="dashboard">
      <div className="header">
        <h2>Mechanic Dashboard</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
      
      <div className="mechanic-info">
        <p><strong>Mechanic:</strong> John Doe</p>
        <p><strong>Role:</strong> Senior Technician</p>
      </div>
      
      <div className="task-overview">
        <div className="card pending">Pending: {tasks.filter(t => t.status === "Pending").length}</div>
        <div className="card in-progress">In Progress: {tasks.filter(t => t.status === "In Progress").length}</div>
        <div className="card completed">Completed: {tasks.filter(t => t.status === "Completed").length}</div>
      </div>
      
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Car Details</th>
            <th>Assigned Staff</th>
            <th>Delivery Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.task}</td>
              <td>{task.carDetails}</td>
              <td>{task.assignedStaff}</td>
              <td>{task.deliveryTime}</td>
              <td className={task.status.toLowerCase()}>{task.status}</td>
              <td>
                <button className="complete-btn" onClick={() => updateTaskStatus(task.id, "Completed")}>
                  Complete
                </button>
                <button className="pending-btn" onClick={() => updateTaskStatus(task.id, "Pending")}>
                  Pending
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .dashboard {
          font-family: Arial, sans-serif;
          padding: 20px;
          background: #f8f9fa;
          min-height: 100vh;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #007bff;
          padding: 15px;
          color: white;
          border-radius: 10px;
        }
        .logout-btn {
          background: red;
          border: none;
          padding: 10px 15px;
          color: white;
          border-radius: 5px;
          cursor: pointer;
        }
        .mechanic-info {
          background: white;
          padding: 15px;
          margin: 20px 0;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .task-overview {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .card {
          flex: 1;
          padding: 15px;
          border-radius: 10px;
          color: white;
          text-align: center;
          font-weight: bold;
        }
        .pending { background: orange; }
        .in-progress { background: blue; }
        .completed { background: green; }
        .task-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .task-table th, .task-table td {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          text-align: left;
        }
        .task-table th {
          background: #007bff;
          color: white;
        }
        .task-table td.pending { color: orange; font-weight: bold; }
        .task-table td.in-progress { color: blue; font-weight: bold; }
        .task-table td.completed { color: green; font-weight: bold; }
        .complete-btn, .pending-btn {
          border: none;
          padding: 5px 10px;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          margin-right: 5px;
        }
        .complete-btn { background: green; }
        .pending-btn { background: orange; }
      `}</style>
    </div>
  );
}
