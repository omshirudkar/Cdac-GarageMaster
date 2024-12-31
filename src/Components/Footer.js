import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#f1e4e9', // Lighter soft pinkish beige
      color: '#4c3d4e', // Deep muted purple for text
      padding: '30px 20px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
    },
    footerContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '30px',
      justifyItems: 'start',
      marginBottom: '20px',
    },
    section: {
      padding: '10px',
      textAlign: 'left',
      marginBottom: '20px', // Add margin to make sections have equal space
    },
    header: {
      color: '#9b4a7f', // Accent purple for headers
      fontWeight: '600',
      fontSize: '18px',
      marginBottom: '12px',
    },
    paragraph: {
      fontSize: '14px',
      lineHeight: '1.6',
      margin: '0 0 10px',
      color: '#5c4754', // Muted purple for readability
    },
    link: {
      color: '#9b4a7f', // Accent purple for links
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      display: 'block',
      marginBottom: '8px',
    },
    linkHover: {
      color: '#6b2d6c', // Darker purple for hover effect
    },
    list: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    listItem: {
      marginBottom: '8px',
    },
    servicesList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns
      gap: '30px',
      marginBottom: '20px', // To make the services section distance equal
    },
    appLink: {
      width: '150px',
      marginTop: '15px',
    },
    divider: {
      marginTop: '40px',
      borderTop: '1px solid #e5d7e1', // Subtle divider in matching tone
      textAlign: 'center',
      paddingTop: '20px',
      backgroundColor: '#6a4e72',
    },
    dividerText: {
      marginTop: '10px',
      marginBottom: '10px',
      fontSize: '12px',
      color: 'White', // Light muted purple for footer text
    },
    contactInfo: {
      fontSize: '14px',
      color: '#5c4754', // Muted purple for contact info
    },
  };

 


  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        <div style={styles.section}>
          <h4 style={styles.header}>Contact Information</h4>
          <p style={styles.paragraph}>
            Ready to book your car repair and maintenance service with Urja Automobile Garage? If yes, get ready
            to experience quality car repair solutions at affordable prices.
          </p>
          <p style={styles.paragraph}>
            We are just one click away if you are looking for excellence in car servicing and
            maintenance.
          </p>
        </div>

        <div style={styles.section}>
          <h4 style={styles.header}>Quick Links</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <a style={styles.link} href="#about">About Us</a>
            </li>
            <li style={styles.listItem}>
              <a style={styles.link} href="#contact">Contact Us</a>
            </li>
            <li style={styles.listItem}>
              <a style={styles.link} href="#faq">FAQ</a>
            </li>
            <li style={styles.listItem}>
              <a style={styles.link} href="#blog">Blog</a>
            </li>
            <li style={styles.listItem}>
              <a style={styles.link} href="#privacy">Privacy Policy</a>
            </li>
            <li style={styles.listItem}>
              <a style={styles.link} href="#terms">Terms and Conditions</a>
            </li>
          </ul>
        </div>

        <div style={styles.section}>
          <h4 style={styles.header}>Services</h4>
          <div style={styles.servicesList}>
            <div>
              <a style={styles.link} href="periodicservices">Periodic Services</a>
              <a style={styles.link} href="#denting">Denting and Painting</a>
              <a style={styles.link} href="#batteries">Batteries</a>
              <a style={styles.link} href="#carspa">Accidental Car Repair</a>
              <a style={styles.link} href="#acservice">Tyres and Wheels</a>
            </div>
            <div>
              <a style={styles.link} href="#insurance">Custom Services</a>
              <a style={styles.link} href="#windscreen">Windshield and Glass</a>
              <a style={styles.link} href="#lights">Lights and Fitments</a>
              <a style={styles.link} href="#decarbonization">Engine Decarbonization</a>
              <a style={styles.link} href="#wash">Car Wash</a>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h4 style={styles.header}>Quick Contact</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <b>Call Us:</b> +91-8080056951
            </li>
            <li style={styles.listItem}>
              <b>Email:</b> urjaautomotive@gmail.com
            </li>
            <p style={styles.contactInfo}>
              <b>Address:</b> Panchwati, Sri Ram Nagar, Konark Nagar, Nashik, Maharashtra 422006, India
            </p>
          </ul>
        </div>
      </div>
      <div style={styles.divider}>
        <p style={styles.dividerText}>
          Copyright © 2024 All rights Reserved UrjaAutomobile.
                </p>
        <br></br>
      </div>
    </footer>
  );
};

export default Footer;
