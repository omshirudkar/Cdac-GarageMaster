import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomServices() {
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

  const navigate = useNavigate();

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
      let cost, time;
      if (serviceType === "customization") {
        cost = 700;
        time = "7-10 days";
      } else if (serviceType === "wrap") {
        cost = 400;
        time = "3-5 days";
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
    const isValid =
      booking.date &&
      booking.time &&
      serviceType &&
      vehicleInfo.make &&
      vehicleInfo.model;

    if (isValid) {
      navigate("/paymentButton"); // Navigate to the payment page
    } else {
      alert("Please fill out all required fields before proceeding to payment.");
    }
  };

  return (
    <div className="container">
      <div className="service-selection">
        <h2>Select Your Custom Service</h2>
        <select value={serviceType} onChange={handleServiceChange}>
          <option value="">--Select Service--</option>
          <option value="customization">Vehicle Customization</option>
          <option value="wrap">Vehicle Wrap</option>
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
            onChange={(e) =>
              setBooking({ ...booking, date: e.target.value })
            }
            required
          />
          <input
            type="time"
            value={booking.time}
            onChange={(e) =>
              setBooking({ ...booking, time: e.target.value })
            }
            required
          />
          <button type="submit">Confirm Booking</button>
        </form>
      </div>

      <style jsx="true">{`
        .container {
          width: 80%;
          margin: 0 auto;
          font-family: Arial, sans-serif;
        }

        .service-selection,
        .vehicle-info,
        .image-upload,
        .estimate,
        .booking {
          margin-bottom: 20px;
        }

        h2 {
          font-size: 1.8em;
          margin-bottom: 10px;
        }

        input[type="text"],
        input[type="number"],
        input[type="date"],
        input[type="time"],
        select {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #45a049;
        }

        .estimate p {
          font-size: 1.2em;
          color: #555;
        }
      `}</style>
    </div>
  );
}

export default CustomServices;
