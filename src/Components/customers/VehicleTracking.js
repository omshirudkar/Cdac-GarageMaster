import React, { useState, useEffect } from 'react';

const VehicleTracking = () => {
    const [location, setLocation] = useState('Fetching location...');

    const fetchLocation = () => {
        // Simulating a location fetch
        setTimeout(() => {
            setLocation('123 Main St, Springfield, USA');
        }, 2000);
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    const styles = {
        container: {
            width: '80%',
            margin: '20px auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
        },
        header: {
            textAlign: 'center',
            color: '#333',
            marginBottom: '20px'
        },
        subHeader: {
            fontSize: '20px',
            margin: '10px 0',
            color: '#555',
            textDecoration: 'underline'
        },
        locationText: {
            fontSize: '16px',
            color: location === 'Fetching location...' ? '#777' : '#333',
            marginTop: '15px',
            fontStyle: location === 'Fetching location...' ? 'italic' : 'normal',
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Vehicle Tracking</h1>
            <h2 style={styles.subHeader}>Real-time GPS Tracking</h2>
            <p style={styles.locationText}>{location}</p>
        </div>
    );
};

export default VehicleTracking;
