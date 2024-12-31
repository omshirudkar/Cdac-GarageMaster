import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    mechanic: "",
  });
  const [mechanics, setMechanics] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const navigate = useNavigate();

  // Handling vehicle info change
  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicleInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handling service type change
  const handleServiceChange = (e) => {
    setServiceType(e.target.value);
  };

  // Handling image upload
  const handleImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setImages(uploadedFiles);
  };

  // Get the estimate based on selected service
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

  // Handling booking date change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setBooking({ ...booking, date: selectedDate });

    // Example mechanic availability for the selected date
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
      setErrorMessage(""); // Clear error message if mechanics are available
    } else {
      setMechanics([]);
      setErrorMessage("No mechanics available for this date. Please choose a different date.");
    }
  };

  // Handling mechanic selection
  const handleMechanicChange = (e) => {
    const selectedMechanic = e.target.value;
    setBooking({ ...booking, mechanic: selectedMechanic, time: "" }); // Clear the time when a new mechanic is selected
  };

  // Handling time slot selection
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setBooking({ ...booking, time: selectedTime });
  };

  // Handle booking confirmation
  const handleBooking = (e) => {
    e.preventDefault();
    if (!booking.date || !booking.time || !booking.mechanic) {
      setErrorMessage("Please fill in all the details (Date, Mechanic, and Time).");
    } else {
      setBookingConfirmed(true);
    }
  };

  const isBookingReady = booking.date && booking.time && booking.mechanic; // Check if the booking is ready

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

          <div className="date-selection">
            <h2>Select Date for Booking</h2>
            <input
              type="date"
              value={booking.date}
              onChange={handleDateChange}
              required
            />
          </div>

          {errorMessage && <div className="error">{errorMessage}</div>}

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

          {isBookingReady && (
            <div className="booking">
              <h2>Book Your Service</h2>
              <button onClick={handleBooking}>Book Appointment</button>
            </div>
          )}
        </>
      )}
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

export default LightsAndFitments;
