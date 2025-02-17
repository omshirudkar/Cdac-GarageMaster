import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing

export default function CustomerList() {
    const [customers, setCustomers] = useState([
        { name: "Alice Brown", email: "alice@example.com", status: "Active" },
        { name: "Bob Green", email: "bob@example.com", status: "Inactive" },
        { name: "Charlie White", email: "charlie@example.com", status: "Active" },
    ]);
    const [showForm, setShowForm] = useState(false); // To toggle the form visibility
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        email: "",
        status: "Active",
    });

    const deleteCustomer = (index) => {
        const updatedCustomers = customers.filter((_, i) => i !== index);
        setCustomers(updatedCustomers);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer({ ...newCustomer, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!newCustomer.name || !newCustomer.email) {
            alert("Please fill in all fields.");
            return;
        }
        setCustomers([...customers, newCustomer]);
        setNewCustomer({ name: "", email: "", status: "Active" });
        setShowForm(false); // Hide form after adding customer
    };

    return (
        <div style={styles.container}>
            <h2>Customer Management</h2>

            {/* Centered "Add New Customer" Button */}
            <div style={styles.addButtonContainer}>
                <button
                    className="btn btn-primary mb-3"
                    onClick={() => setShowForm(true)} // Show form on button click
                    style={styles.addButton}
                >
                    Add New Customer
                </button>
            </div>

            {/* Show form if showForm is true */}
            {showForm && (
                <form onSubmit={handleFormSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={newCustomer.name}
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={newCustomer.email}
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label>Status</label>
                        <select
                            name="status"
                            value={newCustomer.status}
                            onChange={handleInputChange}
                            style={styles.input}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Button container to align "Add Customer" and "Cancel" button */}
                    <div style={styles.buttonGroup}>
                        <button type="submit" style={styles.submitButton}>
                            Add Customer
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)} // Hide form on cancel
                            style={styles.cancelButton}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Customer Table */}
            <table className="table table-bordered" style={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.status}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteCustomer(index)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Centered Back to Dashboard Button */}
            <div style={styles.buttonContainer}>
                <Link to="/admin-dashboard" className="btn btn-primary">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
    },
    table: {
        width: "100%",
        marginTop: "20px",
    },
    addButtonContainer: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
    },
    addButton: {
        width: "100%",
        maxWidth: "250px",
        padding: "12px 0",
        backgroundColor: "#3b82f6",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginBottom: "20px",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        padding: "8px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
    submitButton: {
        padding: "12px 0",
        backgroundColor: "#388e3c", // Dark green for Add Customer
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
    },
    cancelButton: {
        padding: "12px 0",
        backgroundColor: "#9e9e9e", // Grey for Cancel
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "flex-start", // Align buttons to the left
        gap: "10px", // Add space between buttons
    },
    buttonContainer: {
        marginTop: "auto",
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
    },
};
