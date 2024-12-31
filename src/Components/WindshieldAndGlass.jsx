import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Windshield and Glass Component
function WindshieldAndGlass() {
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
  const [bookingConfirmed, setBookingConfirmed] = useState(false); // Track if the booking is confirmed

  // Initialize the navigate function
  const navigate = useNavigate();

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
      if (serviceType === "windshieldReplace") {
        cost = 800;
        time = "1-2 days";
      } else if (serviceType === "glassRepair") {
        cost = 400;
        time = "Same day";
      }
      setEstimate({ cost, time });
    } else {
      setEstimate({ cost: 0, time: "Please select a service" });
    }
  };

  // Handling mechanic availability based on selected date
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setBooking({ ...booking, date: selectedDate });

    // Example mechanic availability based on selected date
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

    if (mechanicsAvailability[selectedDate]) {
      setMechanics(mechanicsAvailability[selectedDate]);
      setBooking((prevBooking) => ({
        ...prevBooking,
        mechanic: "",
        time: "",
      }));
      setErrorMessage(""); // Clear error message when valid date is selected
    } else {
      setMechanics([]);
      setBooking((prevBooking) => ({
        ...prevBooking,
        mechanic: "",
        time: "",
      }));
      setErrorMessage("No mechanics available for this date. Please choose a different date.");
    }
  };

  // Handling mechanic selection
  const handleMechanicChange = (e) => {
    const selectedMechanic = e.target.value;
    setBooking({ ...booking, mechanic: selectedMechanic });
  };

  // Handling time selection
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setBooking({ ...booking, time: selectedTime });
  };

  // Handle the booking confirmation (show confirmation page)
  const confirmBooking = () => {
    setBookingConfirmed(true);
  };

  // Disable the "Confirm Booking" button if the date and time are not selected
  const isBookingDisabled = !booking.date || !booking.time;

  return (
    <div className="container">
      {/* Show confirmation page if booking is confirmed */}
      {bookingConfirmed ? (
        <div className="confirmation-page">
          <h1>Booking Confirmation</h1>
          <p><strong>Vehicle:</strong> {vehicleInfo.make} {vehicleInfo.model}</p>
          <p><strong> Date:</strong> {booking.date}</p>
          <p><strong>Contact Name:</strong> {vehicleInfo.make}</p>
          <p><strong>Contact Phone:</strong> {vehicleInfo.plate}</p>
          <p><strong>Selected Mechanic:</strong> {booking.mechanic}</p>
          <p><strong>Selected Time:</strong> {booking.time}</p>
          <button onClick={() => navigate("/paymentButton")}>Confirm Booking</button>
        </div>
      ) : (
        // Show booking form if booking is not confirmed
        <>
          <div className="service-selection">
            <h2>Select Your Windshield and Glass Service</h2>
            <select value={serviceType} onChange={handleServiceChange}>
              <option value="">--Select Service--</option>
              <option value="windshieldReplace">Windshield Replacement</option>
              <option value="glassRepair">Glass Repair</option>
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

          <div className="date-selection">
            <h2>Select Date for Booking</h2>
            <input
              type="date"
              value={booking.date}
              onChange={handleDateChange}
              required
            />
          </div>

          {mechanics.length > 0 && (
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
          )}

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

          {errorMessage && <div className="error">{errorMessage}</div>}

          <div className="booking">
            <h2>Book Your Service</h2>
            <button onClick={confirmBooking} disabled={isBookingDisabled}>
              Book Appointment
            </button>
          </div>
        </>
      )}
      <style jsx="true">{`
        .container {
          font-family: 'Roboto', sans-serif;
          background-color: #f4f4f9;
          padding: 40px;
          margin: auto;
          max-width: 900px;
          border-radius: 15px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .confirmation-page {
          text-align: center;
          padding: 20px;
          background-color: #e8f4e5;
          border-radius: 8px;
        }
        .confirmation-page button {
          padding: 12px 20px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        .confirmation-page button:hover {
          background-color: #45a049;
        }
        .error {
          color: red;
          font-size: 1.2rem;
          text-align: center;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

export default WindshieldAndGlass;
