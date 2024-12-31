import React, { useState } from 'react';

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        'Your service is due on 03/10/2024.',
        'Your vehicle tracking is active.'
    ]);

    const styles = {
        container: {
            width: '80%',
            margin: '20px auto',
            padding: '15px',
            backgroundColor: '#f9f9f9',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        },
        title: {
            fontSize: '24px',
            color: '#333',
            textAlign: 'center',
            marginBottom: '15px'
        },
        list: {
            listStyleType: 'none',
            padding: 0,
            margin: 0
        },
        listItem: {
            fontSize: '18px',
            color: '#555',
            backgroundColor: '#fff',
            padding: '10px 15px',
            marginBottom: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s, boxShadow 0.2s'
        },
        listItemHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Notifications</h1>
            <ul style={styles.list}>
                {notifications.map((notification, index) => (
                    <li
                        key={index}
                        style={styles.listItem}
                        onMouseOver={(e) => e.currentTarget.style = { ...styles.listItem, ...styles.listItemHover }}
                        onMouseOut={(e) => e.currentTarget.style = { ...styles.listItem }}
                    >
                        {notification}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;

