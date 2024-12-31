import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

// Car Wash Component
function CarWash() {
  const navigate = useNavigate(); // Initialize the navigate hook

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
  const [mechanics, setMechanics] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Available mechanics for different dates
  const mechanicsAvailability = {
    "2024-12-31": [
      { name: "John", timeSlots: ["10:00 AM", "2:00 PM"] },
      { name: "Alice", timeSlots: ["9:00 AM", "1:00 PM"] },
    ],
    "2024-01-01": [
      { name: "Tom", timeSlots: ["10:00 AM", "1:00 PM"] },
      { name: "Jane", timeSlots: ["11:00 AM", "3:00 PM"] },
    ],
  };

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
    if (serviceType) {
      let cost;
      let time;
      // Estimate based on selected service
      if (serviceType === "basic") {
        cost = 300;
        time = "1-2 hours";
      } else if (serviceType === "premium") {
        cost = 600;
        time = "2-3 hours";
      } else if (serviceType === "deluxe") {
        cost = 1000;
        time = "3-4 hours";
      } else {
        cost = 0;
        time = "Unknown";
      }

      // Update state for estimate
      setEstimate({ cost, time });
    } else {
      setEstimate({ cost: 0, time: "Please select a service" });
    }
  };

  // Handling booking form submission
  const handleBooking = (e) => {
    e.preventDefault();
    if (!booking.date || !booking.time || !booking.mechanic) {
      setErrorMessage("Please fill in all the details (Date, Mechanic, and Time).");
    } else {
      setBookingConfirmed(true);
    }
  };

  // Handling date change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setBooking({ ...booking, date: selectedDate, mechanic: "", time: "" }); // Reset mechanic and time
    setErrorMessage(""); // Clear any previous error message

    if (mechanicsAvailability[selectedDate]) {
      setMechanics(mechanicsAvailability[selectedDate]);
    } else {
      setMechanics([]);
      setErrorMessage("No mechanics available for this date. Please choose a different date.");
    }
  };

  // Handling mechanic change
  const handleMechanicChange = (e) => {
    const selectedMechanic = e.target.value;
    setBooking({ ...booking, mechanic: selectedMechanic, time: "" }); // Reset time when mechanic is changed
  };

  // Handling time change
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setBooking({ ...booking, time: selectedTime });
  };

  // Check if booking is ready
  const isBookingReady = booking.date && booking.time && booking.mechanic;

  return (
    <div className="container">
      {bookingConfirmed ? (
        <div className="confirmation-page">
          <h1>Booking Confirmation</h1>
          <p><strong>Vehicle:</strong> {vehicleInfo.make} {vehicleInfo.model}</p>
          <p><strong>Booking Date:</strong> {booking.date}</p>
          <p><strong>Selected Mechanic:</strong> {booking.mechanic}</p>
          <p><strong>Selected Time:</strong> {booking.time}</p>
          <button onClick={() => navigate("/paymentButton")}>Proceed to Payment</button>
        </div>
      ) : (
        <>
          {/* Service Selection */}
          <div className="service-selection">
            <h2>Select Your Car Wash Service</h2>
            <select value={serviceType} onChange={handleServiceChange}>
              <option value="">--Select Service--</option>
              <option value="basic">Basic Wash</option>
              <option value="premium">Premium Wash</option>
              <option value="deluxe">Deluxe Wash</option>
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
            <h2>Select Date for Booking</h2>
            <input
              type="date"
              value={booking.date}
              onChange={handleDateChange}
              required
            />
          </div>

          {/* Error Message */}
          {errorMessage && <div className="error">{errorMessage}</div>}

          {/* Mechanic and Time Selection */}
          {mechanics.length > 0 && (
            <>
              <div className="mechanic-selection">
                <h2>Select Mechanic</h2>
                <select value={booking.mechanic} onChange={handleMechanicChange}>
                  <option value="">--Select Mechanic--</option>
                  {mechanics.map((mechanic, index) => (
                    <option key={index} value={mechanic.name}>
                      {mechanic.name}
                    </option>
                  ))}
                </select>
              </div>

              {booking.mechanic && (
                <div className="time-selection">
                  <h2>Select Time</h2>
                  <select value={booking.time} onChange={handleTimeChange}>
                    <option value="">--Select Time--</option>
                    {mechanics
                      .find((m) => m.name === booking.mechanic)
                      ?.timeSlots.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </>
          )}

          {/* Booking Confirmation */}
          {isBookingReady && (
            <div className="booking">
              <h2>Book Your Service</h2>
              <button onClick={handleBooking}>Confirm Booking</button>
            </div>
          )}
        </>
      )}
      <style jsx="true">{`
        .container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px;
          background-color: #f0f0f0;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          max-width: 950px;
          margin: 30px auto;
          overflow: hidden;
        }

        .service-selection,
        .vehicle-info,
        .image-upload,
        .estimate,
        .booking,
        .mechanic-selection,
        .time-selection {
          background-color: #ffffff;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          margin-bottom: 25px;
        }

        .service-selection h2,
        .vehicle-info h2,
        .estimate h2,
        .booking h2,
        .mechanic-selection h2,
        .time-selection h2 {
          font-size: 1.8rem;
          color: #333;
          margin-bottom: 15px;
          font-weight: bold;
        }

        select,
        button {
          width: 100%;
          padding: 12px;
          margin-top: 8px;
          border-radius: 5px;
          font-size: 1rem;
        }

        select {
          border: 1px solid #ddd;
          background-color: #f9f9f9;
        }

        button {
          background-color: #4CAF50;
          color: white;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-size: 1rem;
          margin-top: 15px;
        }

        button:hover {
          background-color: #45a049;
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
          border-radius: 5px;
          border: 1px solid #ddd;
          font-size: 1rem;
          background-color: #f9f9f9;
        }

        input[type="file"] {
          background-color: #fff;
          padding: 5px;
        }

        input[type="date"],
        input[type="time"] {
          background-color: #fff;
        }

        .error {
          color: red;
          font-size: 1.2rem;
          margin-top: 20px;
        }

        .confirmation-page {
          font-size: 1.5rem;
          font-weight: bold;
          color: green;
        }
      `}</style>
    </div>
  );
}

export default CarWash;
