import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import useSound from 'use-sound';


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
        maxWidth: '450px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
        padding: '25px',
        textAlign: 'center',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
    },
    iconContainer: {
        position: 'relative',
        margin: '0 auto',
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        backgroundColor: '#ff7043',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px'
    },
    checkIcon: {
        color: '#fff',
        fontSize: '28px'
    },
    particles: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        overflow: 'visible',
    },
    particle: {
        position: 'absolute',
        width: '8px',
        height: '8px',
        backgroundColor: '#ff7043',
        borderRadius: '50%',
    },
    title: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#333',
        margin: '12px 0',
    },
    subtitle: {
        fontSize: '15px',
        color: '#666',
        margin: '12px 0 22px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
    },
    viewOrderButton: {
        padding: '12px 24px',
        borderRadius: '6px',
        backgroundColor: '#fff',
        color: '#333',
        border: '1px solid #ddd',
        cursor: 'pointer',
        fontSize: '15px',
    },
    continueButton: {
        padding: '12px 24px',
        borderRadius: '6px',
        backgroundColor: '#ff7043',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '15px',
    },
};

export default ThankYouCard;
