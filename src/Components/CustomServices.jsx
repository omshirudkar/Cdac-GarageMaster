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
    mechanic: "",
  });
  const [mechanics] = useState([
    { id: 1, name: "John Doe", available: ["2024-01-05 10:00", "2024-01-05 14:00"] },
    { id: 2, name: "Jane Smith", available: ["2024-01-06 09:00", "2024-01-06 13:00"] },
    { id: 3, name: "Michael Johnson", available: ["2024-01-05 09:00", "2024-01-05 13:00"] },
  ]);
  const [availableMechanics, setAvailableMechanics] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false); // New state to track booking confirmation
  const [bookingDetails, setBookingDetails] = useState(null); // Store booking details to show on confirmation

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
    const { date, time, mechanic } = booking;

    if (!date || !time || !mechanic || !serviceType || !vehicleInfo.make || !vehicleInfo.model) {
      alert("Please fill out all required fields before proceeding.");
      return;
    }

    // Set the booking details for confirmation
    setBookingDetails({
      vehicle: `${vehicleInfo.make} ${vehicleInfo.model}`,
      accidentDate: booking.date,
      accidentDescription: "Sample description", // Add description if needed
      contactDetails: { name: "John Doe", phone: "123-456-7890" }, // Use the contact info if available
      mechanic: { name: mechanic },
      time: time,
    });

    // Set bookingConfirmed to true to show the confirmation section
    setBookingConfirmed(true);
  };

  return (
    <div className="container">
      {!bookingConfirmed ? (
        <>
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
                            value={slot}
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

              <button type="submit">Confirm Booking</button>
            </form>
          </div>
        </>
      ) : (
        <div className="confirmation-page">
          <h1>Booking Confirmation</h1>
          <p><strong>Vehicle:</strong> {bookingDetails.vehicle}</p>
          <p><strong>Accident Date:</strong> {bookingDetails.accidentDate}</p>
          <p><strong>Accident Description:</strong> {bookingDetails.accidentDescription}</p>
          <p><strong>Contact Name:</strong> {bookingDetails.contactDetails.name}</p>
          <p><strong>Contact Phone:</strong> {bookingDetails.contactDetails.phone}</p>
          <p><strong>Selected Mechanic:</strong> {bookingDetails.mechanic.name}</p>
          <p><strong>Selected Time:</strong> {bookingDetails.time}</p>
          <button onClick={() => navigate("/paymentButton")}>Confirm Booking</button>
        </div>
      )}

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

        .error {
          color: red;
          font-size: 1.1em;
        }

        .mechanic-selection {
          margin-top: 20px;
        }

        .mechanic-selection h3 {
          font-size: 1.5em;
        }

        .mechanic-selection label {
          margin-left: 8px;
        }

        .confirmation-page {
          margin-top: 20px;
        }

        .confirmation-page p {
          font-size: 1.2em;
        }
      `}</style>
    </div>
  );
}

export default CustomServices;
