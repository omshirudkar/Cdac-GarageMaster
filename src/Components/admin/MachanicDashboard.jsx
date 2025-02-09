import React, { useState, useEffect } from "react";

export default function MechanicDashboard() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setTasks([
        {
          id: 1,
          task: "Oil Change",
          carDetails: "Toyota Camry",
          assignedStaff: "John",
          deliveryTime: "2 PM",
          status: "Pending",
        },
        {
          id: 2,
          task: "Brake Inspection",
          carDetails: "Honda Civic",
          assignedStaff: "Mike",
          deliveryTime: "4 PM",
          status: "In Progress",
        },
      ]);
    }, 2000);
  }, []);

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  if (!tasks) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-700">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Mechanic Dashboard
        </h2>
        <h3 className="text-lg font-semibold text-gray-600 mb-3">
          Assigned Tasks
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="p-4">Task</th>
                <th className="p-4">Car Details</th>
                <th className="p-4">Assigned Staff</th>
                <th className="p-4">Delivery Time</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No tasks assigned yet.
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-gray-200 hover:bg-gray-100 transition"
                  >
                    <td className="p-4">{task.task}</td>
                    <td className="p-4">{task.carDetails}</td>
                    <td className="p-4">{task.assignedStaff}</td>
                    <td className="p-4">{task.deliveryTime}</td>
                    <td
                      className={`p-4 font-semibold ${
                        task.status === "Pending"
                          ? "text-yellow-600"
                          : task.status === "In Progress"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {task.status}
                    </td>
                    <td className="p-4 flex gap-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                        onClick={() => updateTaskStatus(task.id, "Completed")}
                      >
                        Complete
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                        onClick={() => updateTaskStatus(task.id, "Pending")}
                      >
                        Pending
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
