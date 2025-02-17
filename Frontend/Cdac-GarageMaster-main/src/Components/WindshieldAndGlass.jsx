import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function WindshieldAndGlass() {
  const [serviceType, setServiceType] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState({
    make: "",
    model: "",
    year: "",
    plate: "",
  });
  const [images, setImages] = useState([]);
  const [estimate, setEstimate] = useState(null);
  const [booking, setBooking] = useState({ date: "", time: "", mechanic: "" });
  const [mechanics, setMechanics] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const navigate = useNavigate();

  const handleVehicleChange = (e) => {
    setVehicleInfo({ ...vehicleInfo, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (e) => {
    setServiceType(e.target.value);
  };

  const handleImageUpload = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const getEstimate = () => {
    if (serviceType === "windshieldReplace") {
      setEstimate({ cost: 800, time: "1-2 days" });
    } else if (serviceType === "glassRepair") {
      setEstimate({ cost: 400, time: "Same day" });
    } else {
      setEstimate(null);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setBooking({ ...booking, date: selectedDate });
  };

  const confirmBooking = () => {
    setBookingConfirmed(true);
  };

  return (
    <div className="container">
      {bookingConfirmed ? (
        <div className="confirmation-page">
          <h1>Booking Confirmed!</h1>
          <p><strong>Service:</strong> {serviceType}</p>
          <p><strong>Vehicle:</strong> {vehicleInfo.make} {vehicleInfo.model}</p>
          <p><strong>Mechanic:</strong> {booking.mechanic}</p>
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <button onClick={() => navigate("/paymentButton")}>Proceed to Payment</button>
        </div>
      ) : (
        <div className="form-container">
          <h2>Windshield and Glass Service</h2>
          <label>Select Service:</label>
          <select value={serviceType} onChange={handleServiceChange}>
            <option value="">-- Choose --</option>
            <option value="windshieldReplace">Windshield Replacement</option>
            <option value="glassRepair">Glass Repair</option>
          </select>
          <button onClick={getEstimate}>Get Estimate</button>
          {estimate && <p>Estimated Cost: ₹{estimate.cost}, Time: {estimate.time}</p>}

          <label>Vehicle Details:</label>
          <input type="text" name="make" placeholder="Make" value={vehicleInfo.make} onChange={handleVehicleChange} />
          <input type="text" name="model" placeholder="Model" value={vehicleInfo.model} onChange={handleVehicleChange} />
          <input type="number" name="year" placeholder="Year" value={vehicleInfo.year} onChange={handleVehicleChange} />
          <input type="text" name="plate" placeholder="License Plate" value={vehicleInfo.plate} onChange={handleVehicleChange} />
          
          <label>Upload Images:</label>
          <input type="file" multiple onChange={handleImageUpload} />

          <label>Select Date:</label>
          <input type="date" value={booking.date} onChange={handleDateChange} />

          <button onClick={confirmBooking} disabled={!booking.date}>Book Now</button>
        </div>
      )}

      <style jsx>{`
        .container {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: auto;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        label {
          font-weight: bold;
        }
        input, select, button {
          padding: 10px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        button {
          background-color: #007bff;
          color: white;
          cursor: pointer;
          border: none;
          transition: 0.3s;
        }
        button:hover {
          background-color: #0056b3;
        }
        .confirmation-page {
          text-align: center;
          background: #e3f2fd;
          padding: 20px;
          border-radius: 8px;
        }
        .confirmation-page button {
          margin-top: 15px;
          background-color: #28a745;
        }
        .confirmation-page button:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
}

export default WindshieldAndGlass;
