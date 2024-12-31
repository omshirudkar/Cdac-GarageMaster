import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function StaffList() {
  const [staff, setStaff] = useState([
    { name: "John Doe", role: "Manager", status: "Active" },
    { name: "Jane Smith", role: "Mechanic", status: "Active" },
    { name: "Mark Wilson", role: "Assistant", status: "Inactive" },
  ]);

  const deleteStaff = (index) => {
    const updatedStaff = staff.filter((_, i) => i !== index);
    setStaff(updatedStaff);
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <h2>Staff Management</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => alert("Add Staff")}
      >
        Add New Staff
      </button>
      <table className="table table-bordered" style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member, index) => (
            <tr key={index}>
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
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  table: {
    width: "100%",
    marginTop: "20px",
  },
};
