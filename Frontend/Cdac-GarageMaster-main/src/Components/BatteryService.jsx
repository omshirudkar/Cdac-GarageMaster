import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BatteryService() {
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState({
    make: "",
    model: "",
    year: "",
    plate: "",
  });
  const [estimate, setEstimate] = useState(null);
  const [error, setError] = useState("");

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicleInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e) => {
    setServiceType(e.target.value);
    setError("");
  };

  const getEstimate = () => {
    if (!serviceType) {
      setError("Please select a service type!");
      return;
    }
    let cost = serviceType === "basic" ? 1000 : 2000;
    let time = serviceType === "basic" ? "1-2 hours" : "2-3 hours";
    setEstimate({ cost, time });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!serviceType || !vehicleInfo.make || !vehicleInfo.model || !vehicleInfo.year || !vehicleInfo.plate) {
      setError("Please fill out all fields before booking!");
      return;
    }
    navigate("/paymentButton");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔋 Battery Service Booking</h2>
      
      {error && <p style={styles.error}>{error}</p>}

      {/* Service Selection */}
      <div style={styles.card}>
        <label style={styles.label}>Select Service Type:</label>
        <select value={serviceType} onChange={handleServiceChange} style={styles.input}>
          <option value="">-- Choose Service --</option>
          <option value="basic">Basic Service</option>
          <option value="advanced">Advanced Service</option>
        </select>
        <button onClick={getEstimate} style={styles.button}>Get Estimate</button>
        {estimate && (
          <p style={styles.estimate}>💰 Cost: ₹{estimate.cost} | ⏳ Time: {estimate.time}</p>
        )}
      </div>

      {/* Vehicle Information */}
      <form onSubmit={handleBooking}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🚗 Vehicle Information</h3>
          <input type="text" name="make" value={vehicleInfo.make} placeholder="Car Make" style={styles.input} onChange={handleVehicleChange} />
          <input type="text" name="model" value={vehicleInfo.model} placeholder="Car Model" style={styles.input} onChange={handleVehicleChange} />
          <input type="number" name="year" value={vehicleInfo.year} placeholder="Year" style={styles.input} onChange={handleVehicleChange} />
          <input type="text" name="plate" value={vehicleInfo.plate} placeholder="License Plate" style={styles.input} onChange={handleVehicleChange} />
        </div>

        {/* Confirm Button */}
        <button type="submit" style={styles.button}>
          ✅ Confirm Booking
        </button>
      </form>
    </div>
  );
}

// 🎨 Internal CSS Styling
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    margin: "15px auto",
    width: "90%",
    maxWidth: "400px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "left",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#444",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#ff9800",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },
  estimate: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#555",
    marginTop: "10px",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    marginBottom: "10px",
  },
};

export default BatteryService;
