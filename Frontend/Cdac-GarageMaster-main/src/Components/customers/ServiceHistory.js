import React, { useState } from 'react';

const ServiceHistory = () => {
    const [pastRecords, setPastRecords] = useState([
        { service: 'Oil Change', date: '2024-01-01' },
        { service: 'Tire Rotation', date: '2024-02-15' }
    ]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([
        { service: 'Brake Inspection', date: '2024-03-10' }
    ]);

    const styles = {
        container: {
            width: '80%',
            margin: '20px auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        },
        header: {
            textAlign: 'center',
            color: '#333',
            marginBottom: '20px'
        },
        sectionHeader: {
            fontSize: '20px',
            margin: '20px 0 10px',
            color: '#555',
            textDecoration: 'underline'
        },
        list: {
            listStyleType: 'none',
            padding: 0,
            margin: '0 0 20px'
        },
        listItem: {
            fontSize: '16px',
            color: '#444',
            padding: '5px 0',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '5px',
            marginBottom: '10px',
            paddingLeft: '10px'
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Service History</h1>

            <h2 style={styles.sectionHeader}>Past Maintenance Records</h2>
            <ul style={styles.list}>
                {pastRecords.map((record, index) => (
                    <li key={index} style={styles.listItem}>
                        {record.service} - {record.date}
                    </li>
                ))}
            </ul>

            <h2 style={styles.sectionHeader}>Upcoming Appointments</h2>
            <ul style={styles.list}>
                {upcomingAppointments.map((appointment, index) => (
                    <li key={index} style={styles.listItem}>
                        {appointment.service} - {appointment.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceHistory;
