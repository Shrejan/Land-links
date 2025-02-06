import React, { useState } from "react";
import "./Create_ac.css";
import axios from "axios";

const Create_ac = () => {
  const [formData, setFormData] = useState({
    email: "",
    userId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email address";
    }
    if (formData.userId.length < 4) {
      newErrors.userId = "User ID must be at least 4 characters";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        localStorage.setItem("visited", "visited");
        setTimeout(() => {
          window.location.reload();
        },500)

        await axios.post(
          "https://land-links-backend.vercel.app/ac_creation/api/accounts",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
      } catch (error) {
        console.error("Errrrror:", error.response?.data || error.message);
      }
      
    }
    window.location.reload();
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">Create Account</h1>

        <div className="input-group">
          <label className="input-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            data-has-error={!!errors.email}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="input-group">
          <label className="input-label">User ID</label>
          <input
            className="form-input"
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            data-has-error={!!errors.userId}
          />
          {errors.userId && (
            <div className="error-message">{errors.userId}</div>
          )}
        </div>

        <div className="input-group">
          <label className="input-label">Password</label>
          <div className="password-input">
            <input
              className="form-input"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              data-has-error={!!errors.password}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>

        <button type="submit" className="submit-button">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Create_ac;
