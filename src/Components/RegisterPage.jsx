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
    role: "user",  // Default to 'user'
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
      const user = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,  // user or merchant
      };

      signUp(user)
        .then((response) => {
          console.log("Registration successful:", response);
          // Store role in localStorage
          localStorage.setItem("userRole", formData.role); 
          if (formData.role === "merchant") {
            navigate("/merchant");
          } else {
            navigate("/user");
          }
        })
        .catch((error) => {
          console.error("Registration failed:", error);
          alert("Registration failed. Please try again.");
        });
    } else {
      const user = {
        email: formData.email,
        password: formData.password,
        role: formData.role,  // Retrieve selected role
      };

      login(user)
        .then((response) => {
          console.log("Login successful:", response);
          // Store token and user info in localStorage
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));
          localStorage.setItem("userRole", formData.role); // Store role in localStorage
          
          if (formData.role === "merchant") {
            navigate("/merchant");
          } else {
            navigate("/user");
          }
        })
        .catch((error) => {
          console.error("Login failed:", error);
          alert("Login failed. Please check your credentials.");
        });
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
            Don`t have an account?{" "}
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
