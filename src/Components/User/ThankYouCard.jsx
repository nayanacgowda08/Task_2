import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ThankYouCard() {
    const navigate = useNavigate();
    
    const handleViewOrder = () => {
        navigate("/user/orders");
    };

    const handleContinueShopping = () => {
        navigate("/user");
    };

    return (
        <div style={styles.card}>
            <div style={styles.iconContainer}>
                <div style={styles.checkIcon}>✔️</div>
                <div style={styles.particles}>
                    {[...Array(20)].map((_, i) => (
                        <div key={i} style={{ ...styles.particle, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
                    ))}
                </div>
            </div>
            <h2 style={styles.title}>Thank you for ordering!</h2>
            <p style={styles.subtitle}>Your order was placed successfully.</p>
            <div style={styles.buttonContainer}>
                <button style={styles.viewOrderButton} onClick={handleViewOrder}>VIEW ORDER</button>
                <button style={styles.continueButton} onClick={handleContinueShopping}>CONTINUE SHOPPING</button>
            </div>
        </div>
    );
}

const styles = {
    card: {
      maxWidth: "450px",
      backgroundColor: "#f4f7fb", // Soft pastel blue-grey
      borderRadius: "12px",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
      padding: "25px",
      textAlign: "center",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    },
    iconContainer: {
      position: "relative",
      margin: "0 auto",
      width: "70px",
      height: "70px",
      borderRadius: "50%",
      backgroundColor: "#4CAF50", // Success green
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
    },
    checkIcon: {
      color: "#fff",
      fontSize: "28px",
    },
    particles: {
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      overflow: "visible",
    },
    title: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#333",
      margin: "12px 0",
    },
    subtitle: {
      fontSize: "15px",
      color: "#666",
      margin: "12px 0 22px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "12px",
    },
    viewOrderButton: {
      padding: "12px 24px",
      borderRadius: "6px",
      backgroundColor: "#1E88E5", // Cool blue for secondary action
      color: "#fff",
      border: "1px solid #1E88E5",
      cursor: "pointer",
      fontSize: "15px",
    },
    continueButton: {
      padding: "12px 24px",
      borderRadius: "6px",
      backgroundColor: "#FF7043", // Warm coral for primary action
      color: "#fff",
      border: "none",
      cursor: "pointer",
      fontSize: "15px",
    },
  };
  
export default ThankYouCard;
