import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

// Car Wash Component
function CarWash() {
  const navigate = useNavigate(); // Initialize the navigate hook

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
  });

  // Handling form change for vehicle info
  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicleInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handling service selection
  const handleServiceChange = (e) => {
    setServiceType(e.target.value);
    console.log("Service Type Changed: ", e.target.value); // Debugging log to check serviceType
  };

  // Handling file upload
  const handleImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setImages(uploadedFiles);
  };

  // Handling estimate submission
  const getEstimate = () => {
    console.log("getEstimate function triggered!");
    console.log("Selected Service Type:", serviceType); // Debugging log to check serviceType

    if (serviceType) {
      let cost;
      let time;
      // Estimate based on selected service
      if (serviceType === "basic") {
        cost = 300;
        time = "1-2 hours";
      } else if (serviceType === "premium") {
        cost = 600;
        time = "2-3 hours";
      } else if (serviceType === "deluxe") {
        cost = 1000;
        time = "3-4 hours";
      } else {
        cost = 0;
        time = "Unknown";
      }

      console.log("Calculated Estimate:", { cost, time }); // Debugging log for calculated estimate

      // Update state for estimate
      setEstimate({ cost, time });
    } else {
      // Handle case when no service is selected
      setEstimate({ cost: 0, time: "Please select a service" });
    }
  };

  // Handling booking form submission and redirect to payment
  const handleBooking = (e) => {
    e.preventDefault();
    console.log("Booking details:", booking);
    // alert("Booking confirmed!");
    
    // Redirect to the payment gateway page after booking is confirmed
    navigate("/paymentButton"); // Replace "/payment" with the actual path to your payment gateway component
  };

  return (
    <div className="container">
      {/* Service Selection */}
      <div className="service-selection">
        <h2>Select Your Car Wash Service</h2>
        <select value={serviceType} onChange={handleServiceChange}>
          <option value="">--Select Service--</option>
          <option value="basic">Basic Wash</option>
          <option value="premium">Premium Wash</option>
          <option value="deluxe">Deluxe Wash</option>
        </select>
        <button onClick={getEstimate}>Get Estimate</button>
      </div>

      {/* Vehicle Information Form */}
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

      {/* Image Upload Section */}
      <div className="image-upload">
        <h2>Upload Vehicle Images</h2>
        <input type="file" multiple onChange={handleImageUpload} />
      </div>

      {/* Estimate Section */}
      {estimate && (
        <div className="estimate">
          <h2>Estimated Cost & Timeline</h2>
          <p>Cost: ₹ {estimate.cost}</p>
          <p>Estimated Time: {estimate.time}</p>
        </div>
      )}

      {/* Booking Form */}
      <div className="booking">
        <h2>Book Your Service</h2>
        <form onSubmit={handleBooking}>
          <input
            type="date"
            value={booking.date}
            onChange={(e) => setBooking({ ...booking, date: e.target.value })}
            required
          />
          <input
            type="time"
            value={booking.time}
            onChange={(e) => setBooking({ ...booking, time: e.target.value })}
            required
          />
          <button type="submit">Confirm Booking</button>
        </form>
      </div>

      <style jsx="true">{`
        .container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px;
          background-color: #f0f0f0;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          max-width: 950px;
          margin: 30px auto;
          overflow: hidden;
        }

        .service-selection,
        .vehicle-info,
        .image-upload,
        .estimate,
        .booking {
          background-color: #ffffff;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          margin-bottom: 25px;
        }

        .service-selection h2,
        .vehicle-info h2,
        .estimate h2,
        .booking h2 {
          font-size: 1.8rem;
          color: #333;
          margin-bottom: 15px;
          font-weight: bold;
        }

        select,
        button {
          width: 100%;
          padding: 12px;
          margin-top: 8px;
          border-radius: 5px;
          font-size: 1rem;
        }

        select {
          border: 1px solid #ddd;
          background-color: #f9f9f9;
        }

        button {
          background-color: #4CAF50;
          color: white;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-size: 1rem;
          margin-top: 15px;
        }

        button:hover {
          background-color: #45a049;
        }

        input[type="text"],
        input[type="number"],
        input[type="file"],
        select,
        input[type="date"],
        input[type="time"] {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border-radius: 5px;
          border: 1px solid #ddd;
          font-size: 1rem;
          background-color: #f9f9f9;
        }

        input[type="file"] {
          background-color: #fff;
          padding: 5px;
        }

        input[type="date"],
        input[type="time"] {
          background-color: #fff;
        }

        .estimate p {
          font-size: 1.2rem;
          color: #555;
          margin: 10px 0;
        }

        .booking form {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .booking button {
          padding: 12px 24px;
          background-color: #4CAF50;
          color: white;
          border-radius: 5px;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .booking button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
}

export default CarWash;
