import React, { useState } from "react";
import "../assets/styles/login.css";
import { useNavigate } from "react-router-dom";
import { signUp, login } from "../Services/user-service"; 

const RegisterLoginPage = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = {
      name: isRegister ? formData.name : undefined,
      email: formData.email,
      password: formData.password,
      role: formData.role,

      
    };

    const isValidEmail = (email) => {
      // Regular expression for basic email validation
      const emailRegex = /^\S+@\S+\.\S+$/;
      return emailRegex.test(email);
    };
  
    const isValidPhoneNumber = (phoneNumber) => {
      // Regular expression for basic phone number validation (10 digits)
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phoneNumber);
    };
  
    const isValidPassword = (password) => {
      // Regular expressions for password validation
      const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
      const numberRegex = /[0-9]/;
      const upperCaseRegex = /[A-Z]/;
      const lowerCaseRegex = /[a-z]/;
      return (
        password.length >= 8 &&
        symbolRegex.test(password) &&
        numberRegex.test(password) &&
        upperCaseRegex.test(password) &&
        lowerCaseRegex.test(password)
      );
    };
  
    const isValidAge = (age) => {
      return parseInt(age) >= 18 && parseInt(age) <= 100;
    };
  
    const validateForm = () => {
      let newErrors = {};
  
      if (!formData.firstName) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.lastName) {
        newErrors.lastName = "Last name is required";
      }
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = "Phone number is required";
      } else if (!isValidPhoneNumber(formData.phoneNumber)) {
        newErrors.phoneNumber = "Phone number must be 10 digits";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (!isValidPassword(formData.password)) {
        newErrors.password =
          "Password must be at least 8 characters long and contain at least one symbol, one number, one uppercase letter, and one lowercase letter";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm password is required";
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Passwords must match";
      }
      if (!formData.age) {
        newErrors.age = "Age is required";
      } else if (!isValidAge(formData.age)) {
        newErrors.age =
          "You must be at least 18 years old and not older than 100 years";
      }
      if (!formData.gender) {
        newErrors.gender = "Gender is required";
      }
      if (formData.interests.length === 0) {
        newErrors.interests = "Select at least one interest";
      }
      if (!formData.birthDate) {
        newErrors.birthDate = "Date of birth is required";
      }
  
      setErrors(newErrors);
  
      return Object.keys(newErrors).length === 0;
    };

    try {
      const response = isRegister ? await signUp(user) : await login(user);
      localStorage.setItem("userId", response.id);
      navigate(response.role === "MERCHANT" ? "/merchant" : "/user");
    } catch (error) {
      setError(isRegister ? "Registration failed. Please try again." : "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
    setError(""); // Reset error on form toggle
  };

  return (
    <div className="main-regis">
      <div className="register-page">
        <h2>{isRegister ? "Register" : "Login"}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="input-field">
              <input
                type="text"
                name="name"
                placeholder=" " // Important for floating label effect
                value={formData.name}
                onChange={handleChange}
                required
                pattern=".{1,}" // At least one character required
              />
              <label>Name</label>
            </div>
          )}
          <div className="input-field">
            <input
              type="email"
              name="email"
              placeholder=" " // Important for floating label effect
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              name="password"
              placeholder=" " // Important for floating label effect
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>
          {isRegister && (
            <div className="radio-container">
              <label>Role</label>
              <div>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={formData.role === "customer"}
                    onChange={handleChange}
                  />
                  Customer
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="role"
                    value="merchant"
                    checked={formData.role === "merchant"}
                    onChange={handleChange}
                  />
                  Merchant
                </label>
              </div>
            </div>
          )}
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : (isRegister ? "Register" : "Login")}
          </button>
        </form>
        <div className="toggle-btn-container">
          {isRegister ? (
            <p>
              Already have an account?{" "}
              <button onClick={toggleForm} className="toggle-btn">Login</button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button onClick={toggleForm} className="toggle-btn">Register</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterLoginPage; 

