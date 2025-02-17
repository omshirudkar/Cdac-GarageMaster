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
          background: #eef2f3;
          min-height: 100vh;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #343a40;
          padding: 15px;
          color: white;
          border-radius: 10px;
        }
        .logout-btn {
          background: crimson;
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
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .task-overview {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }
        .card {
          flex: 1;
          padding: 15px;
          border-radius: 10px;
          color: white;
          text-align: center;
          font-weight: bold;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        }
        .pending { background: #ffa502; }
        .in-progress { background: #1e90ff; }
        .completed { background: #2ed573; }
        .task-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 10px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }
        .task-table th, .task-table td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
          text-align: left;
        }
        .task-table th {
          background: #343a40;
          color: white;
        }
        .complete-btn, .pending-btn {
          border: none;
          padding: 8px 12px;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          margin-right: 5px;
        }
        .complete-btn { background: #28a745; }
        .pending-btn { background: #ff6b6b; }
      `}</style>
    </div>
  );
}
