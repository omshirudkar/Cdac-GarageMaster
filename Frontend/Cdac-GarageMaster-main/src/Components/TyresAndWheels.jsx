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
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

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

    setAvailableMechanics(filteredMechanics.length > 0 ? filteredMechanics : []);
    setErrorMessage(filteredMechanics.length > 0 ? "" : "No mechanics available on this date.");
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const { date, mechanic, time } = booking;
    if (!date || !mechanic || !time) {
      alert("Please complete all booking details.");
      return;
    }
    setBookingDetails({ serviceType, vehicleInfo, images, booking });
    setBookingConfirmed(true);
  };

  const confirmBooking = () => {
    navigate("/paymentButton");
  };

  return (
    <div className="container">
      <style>{`
        .container { max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; }
        h1, h2 { text-align: center; color: #333; }
        .service-selection, .vehicle-info, .image-upload, .estimate, .booking, .confirmation-page {
          background: #f8f8f8; padding: 15px; margin: 10px 0; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }
        input, select, button { width: 100%; padding: 10px; margin: 5px 0; border-radius: 5px; border: 1px solid #ccc; }
        button { background: #007BFF; color: white; font-size: 16px; border: none; cursor: pointer; }
        button:hover { background: #0056b3; }
        .error { color: red; font-weight: bold; text-align: center; }
      `}</style>
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
        <input type="text" name="make" placeholder="Car Make" value={vehicleInfo.make} onChange={handleVehicleChange} />
        <input type="text" name="model" placeholder="Car Model" value={vehicleInfo.model} onChange={handleVehicleChange} />
        <input type="number" name="year" placeholder="Car Year" value={vehicleInfo.year} onChange={handleVehicleChange} />
        <input type="text" name="plate" placeholder="License Plate" value={vehicleInfo.plate} onChange={handleVehicleChange} />
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
        <input type="date" value={booking.date} onChange={(e) => handleDateChange(e.target.value)} required />
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button onClick={handleBooking}>Book Appointment</button>
      </div>

      {bookingConfirmed && (
        <div className="confirmation-page">
          <h1>Booking Confirmation</h1>
          <button onClick={confirmBooking}>Confirm Booking</button>
        </div>
      )}
    </div>
  );
}

export default TyresAndWheels;
