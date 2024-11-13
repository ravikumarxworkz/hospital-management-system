import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerPatient } from "../services/patientService";  // Assuming patientService.js contains the API call
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterPatient = () => {
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    country: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    if (!patientData.firstName) newErrors.firstName = "First name is required";
    if (!patientData.lastName) newErrors.lastName = "Last name is required";
    if (!patientData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(patientData.email))
      newErrors.email = "Email is invalid";
    if (!patientData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (!/^\d{10}$/.test(patientData.phoneNumber))
      newErrors.phoneNumber = "Phone number must be 10 digits";
    if (!patientData.password) newErrors.password = "Password is required";
    if (!patientData.gender) newErrors.gender = "Gender is required";
    if (!patientData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    if (!patientData.address) newErrors.address = "Address is required";
    if (!patientData.city) newErrors.city = "City is required";
    if (!patientData.state) newErrors.state = "State is required";
    if (!patientData.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await registerPatient(patientData); // Assuming this is an API call
      setMessage("Patient registered successfully!");
      setPatientData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
        address: "",
        city: "",
        state: "",
        country: "",
        password: "",
      });
      setErrors({});
    } catch (error) {
      setMessage(`Registration failed: ${error.message}`);
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h3 className="text-center mb-4">Register Patient</h3>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              name="firstName"
              value={patientData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              name="lastName"
              value={patientData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              name="email"
              value={patientData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className={`form-control ${
                errors.phoneNumber ? "is-invalid" : ""
              }`}
              name="phoneNumber"
              value={patientData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <div className="invalid-feedback">{errors.phoneNumber}</div>
            )}
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className={`form-control ${errors.gender ? "is-invalid" : ""}`}
              name="gender"
              value={patientData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <div className="invalid-feedback">{errors.gender}</div>
            )}
          </div>

          {/* Date of Birth */}
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className={`form-control ${
                errors.dateOfBirth ? "is-invalid" : ""
              }`}
              name="dateOfBirth"
              value={patientData.dateOfBirth}
              onChange={handleChange}
            />
            {errors.dateOfBirth && (
              <div className="invalid-feedback">{errors.dateOfBirth}</div>
            )}
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              name="address"
              value={patientData.address}
              onChange={handleChange}
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>

          {/* City */}
          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
              name="city"
              value={patientData.city}
              onChange={handleChange}
            />
            {errors.city && (
              <div className="invalid-feedback">{errors.city}</div>
            )}
          </div>

          {/* State */}
          <div className="mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              className={`form-control ${errors.state ? "is-invalid" : ""}`}
              name="state"
              value={patientData.state}
              onChange={handleChange}
            />
            {errors.state && (
              <div className="invalid-feedback">{errors.state}</div>
            )}
          </div>

          {/* Country */}
          <div className="mb-3">
            <label className="form-label">Country</label>
            <input
              type="text"
              className={`form-control ${errors.country ? "is-invalid" : ""}`}
              name="country"
              value={patientData.country}
              onChange={handleChange}
            />
            {errors.country && (
              <div className="invalid-feedback">{errors.country}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              name="password"
              value={patientData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        <div className="text-center">
          <Link to="/" className=" btn btn-primary mt-4">
            Home
          </Link>
          <Link to="/login" className="btn btn-primary mt-4 ml-4">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPatient;
