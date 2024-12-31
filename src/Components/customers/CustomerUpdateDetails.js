import React, { useState } from "react";

export default function CustomerUpdateDetails() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = () => {
    alert("Details updated successfully!\n" + JSON.stringify(details, null, 2));
  };

  const formStyle = {
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#45a049",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Update Personal Details</h2>
      <form style={formStyle} onSubmit={(e) => e.preventDefault()}>
        <div>
          <label style={labelStyle}>Name:</label>
          <input
            type="text"
            name="name"
            value={details.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            name="email"
            value={details.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Phone:</label>
          <input
            type="text"
            name="phone"
            value={details.phone}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Address:</label>
          <textarea
            name="address"
            value={details.address}
            onChange={handleChange}
            style={inputStyle}
          ></textarea>
        </div>
        <div>
          <label style={labelStyle}>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={details.dob}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Gender:</label>
          <select
            name="gender"
            value={details.gender}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style = buttonHoverStyle)}
          onMouseOut={(e) => (e.target.style = buttonStyle)}
          onClick={handleSubmit}
        >
          Update
        </button>
      </form>
    </div>
  );
}
