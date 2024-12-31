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
    mechanic: null,
    time: "",
  });
  const [mechanics] = useState([
    { id: 1, name: "John Doe", available: ["2024-01-05 10:00", "2024-01-05 14:00"] },
    { id: 2, name: "Jane Smith", available: ["2024-01-06 09:00", "2024-01-06 13:00"] },
  ]);
  const [availableMechanics, setAvailableMechanics] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false); // Add state to track confirmation
  const [bookingDetails, setBookingDetails] = useState(null); // Store confirmed booking details

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

  const handleDateChange = (date) => {
    setBooking({ ...booking, date });
    const filteredMechanics = mechanics
      .map((mechanic) => ({
        ...mechanic,
        available: mechanic.available.filter((slot) => slot.startsWith(date)),
      }))
      .filter((mechanic) => mechanic.available.length > 0);

    if (filteredMechanics.length > 0) {
      setAvailableMechanics(filteredMechanics);
      setErrorMessage("");
    } else {
      setAvailableMechanics([]);
      setErrorMessage("No mechanics are available on the selected date.");
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const { date, mechanic, time } = booking;
    if (!date || !mechanic || !time) {
      alert("Please complete all booking details.");
      return;
    }

    // Set the booking confirmation state and details
    setBookingDetails({
      serviceType,
      vehicleInfo,
      images,
      booking,
    });
    setBookingConfirmed(true); // Confirm the booking
  };

  // Confirm booking and show the details
  const confirmBooking = () => {
    // Proceed to the next step, e.g., payment or success
   
    // Navigate or perform other actions here
    navigate("/paymentButton"); // Example: navigating to a payment page
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
            onChange={(e) => handleDateChange(e.target.value)}
            required
          />
          {errorMessage && <p className="error">{errorMessage}</p>}

          {availableMechanics.length > 0 && (
            <div className="mechanic-selection">
              <h3>Select Mechanic and Time</h3>
              {availableMechanics.map((mechanic) => (
                <div key={mechanic.id}>
                  <h4>{mechanic.name}</h4>
                  {mechanic.available.map((slot, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        id={`mechanic-${mechanic.id}-${index}`}
                        name="mechanic"
                        value={`${mechanic.name}|${slot}`}
                        onChange={() =>
                          setBooking({
                            ...booking,
                            mechanic: mechanic.name,
                            time: slot,
                          })
                        }
                      />
                      <label htmlFor={`mechanic-${mechanic.id}-${index}`}>{slot}</label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          <button type="submit">Book Appointment</button>
        </form>
      </div>

      {bookingConfirmed && (
        <div className="confirmation-page">
          <h1>Booking Confirmation</h1>
          <p><strong>Service:</strong> {bookingDetails.serviceType}</p>
          <p><strong>Vehicle:</strong> {bookingDetails.vehicleInfo.make} {bookingDetails.vehicleInfo.model}</p>
          <p><strong>License Plate:</strong> {bookingDetails.vehicleInfo.plate}</p>
          <p><strong>Selected Mechanic:</strong> {bookingDetails.booking.mechanic}</p>
          <p><strong>Selected Time:</strong> {bookingDetails.booking.time}</p>
          <button onClick={confirmBooking}>Confirm Booking</button>
        </div>
      )}
    </div>
  );
}

export default TyresAndWheels;
