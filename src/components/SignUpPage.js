import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = ({ onSignUp }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verifyPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.verifyPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (formData.firstName && formData.lastName && formData.email && formData.password) {
      onSignUp({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        role: 'student'
      });
      navigate('/student');
    }
  };

  const handleGoogleResponse = useCallback((response) => {
    try {
      // Decode the JWT token to get user info
      const userObject = JSON.parse(atob(response.credential.split('.')[1]));
      
      onSignUp({ 
        email: userObject.email, 
        firstName: userObject.given_name || '',
        lastName: userObject.family_name || '',
        name: userObject.name,
        picture: userObject.picture,
        role: 'student' 
      });
      navigate('/student');
    } catch (error) {
      console.error('Google signup error:', error);
    }
  }, [onSignUp, navigate]);

  useEffect(() => {
    // Initialize Google Identity Services
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse
      });
    }
  }, [handleGoogleResponse]);

  const handleGoogleSignUp = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="head-illustration">
          <svg viewBox="0 0 400 400" className="head-svg">
            {/* Abstract background shapes */}
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E3F2FD" />
                <stop offset="100%" stopColor="#BBDEFB" />
              </linearGradient>
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8F5E8" />
                <stop offset="100%" stopColor="#C8E6C9" />
              </linearGradient>
              <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF3E0" />
                <stop offset="100%" stopColor="#FFE0B2" />
              </linearGradient>
            </defs>
            
            {/* Background abstract shapes */}
            <path d="M50 50 Q150 20 250 80 L300 150 Q200 200 100 150 Z" fill="url(#blueGradient)" opacity="0.6"/>
            <path d="M300 100 Q350 150 380 250 L350 350 Q250 320 200 250 Z" fill="url(#greenGradient)" opacity="0.6"/>
            <path d="M20 250 Q80 300 150 350 L250 380 Q200 300 120 280 Z" fill="url(#orangeGradient)" opacity="0.6"/>
            
            {/* Human head silhouette */}
            <path 
              d="M200 80 C240 80 270 110 270 150 C270 170 265 185 255 200 C260 220 255 240 245 250 C240 260 230 270 220 280 C210 290 200 300 200 300 C200 300 190 290 180 280 C170 270 160 260 155 250 C145 240 140 220 145 200 C135 185 130 170 130 150 C130 110 160 80 200 80 Z" 
              fill="#9CB4D8" 
              opacity="0.8"
            />
            
            {/* Form fields positioned on the head */}
            {/* First Name field */}
            <g transform="translate(120, 120)">
              <rect x="0" y="0" width="60" height="25" fill="white" rx="12" stroke="#E0E0E0" strokeWidth="1"/>
              <text x="5" y="12" fontSize="8" fill="#666">FIRST NAME</text>
              <circle cx="8" cy="20" r="3" fill="#FF9800"/>
            </g>
            
            {/* Last Name field */}
            <g transform="translate(220, 120)">
              <rect x="0" y="0" width="60" height="25" fill="white" rx="12" stroke="#E0E0E0" strokeWidth="1"/>
              <text x="5" y="12" fontSize="8" fill="#666">LAST NAME</text>
              <circle cx="8" cy="20" r="3" fill="#F44336"/>
            </g>
            
            {/* Email field */}
            <g transform="translate(150, 170)">
              <rect x="0" y="0" width="100" height="25" fill="white" rx="12" stroke="#E0E0E0" strokeWidth="1"/>
              <text x="5" y="12" fontSize="8" fill="#666">Email</text>
              <text x="5" y="22" fontSize="6" fill="#999">example@gmail.com</text>
              <rect x="85" y="15" width="10" height="6" fill="#757575" rx="1"/>
            </g>
            
            {/* Password field */}
            <g transform="translate(150, 210)">
              <rect x="0" y="0" width="100" height="25" fill="white" rx="12" stroke="#E0E0E0" strokeWidth="1"/>
              <text x="5" y="12" fontSize="8" fill="#666">Password</text>
              <text x="5" y="22" fontSize="6" fill="#999">••••••••••</text>
              <rect x="82" y="15" width="12" height="6" fill="#757575" rx="1"/>
              <circle cx="88" cy="18" r="1" fill="white"/>
            </g>
            
            {/* Verify Password field */}
            <g transform="translate(150, 250)">
              <rect x="0" y="0" width="100" height="25" fill="white" rx="12" stroke="#E0E0E0" strokeWidth="1"/>
              <text x="5" y="12" fontSize="8" fill="#666">Verify Password</text>
              <text x="5" y="22" fontSize="6" fill="#999">••••••••••</text>
              <rect x="82" y="15" width="12" height="6" fill="#757575" rx="1"/>
              <circle cx="88" cy="18" r="1" fill="white"/>
            </g>
            
            {/* Decorative elements */}
            <circle cx="80" cy="160" r="3" fill="#4CAF50" opacity="0.7"/>
            <circle cx="320" cy="180" r="4" fill="#2196F3" opacity="0.7"/>
            <circle cx="90" cy="250" r="2" fill="#FF9800" opacity="0.7"/>
            <circle cx="310" cy="240" r="3" fill="#9C27B0" opacity="0.7"/>
            
            {/* Connecting lines */}
            <path d="M80 160 Q120 180 150 190" stroke="#E0E0E0" strokeWidth="2" fill="none" opacity="0.5"/>
            <path d="M320 180 Q280 200 250 210" stroke="#E0E0E0" strokeWidth="2" fill="none" opacity="0.5"/>
          </svg>
        </div>
      </div>
      
      <div className="signup-right">
        <div className="signup-form-container">
          <div className="signup-header">
            <h1>Create Account</h1>
            <p>Join CodePlays today</p>
          </div>
          
          <form onSubmit={handleSignUp} className="signup-form">
            <button type="button" className="google-signup-btn" onClick={handleGoogleSignUp}>
              <svg className="google-icon" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>
            
            <div className="divider">
              <span>OR</span>
            </div>
            
            <div className="name-row">
              <div className="input-group half-width">
                <label htmlFor="firstName">First Name</label>
                <div className="input-container">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    required
                  />
                </div>
              </div>
              
              <div className="input-group half-width">
                <label htmlFor="lastName">Last Name</label>
                <div className="input-container">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@gmail.com"
                  required
                />
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••••"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    {showPassword ? (
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                    ) : (
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    )}
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="verifyPassword">Verify Password</label>
              <div className="input-container">
                <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                <input
                  type={showVerifyPassword ? "text" : "password"}
                  id="verifyPassword"
                  name="verifyPassword"
                  value={formData.verifyPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••••"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    {showVerifyPassword ? (
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                    ) : (
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    )}
                  </svg>
                </button>
              </div>
            </div>
            
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
            
            <p className="login-link">
              Already have an account? 
              <button type="button" onClick={handleLoginRedirect} className="login-redirect-btn">
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
