import React from "react";

export default function AdminHeader() {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <h2>Garage Admin</h2>
      </div>
      <div style={styles.user}>
        <span>Welcome, Admin</span>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    color: "white",
    padding: "10px 20px",
  },
  logo: {
    fontSize: "20px",
  },
  user: {
    fontSize: "14px",
  },
  logoutBtn: {
    marginLeft: "10px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};
