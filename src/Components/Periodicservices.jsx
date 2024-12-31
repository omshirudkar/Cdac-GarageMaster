import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Periodicservices = () => {
  const [vehicle, setVehicle] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [frequency, setFrequency] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [availableMechanics, setAvailableMechanics] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Sample mechanics data
  const mechanics = [
    { id: 1, name: "John Doe", available: ["2024-01-05 10:00", "2024-01-05 14:00"] },
    { id: 2, name: "Jane Smith", available: ["2024-01-05 12:00", "2024-01-06 09:00"] },
  ];

  // Handle date change and filter mechanics by date
  const handleDateChange = (date) => {
    setAppointmentDate(date);

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

  // Handle booking confirmation
  const confirmBooking = () => {
    if (!selectedMechanic || !selectedTime) {
      alert("Please select a mechanic and a time.");
      return;
    }

    const newService = {
      vehicle,
      serviceType,
      frequency: parseInt(frequency, 10),
      appointmentDate,
      appointmentTime: selectedTime,
      mechanic: selectedMechanic.name,
    };

    navigate("/paymentButton", { state: { service: newService } });
  };

  return (
    <div className="app">
      <h1>Garage Service Scheduler</h1>

      {/* Service Form */}
      <form className="service-form">
        <div>
          <label>Vehicle:</label>
          <input
            type="text"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            placeholder="Enter vehicle name or plate number"
            required
          />
        </div>
        <div>
          <label>Service Type:</label>
          <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} required>
            <option value="">Select Service</option>
            <option value="Oil Change">Oil Change</option>
            <option value="Tire Rotation">Tire Rotation</option>
            <option value="Brake Check">Brake Check</option>
          </select>
        </div>
        <div>
          <label>Frequency (Months):</label>
          <input
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            min="1"
            placeholder="Frequency in months"
            required
          />
        </div>
        <div>
          <label>Appointment Date:</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => handleDateChange(e.target.value)}
            required
          />
        </div>
      </form>

      {/* Error Message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Mechanic Selection */}
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
                      value={timeSlot}
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
        .app {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f8f8f8;
        }

        h1 {
          text-align: center;
          color: #333;
        }

        .service-form div,
        .mechanic-selection div {
          margin-bottom: 15px;
        }

        input,
        select {
          padding: 8px;
          margin-top: 5px;
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          background-color: #4caf50;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #45a049;
        }

        .error-message {
          color: red;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Periodicservices;
