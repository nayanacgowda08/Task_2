// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./RegisterPage.css";
import "../../public/styles/login.css"

const RegisterLoginPage = () => {
  const [isRegister, setIsRegister] = useState(true); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      // Registration logic
      if (formData.role === "merchant") {
        navigate("/merchant");
      } else {
        navigate("/user");
      }
    } else {
      // Login logic
      // Here you can add authentication logic or redirect based on email/password validation
      if (formData.role === "merchant") {
        navigate("/merchant");
      } else {
        navigate("/user");
      }
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
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

        <div>
          <label>Role</label>
          <div>
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleChange}
              />
              End User
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

        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>

      <div>
        {isRegister ? (
          <p>
            Already have an account?{" "}
            <button onClick={toggleForm} className="toggle-btn">
              Login
            </button>
          </p>
        ) : (
          <p>
            Dont have an account?{" "}
            <button onClick={toggleForm} className="toggle-btn">
              Register
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterLoginPage;
