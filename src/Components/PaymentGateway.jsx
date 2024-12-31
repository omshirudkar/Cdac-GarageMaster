import React, { useState } from "react";

const PaymentGateway = () => {
    const [selectedMethod, setSelectedMethod] = useState("");
    const [showPopup, setShowPopup] = useState(false);  // State for pop-up visibility

    const handlePaymentSelection = (method) => {
        setSelectedMethod(method);
    };

    const handleProceed = () => {
        // Show confirmation pop-up when "Proceed" button is clicked
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        // Close the pop-up
        setShowPopup(false);
    };

    // Internal styles
    const styles = {
        container: {
            textAlign: "center",
            margin: "50px auto",
            maxWidth: "700px",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f9f9f9",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
        },
        title: {
            color: "#333",
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "10px",
        },
        methodsContainer: {
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
            gap: "15px",
            flexWrap: "wrap",
        },
        method: (isSelected) => ({
            border: `2px solid ${isSelected ? "#F37254" : "#ddd"}`,
            borderRadius: "8px",
            padding: "20px",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "150px",
            backgroundColor: isSelected ? "#fffcf6" : "#fff",
            boxShadow: isSelected ? "0 4px 12px rgba(243, 114, 84, 0.3)" : "none",
            transform: isSelected ? "scale(1.05)" : "scale(1)",
        }),
        logo: {
            width: "60px",
            height: "60px",
            objectFit: "contain",
            margin: "5px",
        },
        methodText: {
            marginTop: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#555",
        },
        details: {
            marginTop: "30px",
            textAlign: "left",
        },
        input: {
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "16px",
            outline: "none",
            transition: "border 0.3s ease",
        },
        button: {
            padding: "12px 30px",
            backgroundColor: "#F37254",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
        },
        buttonContainer: {
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "15px",
        },
        select: {
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            fontSize: "16px",
        },
        popup: {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        popupContent: {
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "10px",
            textAlign: "center",
            width: "300px",
        },
        closeButton: {
            padding: "10px 20px",
            backgroundColor: "#F37254",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "20px",
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Secure Payment</h2>
            <p>Select a payment method to continue.</p>

            {/* Payment Methods Section */}
            <div style={styles.methodsContainer}>
                <div
                    style={styles.method(selectedMethod === "card")}
                    onClick={() => handlePaymentSelection("card")}
                >
                    <div>
                        <img
                            src="https://cdn3.iconfinder.com/data/icons/payment-method-1/64/_Visa-512.png"
                            alt="Visa"
                            style={styles.logo}
                        />
                        <img
                            src="https://cdn3.iconfinder.com/data/icons/payment-method-1/64/_Mastercard-512.png"
                            alt="Mastercard"
                            style={styles.logo}
                        />
                        <img
                            src="https://cdn4.iconfinder.com/data/icons/circle-payment/32/payment_001-rupay-512.png"
                            alt="RuPay"
                            style={styles.logo}
                        />
                    </div>
                    <span style={styles.methodText}>Credit/Debit Card</span>
                </div>
                <div
                    style={styles.method(selectedMethod === "upi")}
                    onClick={() => handlePaymentSelection("upi")}
                >
                    <img
                        src="https://arpitatulsyan.com/wp-content/uploads/2020/03/upi-logo-png-4-600x180.png"
                        alt="UPI"
                        style={styles.logo}
                    />
                    <span style={styles.methodText}>UPI Payment</span>
                </div>
                <div
                    style={styles.method(selectedMethod === "wallet")}
                    onClick={() => handlePaymentSelection("wallet")}
                >
                    <div>
                        <img
                            src="https://cdn3.iconfinder.com/data/icons/payment-method-1/64/_Paypal-39-512.png"
                            alt="PayPal"
                            style={styles.logo}
                        />
                        <img
                            src="https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/436/Google_Pay_GPay_Logo-512.png"
                            alt="Google Pay"
                            style={styles.logo}
                        />
                    </div>
                    <span style={styles.methodText}>Wallets</span>
                </div>
                <div
                    style={styles.method(selectedMethod === "netbanking")}
                    onClick={() => handlePaymentSelection("netbanking")}
                >
                    <img
                        src="https://cdn1.iconfinder.com/data/icons/ecommerce-shopping-7/512/wallet_wallets_digital_wallet_money-512.png"
                        alt="Net Banking"
                        style={styles.logo}
                    />
                    <span style={styles.methodText}>Net Banking</span>
                </div>
            </div>

            {/* Payment Details Section */}
            <div style={styles.details}>
                {selectedMethod === "card" && (
                    <div>
                        <h3>Enter Card Details</h3>
                        <input
                            type="text"
                            placeholder="Cardholder Name"
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Card Number"
                            style={styles.input}
                        />
                        <div style={styles.expiryCvv}>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                style={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="CVV"
                                style={styles.input}
                            />
                        </div>
                        <button style={styles.button}>Pay Now</button>
                    </div>
                )}
                {selectedMethod === "upi" && (
                    <div>
                        <h3>Enter UPI ID</h3>
                        <input
                            type="text"
                            placeholder="e.g., user@upi"
                            style={styles.input}
                        />
                        <button style={styles.button} onClick={handleProceed}>Proceed</button>
                    </div>
                )}
                {selectedMethod === "wallet" && (
                    <div>
                        <h3>Select Wallet</h3>
                        <div style={styles.buttonContainer}>
                            <button style={styles.button}>PayPal</button>
                            <button style={styles.button}>Google Pay</button>
                        </div>
                    </div>
                )}
                {selectedMethod === "netbanking" && (
                    <div>
                        <h3>Select Your Bank</h3>
                        <select style={styles.select}>
                            <option value="sbi">State Bank of India</option>
                            <option value="hdfc">HDFC Bank</option>
                            <option value="icici">ICICI Bank</option>
                        </select>
                        <div style={styles.netBankingDetails}>
                            <button style={styles.button} onClick={handleProceed}>Proceed</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Confirmation Popup */}
            {showPopup && (
                <div style={styles.popup}>
                    <div style={styles.popupContent}>
                        <h3>Booking Confirmed</h3>
                        <p>Your booking has been successfully confirmed!</p>
                        <button style={styles.closeButton} onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentGateway;
