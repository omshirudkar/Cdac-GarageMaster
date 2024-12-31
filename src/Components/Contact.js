import React, { useState } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contactMethod: "Email",
    service: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (value) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (!formData.message) errors.message = "Message is required.";
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Form submitted:", formData);
    alert("Thank you for contacting us! We'll get back to you soon.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      contactMethod: "Email",
      service: "",
      message: "",
    });
  };

  return (
    <div className="contact-us-container">
      <style>{`
        /* Container Styling */
        .contact-us-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 50px;
         background: linear-gradient(135deg, #a1c4fd, #c2e9fb, #e6f7ff);

          max-width: 1200px;
          margin: auto;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        /* Contact Info Section */
        .contact-info {
          background-color: rgba(255, 255, 255, 0.9);
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin-bottom: 50px;
        }

        .contact-info h2 {
          font-size: 36px;
          color: #2c3e50;
          text-align: center;
          margin-bottom: 10px;
        }

        .contact-info p {
          color: #7f8c8d;
          text-align: center;
          line-height: 1.8;
        }

        .contact-info h4 {
          color: #3498db;
          font-size: 22px;
        }

        /* Form Section */
        .contact-form {
          background-color: rgba(255, 255, 255, 0.9);
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .contact-form h2 {
          font-size: 30px;
          color: #2c3e50;
          margin-bottom: 30px;
          text-align: center;
        }

        .contact-form .form-label {
          font-weight: 600;
          color: #2c3e50;
        }

        .contact-form .form-control,
        .contact-form .form-select {
          width: 100%;
          padding: 12px 18px;
          margin: 10px 0;
          border-radius: 8px;
          border: 1px solid #ddd;
          font-size: 16px;
          box-sizing: border-box;
          transition: all 0.3s ease;
        }

        .contact-form .form-control:focus,
        .contact-form .form-select:focus {
          border-color: #3498db;
          box-shadow: 0 0 8px rgba(52, 152, 219, 0.25);
          outline: none;
        }

       .contact-form .form-control.error,
.contact-form .form-select.error {
  border-color: #e74c3c;  /* Keeps the red for error indication */
  background-color:rgba(231, 235, 238, 0.01);  /* Light red background for error */
}

.form-error {
  color: #d9534f;  /* A slightly softer red that complements the blue tones */
  font-size: 14px;
  margin-top: 5px;
}


        .contact-form button {
          background-color: #3498db;
          color: #fff;
          padding: 14px 20px;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          width: 100%;
          transition: background-color 0.3s, transform 0.3s;
        }

        .contact-form button:hover {
          background-color: #2980b9;
          transform: translateY(-3px);
        }

        .contact-form button:active {
          background-color: #2471a3;
          transform: translateY(0);
        }

        .contact-form .form-check {
          margin-bottom: 20px;
        }

        .contact-form .form-check-label {
          font-size: 16px;
          color: #7f8c8d;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .contact-us-container {
            padding: 30px;
          }

          .contact-form h2 {
            font-size: 26px;
          }

          .contact-form .form-control,
          .contact-form .form-select {
            font-size: 14px;
            padding: 10px;
          }

          .contact-form button {
            font-size: 16px;
          }
        }

        /* Google Map Styling */
        iframe {
          width: 100%;
          height: 400px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div className="row">
        {/* Contact Info Section */}
        <div className="col-md-6">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>If you have any questions, feel free to reach out to us!</p>
            <h4>Phone--------------------------------------------</h4>
            <p>+91-8080056951</p>
            <h4>Email--------------------------------------------</h4>
            <p>urjaautomotive@gmail.com</p>
            <h4>Address------------------------------------------</h4>
            <p> Panchwati, Sri Ram Nagar, Konark Nagar, Nashik, Maharashtra 422006, India</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="col-md-6">
          <div className="contact-form">
            <h2>Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  className={`form-control ${formErrors.name ? "error" : ""}`}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {formErrors.name && <div className="form-error">{formErrors.name}</div>}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  className={`form-control ${formErrors.email ? "error" : ""}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && <div className="form-error">{formErrors.email}</div>}
              </div>

              {/* Phone Field */}
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Preferred Contact Method */}
              <div className="form-group">
                <label className="form-label">Preferred Contact Method</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="contactMethod"
                    value="Email"
                    checked={formData.contactMethod === "Email"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Email</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="contactMethod"
                    value="Phone"
                    checked={formData.contactMethod === "Phone"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Phone</label>
                </div>
              </div>

              {/* Service Request Dropdown */}
              <div className="form-group">
                <label htmlFor="service" className="form-label">Service Request</label>
                <select
                  className="form-select"
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select a Service</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Maintenance Request">Maintenance Request</option>
                  <option value="Emergency Repair">Emergency Repair</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  className={`form-control ${formErrors.message ? "error" : ""}`}
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                />
                {formErrors.message && <div className="form-error">{formErrors.message}</div>}
              </div>

              {/* Submit Button */}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>

      {/* Google Map Embed */}
      <div className="row">
        <div className="col-12" style={{ marginTop: "30px" }}>
          <h4>Our Location</h4>
          <iframe
            src="https://www.google.com/maps/embed?pb=..."
            title="Garage Location"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
