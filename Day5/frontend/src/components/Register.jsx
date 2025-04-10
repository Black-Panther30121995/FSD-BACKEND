import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';

const Register = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Form submitted with:', { name, age }); // Debug log
    if (!name.trim() || !age.trim()) {
      setMessage("Please enter both name and age");
      return;
    }
    const user = { name, age };
    try {
      await axios.post("https://fsd-backend-5.onrender.com/users", user);
      alert("User Registered successfully!!");
      setName('');
      setAge('');
      setMessage("Registration successful");
    } catch (error) {
      setMessage("Registration failed");
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">User Registration</h2>
      <form
        onSubmit={handleRegister}
        className="register-form d-flex flex-column align-items-center"
        autoComplete="off"
      >
        <div className="input-group w-100">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control register-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group w-100">
          <label className="form-label">Age:</label>
          <input
            type="text"
            className="form-control register-input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" className="btn register-button">
            Register
          </button>
        </div>
      </form>
      {message && (
        <p className={`message text-center mt-3 ${message.includes("failed") ? "error" : "success"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Register;