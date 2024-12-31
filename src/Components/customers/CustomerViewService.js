import React from 'react';
import { useLocation } from 'react-router-dom';

const CustomerViewService = () => {
    // Get the data passed through location.state
    const location = useLocation();
    const { customerName, contactNumber, serviceType, additionalNotes } = location.state || {};

    // Define styles here
    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        title: {
            fontSize: '2em',
            color: '#333',
            textAlign: 'center',
            marginBottom: '30px',
        },
        sectionTitle: {
            fontSize: '1.5em',
            color: '#333',
            marginBottom: '10px',
            textAlign: 'left',
        },
        row: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
            borderBottom: '1px solid #ddd',
        },
        label: {
            fontWeight: '600',
            color: '#333',
        },
        value: {
            fontWeight: '400',
            color: '#555',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Service Request Details</h1>

            <h2 style={styles.sectionTitle}>Customer Information</h2>

            {/* Displaying customer data in a row format */}
            <div style={styles.row}>
                <div style={styles.label}>Customer Name</div>
                <div style={styles.value}>{customerName}</div>
            </div>
            <div style={styles.row}>
                <div style={styles.label}>Contact Number</div>
                <div style={styles.value}>{contactNumber}</div>
            </div>
            <div style={styles.row}>
                <div style={styles.label}>Service Type</div>
                <div style={styles.value}>{serviceType}</div>
            </div>
            <div style={styles.row}>
                <div style={styles.label}>Additional Notes</div>
                <div style={styles.value}>{additionalNotes || 'N/A'}</div>
            </div>
        </div>
    );
};

export default CustomerViewService;
