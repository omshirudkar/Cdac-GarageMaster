import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Main Component
function DentingAndPainting() {
  const navigate = useNavigate(); // useNavigate hook for navigation

  // State Hooks for tracking form inputs
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
  const [availableMechanics, setAvailableMechanics] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  // Sample list of mechanics with their availability
  const mechanicsList = [
    {
      name: "John",
      availableDates: ["2024-12-31", "2024-01-01"],
      availableTimes: ["10:00 AM", "2:00 PM"],
    },
    {
      name: "Jane",
      availableDates: ["2024-12-31", "2024-01-02"],
      availableTimes: ["11:00 AM", "3:00 PM"],
    },
    {
      name: "Mark",
      availableDates: ["2024-12-31"],
      availableTimes: ["9:00 AM", "1:00 PM"],
    },
  ];

  // Handling form change for vehicle info
  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicleInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handling service selection
  const handleServiceChange = (e) => {
    setServiceType(e.target.value);
  };

  // Handling file upload
  const handleImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setImages(uploadedFiles);
  };

  // Handling estimate submission
  const getEstimate = () => {
    let cost;
    let time;
    if (serviceType) {
      if (serviceType === "painting") {
        cost = 500;
        time = "5-7 days";
      } else if (serviceType === "dent") {
        cost = 200;
        time = "1-3 days";
      } else if (serviceType === "touchup") {
        cost = 100;
        time = "1-2 days";
      } else {
        cost = 0;
        time = "Unknown";
      }

      setEstimate({ cost, time });
    } else {
      setEstimate({ cost: 0, time: "Please select a service" });
    }
  };

  // Fetch available mechanics based on selected date
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setBooking((prev) => ({ ...prev, date: selectedDate }));
    setAvailableMechanics([]); // Reset mechanics list
    setBooking((prev) => ({ ...prev, mechanic: "", time: "" })); // Reset mechanic and time

    const available = mechanicsList.filter((mechanic) =>
      mechanic.availableDates.includes(selectedDate)
    );

    if (available.length === 0) {
      setErrorMessage("No mechanics available on this date.");
    } else {
      setErrorMessage(""); // Clear error message
      setAvailableMechanics(available);
    }
  };

  // Handle mechanic selection
  const handleMechanicChange = (e) => {
    const selectedMechanicName = e.target.value;
    const selectedMechanic = availableMechanics.find(
      (mechanic) => mechanic.name === selectedMechanicName
    );
    setBooking((prev) => ({
      ...prev,
      mechanic: selectedMechanicName,
      time: "", // Reset time when mechanic changes
    }));
  };

  // Handle time selection
  const handleTimeChange = (e) => {
    setBooking((prev) => ({ ...prev, time: e.target.value }));
  };

  // Handle booking confirmation
  const handleBooking = (e) => {
    e.preventDefault();
    if (booking.mechanic && booking.time) {
      navigate("/paymentButton", { state: { booking } });
    }
  };

  return (
    <div className="container">
      {/* Service Selection */}
      <div className="service-selection">
        <h2>Select Your Service</h2>
        <select value={serviceType} onChange={handleServiceChange}>
          <option value="">--Select Service--</option>
          <option value="dent">Dent Removal</option>
          <option value="painting">Full Body Painting</option>
          <option value="touchup">Touch-Up Painting</option>
        </select>
        <button onClick={getEstimate}>Get Estimate</button>
      </div>

      {/* Vehicle Information Form */}
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

      {/* Image Upload Section */}
      <div className="image-upload">
        <h2>Upload Vehicle Images</h2>
        <input type="file" multiple onChange={handleImageUpload} />
      </div>

      {/* Estimate Section */}
      {estimate && (
        <div className="estimate">
          <h2>Estimated Cost & Timeline</h2>
          <p>Cost: ₹ {estimate.cost}</p>
          <p>Estimated Time: {estimate.time}</p>
        </div>
      )}

      {/* Date Selection */}
      <div className="date-selection">
        <h2>Select Service Date</h2>
        <input
          type="date"
          value={booking.date}
          onChange={handleDateChange}
          required
        />
      </div>

      {/* Error Message for No Available Mechanics */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* Available Mechanics Section */}
      {availableMechanics.length > 0 && (
        <div className="mechanics">
          <h2>Select Mechanic</h2>
          <select onChange={handleMechanicChange} value={booking.mechanic}>
            <option value="">--Select Mechanic--</option>
            {availableMechanics.map((mechanic, index) => (
              <option key={index} value={mechanic.name}>
                {mechanic.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Available Time Slots */}
      {booking.mechanic && (
        <div className="time-selection">
          <h2>Select Time Slot</h2>
          <select onChange={handleTimeChange} value={booking.time}>
            <option value="">--Select Time--</option>
            {availableMechanics
              .find((mechanic) => mechanic.name === booking.mechanic)
              ?.availableTimes.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Booking Confirmation */}
      {booking.time && (
        <div className="booking">
          <h2>Booking Confirmation</h2>
          <p>
            Mechanic: {booking.mechanic} <br />
            Date: {booking.date} <br />
            Time: {booking.time} <br />
          </p>
          <button onClick={handleBooking}>Confirm Booking</button>
        </div>
      )}

      <style jsx="true">{`
        .container {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          padding: 30px;
          margin: auto;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          max-width: 850px;
        }

        h2 {
          font-size: 1.6em;
          color: #2f4f4f;
          margin-bottom: 10px;
          text-align: center;
        }

        input[type="text"],
        input[type="number"],
        input[type="file"],
        select,
        input[type="date"],
        input[type="time"] {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 2px solid #ddd;
          border-radius: 6px;
          font-size: 1em;
          background-color: #fff;
        }

        button {
          padding: 12px 24px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.2em;
          width: 100%;
        }

        button:hover {
          background-color: #45a049;
        }

        .service-selection,
        .vehicle-info,
        .image-upload,
        .estimate,
        .date-selection,
        .mechanics,
        .time-selection,
        .booking {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
}

export default DentingAndPainting;
