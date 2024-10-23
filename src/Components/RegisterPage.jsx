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
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const validateForm = () => {
  //   const { email, password, name } = formData;
    
  //   if (isRegister && !name) {
  //     setError("Name is required.");
  //     return false;
  //   }
  //   if(isRegister && name && name.length >30){
  //     setError("Name cannot be exceeded more than 30 character.");
  //     return false;
  //   }
  //   if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
  //     setError("A valid email is required.");
  //     return false;
  //   }
  //   if (
  //     !password ||
  //     !/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z]).{8,}/.test(password)
  //   ) {
  //     setError(
  //       "Password must be at least 8 characters long and include a number, a special character, an uppercase and a lowercase letter."
  //     );
  //     return false;
  //   }
  //   return true;
  // };

  const validateForm = () => {
    const { email, password, name } = formData;
    let isValid = true;
    let newErrors = { name: "", email: "", password: "" };
  
    if (isRegister && !name) {
      newErrors.name = "Name is required.";
      isValid = false;
    } else if (isRegister && name.length > 30) {
      newErrors.name = "Name cannot exceed 30 characters.";
      isValid = false;
    }
  
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "A valid email is required.";
      isValid = false;
    }
  
    if (!password || !/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z]).{8,}/.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include a number, a special character, an uppercase and a lowercase letter.";
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const user = {
      name: isRegister ? formData.name : undefined,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    try {
      const response = isRegister ? await signUp(user) : await login(user);
      localStorage.setItem("userId", response.id);
      if(response.role){
      navigate(response.role === "MERCHANT" ? "/merchant" : "/user");
      }
      else{
        setError(response.message);
      }
    } catch (error) {
      console.log(error);
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
    setError(""); 
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
        placeholder=" "
        value={formData.name}
        onChange={handleChange}
        required
      />
      <label>Name</label>
      {errors.name && <p className="error-message">{errors.name}</p>}
    </div>
  )}
  <div className="input-field">
    <input
      type="email"
      name="email"
      placeholder=" "
      value={formData.email}
      onChange={handleChange}
      required
    />
    <label>Email</label>
    {errors.email && <p className="error-message">{errors.email}</p>}
  </div>
  <div className="input-field">
    <input
      type="password"
      name="password"
      placeholder=" "
      value={formData.password}
      onChange={handleChange}
      required
    />
    <label>Password</label>
    {errors.password && <p className="error-message">{errors.password}</p>}
  </div>
          {isRegister && (
            <div className="radio-container">
              <label>Register as</label>
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
            {loading ? "Loading..." : isRegister ? "Register" : "Login"}
          </button>
        </form>
        <div className="toggle-btn-container">
          {isRegister ? (
            <p>
              Already have an account?{" "}
              <button onClick={toggleForm} className="toggle-btn">
                Login
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button onClick={toggleForm} className="toggle-btn">
                Register
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterLoginPage;
