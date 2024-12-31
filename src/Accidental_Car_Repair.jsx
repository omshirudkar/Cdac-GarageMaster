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

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !vehicle ||
      !accidentDate ||
      !accidentDescription ||
      !contactDetails.name ||
      !contactDetails.phone
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Handle the repair request (you can send data to your backend here)
    // alert("Repair request submitted successfully");

    // Navigate to the payment gateway  
    navigate("/paymentButton");

    // Reset the form
    setVehicle("");
    setAccidentDate("");
    setAccidentDescription("");
    setDamageImages([]);
    setContactDetails({ name: "", phone: "" });
  };

  // Handle image file upload
  const handleImageUpload = (e) => {
    setDamageImages([...damageImages, ...e.target.files]);
  };

  return (
    <div className="repair-form-container">
      <h1>Accidental Car Repair Request</h1>

      <form onSubmit={handleSubmit} className="repair-form">
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
            onChange={(e) => setAccidentDate(e.target.value)}
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
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
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

        <button type="submit">Submit Repair Request</button>
      </form>

      {/* Image preview section */}
      {damageImages.length > 0 && (
        <div className="image-preview">
          <h3>Uploaded Damage Images:</h3>
          <div className="image-preview-gallery">
            {damageImages.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`damage-${index}`}
                className="image-preview-item"
              />
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .repair-form-container {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
        }

        h1 {
          text-align: center;
          color: #333;
        }

        .repair-form {
          display: flex;
          flex-direction: column;
          margin-top: 20px;
        }

        .repair-form div {
          margin-bottom: 15px;
        }

        label {
          font-weight: bold;
        }

        input,
        textarea {
          padding: 8px;
          margin-top: 5px;
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        textarea {
          height: 100px;
          resize: vertical;
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

        .image-preview {
          margin-top: 20px;
        }

        .image-preview-gallery {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .image-preview-item {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 4px;
          border: 1px solid #ddd;
        }
      `}</style>
    </div>
  );
};

export default Accidental_Car_Repair;
