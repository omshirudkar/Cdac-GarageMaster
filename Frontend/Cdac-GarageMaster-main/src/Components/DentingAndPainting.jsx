import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DentingAndPainting() {
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState({ make: "", model: "", year: "", plate: "" });
  const [images, setImages] = useState([]);
  const [estimate, setEstimate] = useState(null);
  const [booking, setBooking] = useState({ date: "", time: "", mechanic: "" });
  const [availableMechanics, setAvailableMechanics] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const mechanicsList = [
    { name: "John", availableDates: ["2024-12-31", "2024-01-01"], availableTimes: ["10:00 AM", "2:00 PM"] },
    { name: "Jane", availableDates: ["2024-12-31", "2024-01-02"], availableTimes: ["11:00 AM", "3:00 PM"] },
    { name: "Mark", availableDates: ["2024-12-31"], availableTimes: ["9:00 AM", "1:00 PM"] },
  ];

  const handleVehicleChange = (e) => setVehicleInfo({ ...vehicleInfo, [e.target.name]: e.target.value });
  const handleServiceChange = (e) => setServiceType(e.target.value);
  const handleImageUpload = (e) => setImages(Array.from(e.target.files));

  const getEstimate = () => {
    const estimates = { painting: { cost: 500, time: "5-7 days" }, dent: { cost: 200, time: "1-3 days" }, touchup: { cost: 100, time: "1-2 days" } };
    setEstimate(estimates[serviceType] || { cost: 0, time: "Please select a service" });
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setBooking({ date: selectedDate, time: "", mechanic: "" });
    const available = mechanicsList.filter((m) => m.availableDates.includes(selectedDate));
    setAvailableMechanics(available);
    setErrorMessage(available.length ? "" : "No mechanics available on this date.");
  };

  const handleMechanicChange = (e) => {
    setBooking({ ...booking, mechanic: e.target.value, time: "" });
  };

  const handleTimeChange = (e) => setBooking({ ...booking, time: e.target.value });

  const handleBooking = (e) => {
    e.preventDefault();
    if (booking.mechanic && booking.time) navigate("/paymentButton", { state: { booking } });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Select Your Service</h2>
      <select style={styles.input} value={serviceType} onChange={handleServiceChange}>
        <option value="">--Select Service--</option>
        <option value="dent">Dent Removal</option>
        <option value="painting">Full Body Painting</option>
        <option value="touchup">Touch-Up Painting</option>
      </select>
      <button style={styles.button} onClick={getEstimate}>Get Estimate</button>

      <h2 style={styles.heading}>Vehicle Information</h2>
      <input style={styles.input} type="text" name="make" placeholder="Car Company" value={vehicleInfo.make} onChange={handleVehicleChange} />
      <input style={styles.input} type="text" name="model" placeholder="Car Model" value={vehicleInfo.model} onChange={handleVehicleChange} />
      <input style={styles.input} type="number" name="year" placeholder="Car Year" value={vehicleInfo.year} onChange={handleVehicleChange} />
      <input style={styles.input} type="text" name="plate" placeholder="License Plate" value={vehicleInfo.plate} onChange={handleVehicleChange} />

      <h2 style={styles.heading}>Upload Vehicle Images</h2>
      <input style={styles.fileInput} type="file" multiple onChange={handleImageUpload} />

      {estimate && (
        <div style={styles.estimateBox}>
          <h2>Estimated Cost & Timeline</h2>
          <p>Cost: ₹ {estimate.cost}</p>
          <p>Estimated Time: {estimate.time}</p>
        </div>
      )}

      <h2 style={styles.heading}>Select Service Date</h2>
      <input style={styles.input} type="date" value={booking.date} onChange={handleDateChange} required />
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}

      {availableMechanics.length > 0 && (
        <div>
          <h2 style={styles.heading}>Select Mechanic</h2>
          <select style={styles.input} onChange={handleMechanicChange} value={booking.mechanic}>
            <option value="">--Select Mechanic--</option>
            {availableMechanics.map((m, i) => (
              <option key={i} value={m.name}>{m.name}</option>
            ))}
          </select>
        </div>
      )}

      {booking.mechanic && (
        <div>
          <h2 style={styles.heading}>Select Time Slot</h2>
          <select style={styles.input} onChange={handleTimeChange} value={booking.time}>
            <option value="">--Select Time--</option>
            {availableMechanics.find((m) => m.name === booking.mechanic)?.availableTimes.map((time, i) => (
              <option key={i} value={time}>{time}</option>
            ))}
          </select>
        </div>
      )}

      {booking.time && (
        <div style={styles.confirmationBox}>
          <h2>Booking Confirmation</h2>
          <p>Mechanic: {booking.mechanic} <br /> Date: {booking.date} <br /> Time: {booking.time}</p>
          <button style={styles.button} onClick={handleBooking}>Confirm Booking</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "50%",
    margin: "auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  heading: {
    color: "#333",
    marginBottom: "10px",
  },
  input: {
    width: "90%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  fileInput: {
    margin: "10px 0",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    marginTop: "10px",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  estimateBox: {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "5px",
    marginTop: "10px",
  },
  confirmationBox: {
    marginTop: "15px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#e9ecef",
  },
  error: {
    color: "red",
  },
};

export default DentingAndPainting;
