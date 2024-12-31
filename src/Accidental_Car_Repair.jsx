import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Accidental_Car_Repair = () => {
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState("");
  const [accidentDate, setAccidentDate] = useState("");
  const [accidentDescription, setAccidentDescription] = useState("");
  const [damageImages, setDamageImages] = useState([]);
  const [contactDetails, setContactDetails] = useState({
    name: "",
    phone: "",
  });
  const [availableMechanics, setAvailableMechanics] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const mechanics = [
    { id: 1, name: "John Doe", available: ["2024-01-05 10:00", "2024-01-05 14:00"] },
    { id: 2, name: "Jane Smith", available: ["2024-01-06 09:00", "2024-01-06 13:00"] },
  ];

  const handleDateChange = (date) => {
    setAccidentDate(date);

    const filteredMechanics = mechanics
      .map((mechanic) => ({
        ...mechanic,
        available: mechanic.available.filter((timeSlot) => timeSlot.startsWith(date)),
      }))
      .filter((mechanic) => mechanic.available.length > 0);

    if (filteredMechanics.length === 0) {
      setErrorMessage("No mechanics are available on the selected date.");
      setAvailableMechanics([]);
    } else {
      setErrorMessage("");
      setAvailableMechanics(filteredMechanics);
    }
  };

  const confirmBooking = () => {
    if (!selectedMechanic || !selectedTime) {
      alert("Please select a mechanic and a time.");
      return;
    }

    const details = {
      vehicle,
      accidentDate,
      accidentDescription,
      damageImages,
      contactDetails,
      mechanic: selectedMechanic,
      time: selectedTime,
    };

    setBookingDetails(details);
    setBookingConfirmed(true);
  };

  const handleImageUpload = (e) => {
    setDamageImages([...damageImages, ...e.target.files]);
  };

  if (bookingConfirmed) {
    return (
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
    );
  }

  return (
    <div className="repair-form-container">
      <h1>Accidental Car Repair Request</h1>

      <form className="repair-form">
        <div>
          <label>Vehicle Information (Car Model, Plate Number):</label>
          <input
            type="text"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            placeholder="Enter vehicle details"
            required
          />
        </div>

        <div>
          <label>Accident Date:</label>
          <input
            type="date"
            value={accidentDate}
            onChange={(e) => handleDateChange(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Accident Description:</label>
          <textarea
            value={accidentDescription}
            onChange={(e) => setAccidentDescription(e.target.value)}
            placeholder="Describe the accident details"
            required
          />
        </div>

        <div>
          <label>Upload Damage Photos (if any):</label>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
        </div>

        <div>
          <label>Contact Name:</label>
          <input
            type="text"
            value={contactDetails.name}
            onChange={(e) =>
              setContactDetails({ ...contactDetails, name: e.target.value })
            }
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label>Contact Phone Number:</label>
          <input
            type="tel"
            value={contactDetails.phone}
            onChange={(e) =>
              setContactDetails({ ...contactDetails, phone: e.target.value })
            }
            placeholder="Enter your phone number"
            required
          />
        </div>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {availableMechanics.length > 0 && (
        <div className="mechanic-selection">
          <h2>Select a Mechanic and Time</h2>
          {availableMechanics.map((mechanic) => (
            <div key={mechanic.id}>
              <h3>{mechanic.name}</h3>
              <div>
                {mechanic.available.map((timeSlot, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={`mechanic-${mechanic.id}-time-${index}`}
                      name="time"
                      onChange={() => {
                        setSelectedMechanic(mechanic);
                        setSelectedTime(timeSlot);
                      }}
                    />
                    <label htmlFor={`mechanic-${mechanic.id}-time-${index}`}>{timeSlot}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={confirmBooking}>Book Appointment</button>
        </div>
      )}

      <style jsx>{`
        .repair-form-container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
        }

        .error-message {
          color: red;
          font-weight: bold;
        }

        .mechanic-selection {
          margin-top: 20px;
        }

        button {
          background-color: #4caf50;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        }

        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default Accidental_Car_Repair;
