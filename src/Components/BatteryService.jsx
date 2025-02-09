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
  const [images, setImages] = useState([]);
  const [estimate, setEstimate] = useState(null);
  const [booking, setBooking] = useState({
    date: "",
    time: "",
    mechanic: "",
  });
  const [availability, setAvailability] = useState([]);

  const mechanicAvailability = {
    "2024-01-01": [
      { time: "09:00 AM", mechanic: "John Doe" },
      { time: "11:00 AM", mechanic: "Jane Smith" },
      { time: "02:00 PM", mechanic: "Mike Johnson" },
    ],
    "2024-01-02": [
      { time: "10:00 AM", mechanic: "Sarah Lee" },
      { time: "01:00 PM", mechanic: "David Brown" },
      { time: "03:30 PM", mechanic: "Emily Davis" },
    ],
  };

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicleInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e) => {
    setServiceType(e.target.value);
  };

  const getEstimate = () => {
    let cost = serviceType === "basic" ? 1000 : 2000;
    let time = serviceType === "basic" ? "1-2 hours" : "2-3 hours";
    setEstimate({ cost, time });
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setBooking((prev) => ({ ...prev, date: selectedDate }));
    setAvailability(mechanicAvailability[selectedDate] || []);
  };

  const handleTimeSelect = (slot) => {
    setBooking({
      date: booking.date,
      time: slot.time,
      mechanic: slot.mechanic,
    });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    navigate("/paymentButton");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Battery Service Booking</h2>
      <div style={styles.card}>
        <label>Service Type:</label>
        <select
          value={serviceType}
          onChange={handleServiceChange}
          style={styles.input}
        >
          <option value="">--Select Service--</option>
          <option value="basic">Basic Service</option>
          <option value="advanced">Advanced Service</option>
        </select>
        <button onClick={getEstimate} style={styles.button}>
          Get Estimate
        </button>
        {estimate && (
          <p style={styles.estimate}>
            Estimated Cost: ₹{estimate.cost} | Time: {estimate.time}
          </p>
        )}
      </div>

      <div style={styles.card}>
        <h3>Vehicle Information</h3>
        <input
          type="text"
          name="make"
          placeholder="Car Make"
          style={styles.input}
          onChange={handleVehicleChange}
        />
        <input
          type="text"
          name="model"
          placeholder="Car Model"
          style={styles.input}
          onChange={handleVehicleChange}
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          style={styles.input}
          onChange={handleVehicleChange}
        />
        <input
          type="text"
          name="plate"
          placeholder="License Plate"
          style={styles.input}
          onChange={handleVehicleChange}
        />
      </div>

      <div style={styles.card}>
        <h3>Choose Date & Time</h3>
        <input type="date" style={styles.input} onChange={handleDateChange} />
        {availability.length > 0 && (
          <div>
            {availability.map((slot, index) => (
              <button
                key={index}
                style={styles.slotButton}
                onClick={() => handleTimeSelect(slot)}
              >
                {slot.time} - {slot.mechanic}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleBooking}
        style={styles.button}
        disabled={!booking.time}
      >
        Confirm Booking
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  title: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
  card: {
    backgroundColor: "white",
    padding: "20px",
    margin: "10px auto",
    width: "90%",
    maxWidth: "400px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    backgroundColor: "#ff9800",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
  slotButton: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "8px",
    margin: "5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  estimate: { fontSize: "16px", fontWeight: "bold", color: "#333" },
};

export default BatteryService;
