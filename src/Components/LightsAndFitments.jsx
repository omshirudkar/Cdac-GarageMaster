import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for React Router

function LightsAndFitments() {
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
  });

  const navigate = useNavigate(); // Initialize navigate hook

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicleInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e) => {
    setServiceType(e.target.value);
  };

  const handleImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setImages(uploadedFiles);
  };

  const getEstimate = () => {
    if (serviceType) {
      let cost;
      let time;
      if (serviceType === "led") {
        cost = 1500;
        time = "1-2 days";
      } else if (serviceType === "foglights") {
        cost = 1200;
        time = "1 day";
      } else if (serviceType === "headlamps") {
        cost = 2000;
        time = "2-3 days";
      } else {
        cost = 0;
        time = "Unknown";
      }
      setEstimate({ cost, time });
    } else {
      setEstimate({ cost: 0, time: "Please select a service" });
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    // alert("Booking confirmed!");
    // Navigate to the payment gateway
    navigate("/paymentButton");
  };

  return (
    <div className="container">
      <div className="service-selection">
        <h2>Select Your Lighting & Fitments Service</h2>
        <select value={serviceType} onChange={handleServiceChange}>
          <option value="">--Select Service--</option>
          <option value="led">LED Light Installation</option>
          <option value="foglights">Fog Light Installation</option>
          <option value="headlamps">Headlamp Replacement</option>
        </select>
        <button onClick={getEstimate}>Get Estimate</button>
      </div>

      <div className="vehicle-info">
        <h2>Vehicle Information</h2>
        <input
          type="text"
          name="make"
          placeholder="Car Company"
          value={vehicleInfo.make}
          onChange={handleVehicleChange}
        />
        <input
          type="text"
          name="model"
          placeholder="Car Model"
          value={vehicleInfo.model}
          onChange={handleVehicleChange}
        />
        <input
          type="number"
          name="year"
          placeholder="Car Year"
          value={vehicleInfo.year}
          onChange={handleVehicleChange}
        />
        <input
          type="text"
          name="plate"
          placeholder="License Plate"
          value={vehicleInfo.plate}
          onChange={handleVehicleChange}
        />
      </div>

      <div className="image-upload">
        <h2>Upload Vehicle Images</h2>
        <input type="file" multiple onChange={handleImageUpload} />
      </div>

      {estimate && (
        <div className="estimate">
          <h2>Estimated Cost & Timeline</h2>
          <p>Cost: ₹ {estimate.cost}</p>
          <p>Estimated Time: {estimate.time}</p>
        </div>
      )}

      <div className="booking">
        <h2>Book Your Service</h2>
        <form onSubmit={handleBooking}>
          <input
            type="date"
            value={booking.date}
            onChange={(e) => setBooking({ ...booking, date: e.target.value })}
            required
          />
          <input
            type="time"
            value={booking.time}
            onChange={(e) => setBooking({ ...booking, time: e.target.value })}
            required
          />
          <button type="submit">Confirm Booking</button>
        </form>
      </div>

      <style jsx="true">{`
        .container {
          font-family: Arial, sans-serif;
          padding: 20px;
          max-width: 800px;
          margin: auto;
          background-color: #f4f4f4;
          border-radius: 8px;
        }
        .service-selection,
        .vehicle-info,
        .image-upload,
        .estimate,
        .booking {
          margin-bottom: 20px;
        }
        h2 {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }
        select,
        input,
        button {
          width: 100%;
          padding: 10px;
          margin: 5px 0;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        button {
          background-color: #28a745;
          color: white;
          font-size: 1rem;
          cursor: pointer;
        }
        button:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
}

export default LightsAndFitments;
