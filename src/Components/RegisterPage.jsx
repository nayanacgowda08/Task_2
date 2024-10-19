import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../public/styles/login.css"; 

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role is 'user'
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
    if (formData.role === "merchant") {
      navigate("/merchant");
    } else {
      navigate("/user");
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Register As</label>
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

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
