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
        <h1>Booking Confirmed ✅</h1>
        <p><strong>Vehicle:</strong> {bookingDetails.vehicle}</p>
        <p><strong>Accident Date:</strong> {bookingDetails.accidentDate}</p>
        <p><strong>Accident Description:</strong> {bookingDetails.accidentDescription}</p>
        <p><strong>Contact Name:</strong> {bookingDetails.contactDetails.name}</p>
        <p><strong>Contact Phone:</strong> {bookingDetails.contactDetails.phone}</p>
        <p><strong>Selected Mechanic:</strong> {bookingDetails.mechanic.name}</p>
        <p><strong>Selected Time:</strong> {bookingDetails.time}</p>
        <button onClick={() => navigate("/paymentButton")}>Proceed to Payment 💳</button>
      </div>
    );
  }

  return (
    <div className="repair-form-container">
      <h1>🚗 Accidental Car Repair Request</h1>

      <form className="repair-form">
        <div className="input-group">
          <label>🚘 Vehicle Information:</label>
          <input
            type="text"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            placeholder="Car Model, Plate Number"
            required
          />
        </div>

        <div className="input-group">
          <label>📅 Accident Date:</label>
          <input
            type="date"
            value={accidentDate}
            onChange={(e) => handleDateChange(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>📝 Accident Description:</label>
          <textarea
            value={accidentDescription}
            onChange={(e) => setAccidentDescription(e.target.value)}
            placeholder="Describe the accident..."
            required
          />
        </div>

        <div className="input-group">
          <label>📷 Upload Damage Photos:</label>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
        </div>

        <div className="input-group">
          <label>👤 Contact Name:</label>
          <input
            type="text"
            value={contactDetails.name}
            onChange={(e) =>
              setContactDetails({ ...contactDetails, name: e.target.value })
            }
            placeholder="Your Name"
            required
          />
        </div>

        <div className="input-group">
          <label>📞 Contact Phone:</label>
          <input
            type="tel"
            value={contactDetails.phone}
            onChange={(e) =>
              setContactDetails({ ...contactDetails, phone: e.target.value })
            }
            placeholder="Your Phone Number"
            required
          />
        </div>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {availableMechanics.length > 0 && (
        <div className="mechanic-selection">
          <h2>🔧 Select a Mechanic & Time</h2>
          {availableMechanics.map((mechanic) => (
            <div key={mechanic.id} className="mechanic-box">
              <h3>{mechanic.name}</h3>
              <div>
                {mechanic.available.map((timeSlot, index) => (
                  <label key={index} className="time-slot">
                    <input
                      type="radio"
                      name="time"
                      onChange={() => {
                        setSelectedMechanic(mechanic);
                        setSelectedTime(timeSlot);
                      }}
                    />
                    {timeSlot}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button onClick={confirmBooking}>Confirm Booking ✅</button>
        </div>
      )}

      <style jsx>{`
        .repair-form-container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
          border-radius: 10px;
          background-color: #ffffff;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
          text-align: center;
          color: #333;
        }

        .input-group {
          margin-bottom: 15px;
        }

        label {
          font-weight: bold;
        }

        input, textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-top: 5px;
        }

        .mechanic-selection {
          margin-top: 20px;
        }

        .mechanic-box {
          background: #f1f1f1;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .time-slot {
          display: inline-block;
          padding: 5px;
          margin-right: 10px;
          cursor: pointer;
        }

        button {
          width: 100%;
          padding: 10px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }

        button:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
};

export default Accidental_Car_Repair;
