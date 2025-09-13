import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LearningService } from '../services/supabaseClient';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login logic
    if (email && password) {
      onLogin({ email, role: 'student' });
      navigate('/student');
    }
  };

  const handleGoogleResponse = useCallback(async (response) => {
    try {
      // Decode the JWT token to get user info
      const userObject = JSON.parse(atob(response.credential.split('.')[1]));
      let user = userObject;
      // Check if user exists in our database
      let userData = {
        id: user.id || 'demo-user',
        email: user.email || email,
        name: user.user_metadata?.name || user.email.split('@')[0],
        role: 'student', // Default role
        avatar: user.user_metadata?.avatar_url
      };

      // Try to get actual user data from database or create new user
      try {
        const existingUser = await LearningService.getUserByEmail(user.email);
        if (existingUser) {
          userData = {
            ...userData,
            role: existingUser.role || 'student',
            grade: existingUser.grade,
            class: existingUser.class,
            phone: existingUser.phone,
            school: existingUser.school
          };
          
          // Update last login
          await LearningService.updateUserLastLogin(existingUser.id);
        } else {
          // Create new user in database
          const newUser = await LearningService.createUser({
            email: user.email,
            name: user.name || user.email.split('@')[0],
            role: 'student',
            avatar_url: user.picture,
            google_id: user.sub,
            last_login: new Date().toISOString(),
            login_count: 1
          });
          
          if (newUser) {
            userData = { ...userData, ...newUser };
          }
        }
      } catch (error) {
        console.error('Database user operation failed:', error);
        // Fallback - still allow login but with basic data
        userData.role = 'student';
      }
      
      onLogin(userData);
    } catch (error) {
      console.error('Google login error:', error);
    }
  }, [onLogin, navigate]);

  useEffect(() => {
    // Initialize Google Identity Services with renderButton approach
    const initializeGoogle = () => {
      if (window.google && window.google.accounts) {
        try {
          window.google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: true
          });

          // Render the Google button directly
          const googleButtonDiv = document.getElementById('google-signin-button');
          if (googleButtonDiv) {
            window.google.accounts.id.renderButton(googleButtonDiv, {
              theme: 'outline',
              size: 'large',
              text: 'signin_with',
              shape: 'rectangular',
              width: '100%'
            });
          }
          
          console.log('Google Identity Services initialized successfully');
        } catch (error) {
          console.error('Failed to initialize Google Identity Services:', error);
        }
      } else {
        // Retry after a short delay if Google script hasn't loaded yet
        setTimeout(initializeGoogle, 100);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initializeGoogle, 500);
    return () => clearTimeout(timer);
  }, [handleGoogleResponse]);

  const handleGoogleLogin = () => {
    try {
      console.log('Google login button clicked - fallback method');
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.prompt((notification) => {
          console.log('Google prompt notification:', notification);
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.log('Google One Tap not displayed or skipped');
          }
        });
      } else {
        console.error('Google Identity Services not available');
        alert('Google login is not available. Please try again later.');
      }
    } catch (error) {
      console.error('Error triggering Google login:', error);
      alert('Failed to start Google login. Please try again.');
    }
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="brain-illustration">
          <svg viewBox="0 0 400 400" className="brain-svg">
            {/* Main brain outline */}
            <path 
              d="M200 50 C280 50 340 110 340 190 C340 220 330 250 310 270 C320 290 315 320 290 340 C270 360 240 370 200 370 C160 370 130 360 110 340 C85 320 80 290 90 270 C70 250 60 220 60 190 C60 110 120 50 200 50 Z" 
              fill="none" 
              stroke="#4A90E2" 
              strokeWidth="4" 
              className="main-circle"
            />
            
            {/* Brain center with detailed anatomy */}
            <g transform="translate(180, 220)">
              <circle cx="20" cy="0" r="25" fill="#00D4AA" className="brain-center"/>
              <path d="M5 -15 Q20 -25 35 -15 Q35 15 20 25 Q5 15 5 -15" fill="#4DD0E1" opacity="0.8"/>
              <path d="M10 -10 C15 -15 25 -15 30 -10" stroke="#0277BD" strokeWidth="1.5" fill="none"/>
              <path d="M10 0 C15 -5 25 -5 30 0" stroke="#0277BD" strokeWidth="1.5" fill="none"/>
              <path d="M10 10 C15 5 25 5 30 10" stroke="#0277BD" strokeWidth="1.5" fill="none"/>
            </g>
            
            {/* Book icon - top left */}
            <g transform="translate(110, 100)">
              <rect x="0" y="0" width="28" height="20" fill="#4A90E2" rx="2"/>
              <rect x="2" y="2" width="24" height="16" fill="white"/>
              <line x1="14" y1="2" x2="14" y2="18" stroke="#4A90E2" strokeWidth="1"/>
              <line x1="5" y1="6" x2="12" y2="6" stroke="#4A90E2" strokeWidth="0.8"/>
              <line x1="5" y1="9" x2="12" y2="9" stroke="#4A90E2" strokeWidth="0.8"/>
              <line x1="16" y1="6" x2="23" y2="6" stroke="#4A90E2" strokeWidth="0.8"/>
              <line x1="16" y1="9" x2="23" y2="9" stroke="#4A90E2" strokeWidth="0.8"/>
            </g>
            
            {/* Lightbulb icon - top right */}
            <g transform="translate(270, 100)">
              <circle cx="15" cy="12" r="10" fill="none" stroke="#4A90E2" strokeWidth="3"/>
              <rect x="10" y="22" width="10" height="6" fill="none" stroke="#4A90E2" strokeWidth="2" rx="1"/>
              <line x1="15" y1="28" x2="15" y2="32" stroke="#4A90E2" strokeWidth="2"/>
              <line x1="6" y1="6" x2="10" y2="10" stroke="#4A90E2" strokeWidth="2"/>
              <line x1="20" y1="10" x2="24" y2="6" stroke="#4A90E2" strokeWidth="2"/>
              <line x1="30" y1="12" x2="34" y2="12" stroke="#4A90E2" strokeWidth="2"/>
              <circle cx="15" cy="12" r="3" fill="#FFD54F"/>
            </g>
            
            {/* Trophy icon - bottom right */}
            <g transform="translate(270, 280)">
              <rect x="8" y="15" width="14" height="8" fill="#4A90E2" rx="2"/>
              <path d="M6 8 Q15 4 24 8 L22 15 L8 15 Z" fill="#FFD700" stroke="#4A90E2" strokeWidth="2"/>
              <circle cx="4" cy="12" r="3" fill="none" stroke="#4A90E2" strokeWidth="2"/>
              <circle cx="26" cy="12" r="3" fill="none" stroke="#4A90E2" strokeWidth="2"/>
              <rect x="12" y="23" width="6" height="4" fill="#4A90E2"/>
              <rect x="10" y="27" width="10" height="2" fill="#4A90E2"/>
            </g>
            
            {/* Chart icon - bottom left */}
            <g transform="translate(110, 290)">
              <rect x="2" y="20" width="4" height="8" fill="#4CAF50"/>
              <rect x="8" y="16" width="4" height="12" fill="#4CAF50"/>
              <rect x="14" y="12" width="4" height="16" fill="#4CAF50"/>
              <rect x="20" y="8" width="4" height="20" fill="#4CAF50"/>
              <rect x="26" y="14" width="4" height="14" fill="#4CAF50"/>
              <line x1="0" y1="30" x2="32" y2="30" stroke="#4A90E2" strokeWidth="2"/>
              <line x1="0" y1="30" x2="0" y2="6" stroke="#4A90E2" strokeWidth="2"/>
            </g>
            
            {/* Connecting pathways and nodes */}
            <circle cx="60" cy="80" r="6" fill="#4A90E2"/>
            <circle cx="340" cy="80" r="6" fill="#4A90E2"/>
            <circle cx="60" cy="320" r="6" fill="#4A90E2"/>
            <circle cx="340" cy="320" r="6" fill="#4A90E2"/>
            <circle cx="30" cy="200" r="6" fill="#4A90E2"/>
            <circle cx="370" cy="200" r="6" fill="#4A90E2"/>
            <circle cx="200" cy="30" r="6" fill="#4A90E2"/>
            <circle cx="200" cy="370" r="6" fill="#4A90E2"/>
            
            {/* Neural pathways */}
            <path d="M60 80 Q120 120 160 200" stroke="#4A90E2" strokeWidth="3" fill="none" opacity="0.8"/>
            <path d="M340 80 Q280 120 240 200" stroke="#4A90E2" strokeWidth="3" fill="none" opacity="0.8"/>
            <path d="M60 320 Q120 280 160 200" stroke="#4A90E2" strokeWidth="3" fill="none" opacity="0.8"/>
            <path d="M340 320 Q280 280 240 200" stroke="#4A90E2" strokeWidth="3" fill="none" opacity="0.8"/>
            <path d="M30 200 Q100 200 160 200" stroke="#4A90E2" strokeWidth="3" fill="none" opacity="0.8"/>
            <path d="M370 200 Q300 200 240 200" stroke="#4A90E2" strokeWidth="3" fill="none" opacity="0.8"/>
            <path d="M200 30 Q200 100 200 160" stroke="#4A90E2" strokeWidth="3" fill="none" opacity="0.8"/>
            <path d="M200 370 Q200 300 200 240" stroke="#4A90E2" strokeWidth="3" fill="none" opacity="0.8"/>
            
            {/* Additional smaller nodes */}
            <circle cx="90" cy="150" r="3" fill="#00D4AA"/>
            <circle cx="310" cy="150" r="3" fill="#00D4AA"/>
            <circle cx="90" cy="250" r="3" fill="#00D4AA"/>
            <circle cx="310" cy="250" r="3" fill="#00D4AA"/>
            <circle cx="150" cy="90" r="3" fill="#00D4AA"/>
            <circle cx="250" cy="90" r="3" fill="#00D4AA"/>
            <circle cx="150" cy="310" r="3" fill="#00D4AA"/>
            <circle cx="250" cy="310" r="3" fill="#00D4AA"/>
            
            {/* Data flow arrows */}
            <g transform="translate(80, 340)">
              <path d="M0 0 L20 -20" stroke="#4A90E2" strokeWidth="3" markerEnd="url(#arrowhead)"/>
            </g>
            <g transform="translate(320, 60)">
              <path d="M0 0 L-20 20" stroke="#4A90E2" strokeWidth="3" markerEnd="url(#arrowhead)"/>
            </g>
            
            {/* Arrow marker definition */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#4A90E2"/>
              </marker>
            </defs>
          </svg>
        </div>
      </div>
      
      <div className="login-right">
        <div className="login-form-container">
          <div className="login-header">
            <h1>Welcome to</h1>
            <h1 className="brand-name">CodePlays</h1>
          </div>
          
          <form onSubmit={handleLogin} className="login-form">
            {/* Google Sign-In Button Container */}
            <div id="google-signin-button" className="google-signin-container"></div>
            
            <div className="divider">
              <span>or</span>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            
            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            
            <button type="submit" className="login-btn">
              Login
            </button>
            
            <p className="register-link">
              Don't have an account? 
              <button type="button" onClick={handleRegister} className="register-btn">
                Register
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
