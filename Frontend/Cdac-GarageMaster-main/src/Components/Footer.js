import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#f7f3f0", // Light beige for soft appearance
      color: "#4c3d4e", // Deep muted purple for text
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
    },
    footerContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      maxWidth: "1100px",
      margin: "0 auto",
    },
    section: {
      flex: "1",
      minWidth: "250px",
      padding: "15px",
      textAlign: "left",
    },
    header: {
      color: "#9b4a7f", // Accent purple for headers
      fontWeight: "bold",
      fontSize: "18px",
      marginBottom: "12px",
      borderBottom: "2px solid #9b4a7f",
      paddingBottom: "5px",
    },
    paragraph: {
      fontSize: "14px",
      lineHeight: "1.6",
      margin: "0 0 10px",
      color: "#5c4754",
    },
    link: {
      color: "#9b4a7f",
      textDecoration: "none",
      transition: "color 0.3s ease",
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      fontWeight: "500",
    },
    linkHover: {
      color: "#6b2d6c",
    },
    list: {
      listStyle: "none",
      padding: "0",
      margin: "0",
    },
    listItem: {
      marginBottom: "8px",
    },
    servicesList: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "10px",
    },
    contactInfo: {
      fontSize: "14px",
      color: "#5c4754",
    },
    divider: {
      marginTop: "40px",
      borderTop: "1px solid #ddd",
      textAlign: "center",
      paddingTop: "20px",
      backgroundColor: "#e8d8d0",
    },
    dividerText: {
      fontSize: "12px",
      color: "#333",
      fontWeight: "500",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        {/* Contact Information */}
        <div style={styles.section}>
          <h4 style={styles.header}>Contact Information</h4>
          <p style={styles.paragraph}>
            Ready to book your car repair and maintenance service with Urja
            Automobile Garage? Get ready to experience quality service at
            affordable prices.
          </p>
          <p style={styles.paragraph}>
            We are just one click away if you are looking for excellence in car
            servicing and maintenance.
          </p>
        </div>

        {/* Quick Links */}
        <div style={styles.section}>
          <h4 style={styles.header}>Quick Links</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <a style={styles.link} href="#about">
                About Us
              </a>
            </li>
            <li style={styles.listItem}>
              <a style={styles.link} href="#contact">
                Contact Us
              </a>
            </li>
            <li style={styles.listItem}>
              <a style={styles.link} href="#faq">
                FAQ
              </a>
            </li>
            <li style={styles.listItem}>
              <a style={styles.link} href="#blog">
                Blog
              </a>
            </li>
            <li style={styles.listItem}>
              <a style={styles.link} href="#privacy">
                Privacy Policy
              </a>
            </li>
            <li style={styles.listItem}>
              <a style={styles.link} href="#terms">
                Terms and Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div style={styles.section}>
          <h4 style={styles.header}>Services</h4>
          <div style={styles.servicesList}>
            <div>
              <a style={styles.link} href="#periodicservices">
                Periodic Services
              </a>
              <a style={styles.link} href="#denting">
                Denting and Painting
              </a>
              <a style={styles.link} href="#batteries">
                Batteries
              </a>
              <a style={styles.link} href="#carspa">
                Accidental Car Repair
              </a>
              <a style={styles.link} href="#tyres">
                Tyres and Wheels
              </a>
            </div>
            <div>
              <a style={styles.link} href="#insurance">
                Custom Services
              </a>
              <a style={styles.link} href="#windscreen">
                Windshield and Glass
              </a>
              <a style={styles.link} href="#lights">
                Lights and Fitments
              </a>
              <a style={styles.link} href="#decarbonization">
                Engine Decarbonization
              </a>
              <a style={styles.link} href="#wash">
                Car Wash
              </a>
            </div>
          </div>
        </div>

        {/* Quick Contact */}
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
              <b>Address:</b> Panchwati, Sri Ram Nagar, Konark Nagar, Nashik,
              Maharashtra 422006, India
            </p>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={styles.divider}>
        <p style={styles.dividerText}>
          Copyright © 2024 All rights Reserved UrjaAutomobile.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
