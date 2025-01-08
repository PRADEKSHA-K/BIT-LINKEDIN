import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpComponent.css';

const SignUpComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.name) {
      isValid = false;
      formErrors.name = 'Name is required';
    }

    if (!formData.email) {
      isValid = false;
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      formErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      isValid = false;
      formErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      isValid = false;
      formErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.confirmPassword !== formData.password) {
      isValid = false;
      formErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(formErrors);
    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Sign-Up submitted', formData);
      navigate('/login');
    }
  };

  const googleSignIn = () => {
    console.log('Google Sign In clicked');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`signup-form ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <button onClick={toggleDarkMode} className="toggle-mode-button">
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            name="name"
            className="signup-form__input"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            className="signup-form__input"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            name="password"
            className="signup-form__input"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            className="signup-form__input"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" className="signup-form__submit">Sign Up</button>
      </form>
      <button onClick={googleSignIn} className="signup-options__google">Sign up with Google</button>
    </div>
  );
};

export default SignUpComponent;
