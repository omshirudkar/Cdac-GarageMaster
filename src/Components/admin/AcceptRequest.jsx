import React, { useState } from 'react';

// AcceptRequest component
const AcceptRequest = () => {
  const [requestStatus, setRequestStatus] = useState('Pending'); // Default status is "Pending"

  // Function to accept the request
  const handleAccept = () => {
    setRequestStatus('Accepted');
    // Add logic here to handle the acceptance (e.g., API call to update status in database)
  };

  // Function to cancel the request
  const handleCancel = () => {
    setRequestStatus('Cancelled');
    // Add logic here to handle the cancellation (e.g., API call to update status in database)
  };

  return (
    <div className="main-container">
      <div className="request-container">
        <h3 className="title">Service Request</h3>
        <p className="status">Status: <strong>{requestStatus}</strong></p>
        
        <div className="buttons-container">
          <button onClick={handleAccept} className="accept-button">Accept</button>
          <button onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      </div>

      {/* Internal CSS */}
      <style jsx>{`
        .main-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh; /* Full viewport height */
          background-color: #f1f1f1; /* Optional background color */
        }

        .request-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
          border-radius: 10px;
          width: 350px;
          background-color: #f4f4f4;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .title {
          font-size: 24px;
          color: #333;
          margin-bottom: 10px;
          font-family: 'Arial', sans-serif;
        }

        .status {
          font-size: 18px;
          color: #555;
          margin-bottom: 20px;
          font-family: 'Arial', sans-serif;
        }

        .buttons-container {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .accept-button, .cancel-button {
          padding: 12px 24px;
          font-size: 18px;
          cursor: pointer;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          transition: all 0.3s ease-in-out;
        }

        .accept-button {
          background-color: #4CAF50;
          color: white;
        }

        .accept-button:hover {
          background-color: #45a049;
        }

        .cancel-button {
          background-color: #f44336;
          color: white;
        }

        .cancel-button:hover {
          background-color: #e53935;
        }
      `}</style>
    </div>
  );
};

export default AcceptRequest;
