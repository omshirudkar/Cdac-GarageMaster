import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BatteryService() {
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
    mechanic: "",
  });
  const [availability, setAvailability] = useState([]);

  const mechanicAvailability = {
    "2024-01-01": [
      { time: "09:00 AM", mechanic: "John Doe" },
      { time: "11:00 AM", mechanic: "Jane Smith" },
      { time: "02:00 PM", mechanic: "Mike Johnson" },
    ],
    "2024-01-02": [
      { time: "10:00 AM", mechanic: "Sarah Lee" },
      { time: "01:00 PM", mechanic: "David Brown" },
      { time: "03:30 PM", mechanic: "Emily Davis" },
    ],
    "2024-01-03": [
      { time: "08:30 AM", mechanic: "Chris Wilson" },
      { time: "12:30 PM", mechanic: "Anna Garcia" },
      { time: "04:00 PM", mechanic: "Daniel Martinez" },
    ],
  };

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
      if (serviceType === "basic") {
        cost = 1000;
        time = "1-2 hours";
      } else if (serviceType === "advanced") {
        cost = 2000;
        time = "2-3 hours";
      } else {
        cost = 0;
        time = "Unknown";
      }
      setEstimate({ cost, time });
    } else {
      setEstimate({ cost: 0, time: "Please select a service" });
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setBooking((prev) => ({ ...prev, date: selectedDate }));
    setAvailability(mechanicAvailability[selectedDate] || []);
  };

  const handleTimeSelect = (slot) => {
    setBooking((prev) => ({
      ...prev,
      time: slot.time,
      mechanic: slot.mechanic,
    }));
    console.log("Selected Slot:", slot);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    console.log("Booking details:", booking);
    navigate("/paymentButton");
  };

  return (
    <div className="container">
      <div className="service-selection">
        <h2>Select Your Battery Service</h2>
        <select value={serviceType} onChange={handleServiceChange}>
          <option value="">--Select Service--</option>
          <option value="basic">Basic Battery Service</option>
          <option value="advanced">Advanced Battery Service</option>
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
            onChange={handleDateChange}
            required
          />
          <div className="availability">
            <h3>Available Time Slots</h3>
            {availability.length > 0 ? (
              <div className="time-slots">
                {availability.map((slot, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`time-slot ${
                      booking.time === slot.time ? "selected" : ""
                    }`}
                    onClick={() => handleTimeSelect(slot)}
                  >
                    {slot.time} - {slot.mechanic}
                  </button>
                ))}
              </div>
            ) : (
              <p>No slots available. Please select another date.</p>
            )}
          </div>
          <button type="submit" disabled={!booking.time}>
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default BatteryService;
