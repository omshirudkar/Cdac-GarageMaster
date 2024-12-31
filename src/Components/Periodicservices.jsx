import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Periodicservices = () => {
  const [services, setServices] = useState([]);
  const [vehicle, setVehicle] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [frequency, setFrequency] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [availableMechanics, setAvailableMechanics] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();

  // Mechanics data updated with specific available times for each date
  const mechanics = [
    {
      name: "John",
      availableDates: [
        { date: "2024-01-02", times: ["10:00", "14:00", "16:00"] },
        { date: "2024-01-05", times: ["09:00", "13:00", "15:00"] },
        { date: "2024-01-08", times: ["11:00", "13:00", "17:00"] },
      ],
    },
    {
      name: "Alex",
      availableDates: [
        { date: "2024-01-03", times: ["08:00", "12:00", "16:00"] },
        { date: "2024-01-05", times: ["09:00", "13:00", "15:00"] },
        { date: "2024-01-10", times: ["10:00", "14:00", "16:00"] },
      ],
    },
    {
      name: "Mia",
      availableDates: [
        { date: "2024-01-04", times: ["09:00", "13:00", "17:00"] },
        { date: "2024-01-07", times: ["08:00", "12:00", "14:00"] },
        { date: "2024-01-09", times: ["10:00", "12:00", "16:00"] },
      ],
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const newService = {
      vehicle,
      serviceType,
      frequency: parseInt(frequency, 10),
      lastServiceDate: new Date().toISOString(),
      appointmentDate,
      appointmentTime,
      mechanic: selectedMechanic,
    };

    setServices([...services, newService]);

    setVehicle("");
    setServiceType("");
    setFrequency("");
    setAppointmentDate("");
    setAppointmentTime("");
    setSelectedMechanic("");
    setShowConfirmation(false);

    navigate("/paymentButton", { state: { service: newService } });
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setAppointmentDate(selectedDate);

    // Filter mechanics based on the selected date and show available times
    const filteredMechanics = mechanics
      .filter((mechanic) => {
        // Check if any available date matches the selected date
        const availableTimes = mechanic.availableDates.find(
          (dateObj) => dateObj.date === selectedDate
        )?.times;

        return availableTimes && availableTimes.length > 0; // Only include mechanics with available times on the selected date
      })
      .map((mechanic) => {
        const availableTimes = mechanic.availableDates.find(
          (dateObj) => dateObj.date === selectedDate
        )?.times;

        return {
          ...mechanic,
          availableTimes: availableTimes || [], // Ensure availableTimes is set to an empty array if none found
        };
      });

    setAvailableMechanics(filteredMechanics);
  };

  const handleConfirmBooking = () => {
    if (!selectedMechanic || !appointmentTime) {
      alert("Please select a mechanic and a time to proceed.");
      return;
    }
    setShowConfirmation(true);
  };

  return (
    <div className="app">
      <h1>Garage Service Scheduler</h1>

      {!showConfirmation ? (
        <form onSubmit={(e) => e.preventDefault()} className="service-form">
          <div>
            <label>Vehicle:</label>
            <input
              type="text"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              placeholder="Enter vehicle name or plate number"
            />
          </div>
          <div>
            <label>Service Type:</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
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
            />
          </div>
          <div>
            <label>Appointment Date:</label>
            <input
              type="date"
              value={appointmentDate}
              onChange={handleDateChange}
            />
          </div>
          {availableMechanics.length > 0 && (
            <div>
              <h3>Available Mechanics:</h3>
              {availableMechanics.map((mechanic) => (
                <div key={mechanic.name}>
                  <button
                    type="button"
                    className={`mechanic-btn ${
                      selectedMechanic === mechanic.name ? "selected" : ""
                    }`}
                    onClick={() => setSelectedMechanic(mechanic.name)}
                  >
                    {mechanic.name}
                  </button>
                  {selectedMechanic === mechanic.name && appointmentDate && (
                    <div>
                      <h4>Available Times:</h4>
                      {mechanic.availableTimes.length > 0 ? (
                        mechanic.availableTimes.map((time) => (
                          <button
                            type="button"
                            key={time}
                            className={`time-btn ${
                              appointmentTime === time ? "selected" : ""
                            }`}
                            onClick={() => setAppointmentTime(time)}
                          >
                            {time}
                          </button>
                        ))
                      ) : (
                        <p>No available times for this date.</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {appointmentDate && availableMechanics.length === 0 && (
            <p>No mechanics available on this date.</p>
          )}

          {/* Show Confirm Booking button only if a mechanic and time are selected */}
          {selectedMechanic && appointmentTime && (
            <button type="button" onClick={handleConfirmBooking}>
              Confirm Booking
            </button>
          )}
        </form>
      ) : (
        <div className="confirmation">
          <h2>Booking Overview</h2>
          <p>
            <strong>Vehicle:</strong> {vehicle}
          </p>
          <p>
            <strong>Service Type:</strong> {serviceType}
          </p>
          <p>
            <strong>Frequency:</strong> Every {frequency} month(s)
          </p>
          <p>
            <strong>Appointment Date:</strong> {appointmentDate}
          </p>
          <p>
            <strong>Appointment Time:</strong> {appointmentTime}
          </p>
          <p>
            <strong>Mechanic:</strong> {selectedMechanic}
          </p>

          <button type="button" onClick={handleSubmit}>
            Finalize Booking
          </button>
          <button type="button" onClick={() => setShowConfirmation(false)}>
            Go Back
          </button>
        </div>
      )}

      <style jsx>{`
        /* Styling remains the same */
      `}</style>
    </div>
  );
};

export default Periodicservices;
