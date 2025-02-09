import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ServiceBooking = () => {
  const [service, setService] = useState("");

  const [isHovered, setIsHovered] = useState(false); // State for hover effect
  const navigate = useNavigate(); // Initialize useNavigate hook

  const services = [
    "Batteries",
    "Denting And Painting",
    "Periodic Services",
    "Accidental Car Repair",
    "Tyres And Wheels",
    "Custom Services",
    "Windshield And Glass",
    "Lights And Fitments",
    "Engine Decarbonization",
    "Car Wash",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation to ensure all fields are filled
    if (!service) {
      alert("Please fill in all fields");
      return;
    }

    console.log("Service:", service);

    // Navigate based on the selected service
    if (service === "Oil Change") {
      navigate(`/service-details/oil-change`);
    } else if (service === "Tire Rotation") {
      navigate(`/service-details/tire-rotation`);
    } else if (service === "Brake Inspection") {
      navigate(`/service-details/brake-inspection`);
    } else if (service === "Batteries") {
      navigate(`/batteriesservices`);
    } else if (service === "Denting And Painting") {
      navigate(`/DentingAndPainting`);
    } else if (service === "Periodic Services") {
      navigate(`/periodicservices`);
    } else if (service === "Accidental Car Repair") {
      navigate(`/Accidentalcarrepair`);
    } else if (service === "Tyres And Wheels") {
      navigate(`/tyresandwheels`);
    } else if (service === "Custom Services") {
      navigate(`/customservices`);
    } else if (service === "Windshield And Glass") {
      navigate(`/windshieldandglass`);
    } else if (service === "Lights And Fitments") {
      navigate(`/lightsandfitments`);
    } else if (service === "Engine Decarbonization") {
      navigate(`/engine-decarbonization`);
    } else if (service === "Car Wash") {
      navigate(`/carwash`);
    } else {
      // In case of an unrecognized service
      alert("Please select a valid service");
    }
  };

  const styles = {
    container: {
      width: "80%",
      margin: "20px auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    header: {
      textAlign: "center",
      color: "#333",
      marginBottom: "20px",
    },
    sectionHeader: {
      fontSize: "20px",
      margin: "20px 0 10px",
      color: "#555",
      textDecoration: "underline",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    label: {
      display: "flex",
      flexDirection: "column",
      fontSize: "16px",
      color: "#444",
    },
    select: {
      padding: "10px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    input: {
      padding: "10px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      backgroundColor: isHovered ? "#0056b3" : "#007bff", // Dynamically change button background color
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      alignSelf: "flex-start",
      transition: "background-color 0.3s",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Service Booking</h1>

      <h2 style={styles.sectionHeader}>Booking Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Service:
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            style={styles.select}
          >
            <option value="">Select a service</option>
            {services.map((s, index) => (
              <option key={index} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          style={styles.button}
          onMouseOver={() => setIsHovered(true)} // Set hover state to true
          onMouseOut={() => setIsHovered(false)} // Set hover state to false
        >
          Book Service
        </button>
      </form>
    </div>
  );
};

export default ServiceBooking;
