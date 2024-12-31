import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CustomerForm = () => {
    // State to store form data
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
       
        address: "",
        password: "",
    });

    // State for form errors
    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        
        address: "",
        password: "",
    });

    // Initialize useNavigate hook
    const navigate = useNavigate();

    // Handle change of input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Form validation function
    const validateForm = () => {
        let formErrors = {};
        let valid = true;

        if (!formData.fullName) {
            formErrors.fullName = "Full Name is required";
            valid = false;
        }

        if (!formData.email) {
            formErrors.email = "Email is required";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = "Email address is invalid";
            valid = false;
        }

        if (!formData.phoneNumber) {
            formErrors.phoneNumber = "Phone Number is required";
            valid = false;
        }

      
        if (!formData.address) {
            formErrors.address = "Address is required";
            valid = false;
        }

        if (!formData.password) {
            formErrors.password = "Password is required";
            valid = false;
        }

        setErrors(formErrors);
        return valid;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form Submitted", formData);
            // After form submission, navigate to the admin dashboard
            navigate("/customer-dash"); // Redirect to the admin dashboard
        }
    };

    return (
        <div className="registration-form mt-5">
            <h2>Customer Registration</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    {errors.fullName && <span className="error">{errors.fullName}</span>}
                </div>

                <div>
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div>
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    {errors.phoneNumber && (
                        <span className="error">{errors.phoneNumber}</span>
                    )}
                </div>

                

                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    {errors.address && <span className="error">{errors.address}</span>}
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <button type="submit" >Register</button>
            </form>

            {/* Internal CSS with Shadow Effect */}
            <style jsx>{`
        .error {
          color: red;
          font-size: 12px;
        }

        .registration-form {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1),
            0 6px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .registration-form:hover {
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15),
            0 15px 30px rgba(0, 0, 0, 0.1);
        }

        .registration-form h2 {
          text-align: center;
        }

        .registration-form div {
          margin-bottom: 15px;
        }

        .registration-form label {
          display: block;
          font-weight: bold;
        }

        .registration-form input {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          font-size: 14px;
        }

        .registration-form button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .registration-form button:hover {
          background-color: #0056b3;
        }
      `}</style>
        </div>
    );
};

export default CustomerForm;
