import React from "react";

export default function About() {
  return (
    <div className="about-section container">
      <style>
        {`
        /* About Section Styles */
        .about-section {
          background: linear-gradient(135deg, #ffffff, #f9f9f9);
          border: 1px solid #ddd;
          padding: 50px 30px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          margin: 40px auto;
          font-family: 'Poppins', sans-serif;
          color: #333;
        }

        .about-section h3 {
          font-size: 32px;
          font-weight: 700;
          color: #0073e6;
          text-align: center;
          margin-bottom: 25px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .about-section p {
          font-size: 17px;
          line-height: 1.8;
          margin-bottom: 20px;
          color: #555;
        }

        .about-section h4 {
          font-size: 24px;
          font-weight: 600;
          color:black;
          margin-bottom: 20px;
        }

        .about-section ul {
          list-style: none;
          padding: 0;
        }

        .about-section ul li {
          font-size: 17px;
          margin-bottom: 15px;
          color: #444;
        }

        .about-section ul li strong {
          color:rgba(23, 3, 3, 0.66);
        }

        /* Reviews Section */
        .reviews-section h4 {
          font-size: 24px;
          font-weight: 600;
          color: #0073e6;
          text-align: center;
          margin-bottom: 30px;
        }

        .card {
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        }

        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
        }

        .card-title {
          font-size: 18px;
          font-weight: 600;
          color: #0073e6;
        }

        .card-text {
          font-size: 15px;
          line-height: 1.6;
          color: #555;
        }

        .card-footer {
          background-color: #f8f9fa;
          text-align: center;
          font-size: 14px;
          color: #6c757d;
          border-top: 1px solid #e9ecef;
          padding: 10px;
        }

        /* Feedback Form */
        .feedback-form h4 {
          font-size: 24px;
          font-weight: 600;
          color: black;
          text-align: center;
          margin-bottom: 25px;
        }

        .form-label {
          font-size: 15px;
          font-weight: 600;
          color: #555;
        }

        .form-control {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 12px;
          font-size: 15px;
          background: #f9f9f9;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          border-color: #0073e6;
          box-shadow: 0 0 8px rgba(0, 115, 230, 0.3);
          background: #fff;
        }

        .btn-primary {
          background-color: #0073e6;
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          font-size: 17px;
          font-weight: 600;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 115, 230, 0.3);
        }

        .btn-primary:hover {
          background-color: #005bb5;
          box-shadow: 0 6px 15px rgba(0, 91, 181, 0.4);
          transform: translateY(-2px);
        }

        .btn-primary:active {
          background-color: #004291;
          transform: translateY(0);
          box-shadow: 0 3px 8px rgba(0, 66, 145, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .about-section {
            padding: 30px;
          }

          .about-section h3, .about-section h4 {
            font-size: 22px;
          }

          .card-title {
            font-size: 16px;
          }

          .card-text {
            font-size: 14px;
          }

          .btn-primary {
            font-size: 15px;
            padding: 10px 15px;
          }
        }
        `}
      </style>

      {/* About Section */}
      <h3>About Us</h3>
      <p>
        Welcome to <strong>Urja Automobiles</strong>, your trusted partner in delivering top-notch
        automotive services and cutting-edge vehicle tracking solutions.
      </p>
      <p>
        At <strong>Urja Automobiles</strong>, we specialize in a wide range of services, including
        routine maintenance, emergency repairs, and advanced diagnostics.
      </p>

      <h4>Why Choose Us?</h4>
      <ul>
        <li><strong>Expert Team:</strong> Certified and experienced mechanics.</li>
        <li><strong>Advanced Technology:</strong> Real-time tracking and updates.</li>
        <li><strong>Customer-Centric Approach:</strong> Tailored solutions.</li>
        <li><strong>Eco-Friendly Practices:</strong> Sustainable methods.</li>
      </ul>

      {/* Reviews Section */}
      <div className="reviews-section mt-5">
        <h4>Customer Reviews</h4>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow">
              <div className="card-body">
                <h5 className="card-title">John Doe</h5>
                <p className="card-text">
                  "Fantastic service! My car runs like new again. Highly recommend Urja Automobiles."
                </p>
              </div>
              <div className="card-footer text-muted">
                <small>Rating: ★★★★★</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow">
              <div className="card-body">
                <h5 className="card-title">Jane Smith</h5>
                <p className="card-text">
                  "Loved the transparent process and real-time updates. Great experience!"
                </p>
              </div>
              <div className="card-footer text-muted">
                <small>Rating: ★★★★★</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow">
              <div className="card-body">
                <h5 className="card-title">Michael Lee</h5>
                <p className="card-text">
                  "Highly professional and courteous staff. My go-to place for car maintenance."
                </p>
              </div>
              <div className="card-footer text-muted">
                <small>Rating: ★★★★☆</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="feedback-form mt-5">
        <h4>Leave Your Feedback</h4>
        <form className="mt-3">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Your Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter your name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Your Feedback</label>
            <textarea className="form-control" id="message" rows="4" placeholder="Share your thoughts with us"></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}
