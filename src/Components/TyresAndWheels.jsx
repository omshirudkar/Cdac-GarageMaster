import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TyresAndWheels() {
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
  });

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
      if (serviceType === "tyreChange") {
        cost = 300;
        time = "1-2 hours";
      } else if (serviceType === "wheelAlignment") {
        cost = 150;
        time = "1 hour";
      } else {
        cost = 0;
        time = "Unknown";
      }

      setEstimate({ cost, time });
    } else {
      alert("Please select a service type.");
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!booking.date || !booking.time) {
      alert("Please select a date and time for the booking.");
      return;
    }

    // alert("Booking confirmed!");
    navigate("/paymentButton");
  };

  return (
    <div className="container">
      <h1>Tyres and Wheels Service</h1>

      <div className="service-selection">
        <h2>Select Service</h2>
        <select value={serviceType} onChange={handleServiceChange}>
          <option value="">-- Select Service --</option>
          <option value="tyreChange">Tyre Change</option>
          <option value="wheelAlignment">Wheel Alignment</option>
        </select>
        <button onClick={getEstimate}>Get Estimate</button>
      </div>

      <div className="vehicle-info">
        <h2>Vehicle Information</h2>
        <input
          type="text"
          name="make"
          placeholder="Car Make"
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
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
      </div>

      {estimate && (
        <div className="estimate">
          <h2>Estimated Cost and Time</h2>
          <p>Cost: ₹ {estimate.cost}</p>
          <p>Time: {estimate.time}</p>
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
          max-width: 600px;
          margin: auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1, h2 {
          text-align: center;
        }
        input, select, button {
          display: block;
          width: 100%;
          margin: 10px 0;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        button {
          background-color: #4caf50;
          color: white;
          font-size: 1rem;
          cursor: pointer;
        }
        button:hover {
          background-color: #45a049;
        }
        .estimate {
          margin-top: 20px;
          padding: 15px;
          background-color: #e8f5e9;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}

export default TyresAndWheels;
