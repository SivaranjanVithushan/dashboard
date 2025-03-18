
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios'; // Import Axios
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // State for error message
  const navigate = useNavigate();
  const handleGoogleAuth = () => {
    console.log("Google Authentication Clicked");
  };

  const API_BASE_URL = 'http://localhost:5001/api/admin'; // Replace with your actual backend URL

  // Handle Login
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { Email: username, Password: password });

      // If login is successful, store token and redirect
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard'); // Navigate to dashboard after login
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(,rgb(242, 237, 248))' }}>
      <div className="card p-4 shadow-lg" style={{ width: '400px', borderRadius: '12px' }}>
        <h3 className="text-center mb-4">Admin Login</h3>

        {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}

        <div className="input-group mb-3">
          <span className="input-group-text"><FaUser /></span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text"><FaLock /></span>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button className="btn btn-success w-100 mb-3" onClick={handleLogin}>LOGIN</button>
        <button className="btn btn-danger w-100" onClick={handleGoogleAuth}>Sign in with Google</button>
        <p className="text-center mt-3">
          <span>Don't have an account? </span>
          <button className="btn btn-link p-0" onClick={() => navigate('/register')}>Create your Account</button>
        </p>
      </div>
    </div>
  );
};

export default Login;

