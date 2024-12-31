import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Engine Oil", stock: 10 },
    { id: 2, name: "Brake Pads", stock: 20 },
    { id: 3, name: "Tires", stock: 15 },
  ]);
  const [inventoryItem, setInventoryItem] = useState("");
  const [inventoryQuantity, setInventoryQuantity] = useState(0);

  // Add new inventory item
  const addInventoryItem = () => {
    if (!inventoryItem || !inventoryQuantity) {
      alert("Please enter item name and quantity.");
      return;
    }

    const newItem = {
      id: inventory.length + 1,
      name: inventoryItem,
      stock: inventoryQuantity,
    };

    setInventory([...inventory, newItem]); // Add new inventory item
    alert(`${inventoryItem} added to inventory with ${inventoryQuantity} items.`);

    // Clear the input fields
    setInventoryItem("");
    setInventoryQuantity(0);
  };

  // Update stock for an existing inventory item
  const updateInventoryStock = (itemId, quantity) => {
    const updatedInventory = inventory.map((item) =>
      item.id === itemId ? { ...item, stock: item.stock + quantity } : item
    );
    setInventory(updatedInventory);
    alert(`Stock updated for ${quantity > 0 ? "adding" : "removing"} ${Math.abs(quantity)} ${inventoryItem}`);
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Inventory Management</h2>

      {/* Add Inventory Form */}
      <div style={styles.formWrapper}>
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Item Name</label>
            <input
              type="text"
              value={inventoryItem}
              onChange={(e) => setInventoryItem(e.target.value)}
              placeholder="Enter item name"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Quantity</label>
            <input
              type="number"
              value={inventoryQuantity}
              onChange={(e) => setInventoryQuantity(Number(e.target.value))}
              placeholder="Enter quantity"
              style={styles.input}
            />
          </div>

          <button onClick={addInventoryItem} style={styles.addButton}>
            Add Item to Inventory
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <h3 style={styles.heading}>Current Inventory</h3>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length === 0 ? (
              <tr>
                <td colSpan="3" style={styles.noData}>
                  No items in inventory.
                </td>
              </tr>
            ) : (
              inventory.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.stock}</td>
                  <td>
                    <button
                      onClick={() => updateInventoryStock(item.id, 1)}
                      style={styles.updateButton}
                    >
                      Add Stock
                    </button>
                    <button
                      onClick={() => updateInventoryStock(item.id, -1)}
                      style={styles.updateButton}
                    >
                      Remove Stock
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Back to Dashboard Button */}
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
  addButton: {
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
  updateButton: {
    backgroundColor: "#28a745", // Green color for stock update buttons
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
    marginRight: "10px", // Space between buttons
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
