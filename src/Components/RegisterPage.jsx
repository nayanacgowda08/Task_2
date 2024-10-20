// eslint-disable-next-line no-unused-vars
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
    const user = {
      name: isRegister ? formData.name : undefined,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    try {
      const response = isRegister ? await signUp(user) : await login(user);
      localStorage.setItem("userId", response.id);
      navigate(response.role === "MERCHANT" ? "/merchant" : "/user");
    } catch (error) {
      alert(isRegister ? "Registration failed. Please try again." : "Login failed. Please check your credentials.");
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
  };

  return (
    <div className="register-page">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {isRegister && (
          <div>
            <label>Role</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={formData.role === "customer"}
                  onChange={handleChange}
                />
                Customer
              </label>
              <label>
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
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <div>
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
  );
};

export default RegisterLoginPage;