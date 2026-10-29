import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage('');
    if (successMessage) setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      setSuccessMessage(data.message || 'Account created successfully!');
      setFormData({ email: '', password: '' });
    } catch (err) {
      setErrorMessage(err.message || 'Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-card">
      {/* Top Circular User Avatar Icon */}
      <div className="avatar-wrapper">
        <svg
          className="avatar-icon"
          viewBox="0 0 64 64"
          fill="none"
          stroke="#f27c7c"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <circle cx="32" cy="32" r="30" />
          <circle cx="32" cy="23" r="8" />
          <path
            d="M18 47c0-7.73 6.27-14 14-14s14 6.27 14 14"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Header Title */}
      <h1 className="signup-title">Signup</h1>

      {/* Horizontal Divider Line */}
      <div className="card-divider" />

      {/* Alert Notifications */}
      {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <div className="input-line-wrapper">
            <svg
              className="field-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="line-input"
              required
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password" className="field-label">
            Password
          </label>
          <div className="input-line-wrapper">
            <svg
              className="field-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="••••••••••••"
              className="line-input password-field"
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="btn-wrapper">
          <button type="submit" className="signup-submit-btn" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign me up'}
          </button>
        </div>

        {/* Footer Login Link */}
        <div className="signup-footer">
          <span>Already have an account? </span>
          <a
            href="#login"
            className="login-link"
            onClick={(e) => {
              e.preventDefault();
              alert('Redirecting to login...');
            }}
          >
            Log In
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
