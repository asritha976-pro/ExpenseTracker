import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState({
    login: false,
    signup: false,
  });

  const navigate = useNavigate();

  const togglePassword = (form) => {
    setShowPassword((prev) => ({
      ...prev,
      [form]: !prev[form],
    }));
  };

  const handleLoginSubmit = async (e) => {
  e.preventDefault();

  const loginData = {
    userId: 'demoUser',
    password: 'demoPass',
  };

  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    const result = await response.json();

    if (response.ok) {
      // Save auth token or user info
      localStorage.setItem('token', result.token);
      navigate('/dashboard');
    } else {
      alert(result.message || 'Login failed');
    }
  } catch (error) {
    alert('Server error');
  }
};


  const handleSignupSubmit = async (e) => {
  e.preventDefault();

  const userData = {
    userId: 'demoUser',
    email: 'demo@example.com',
    password: 'demoPass'
  };

  const response = await fetch('http://localhost:5000/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  if (response.ok) {
    navigate('/dashboard');
  } else {
    alert('Signup failed');
  }
};


  return (
    <>
      <header className="header">
        <h1>ExpenseVault</h1>
      </header>

      <div className="backGround">
        <div className="form-box">
          <div className="button-box">
            <div id="btn" style={{ left: isLogin ? '0' : '110px' }}></div>
            <button className="toggle-btn" onClick={() => setIsLogin(true)}>LogIn</button>
            <button className="toggle-btn" onClick={() => setIsLogin(false)}>SignUp</button>
          </div>

          <div className="social-icons">
            <img src="/google.png" alt="Google" />
            <img src="/apple.jpg" alt="Apple" />
          </div>

          {isLogin ? (
            <form
              className="input-group"
              style={{ left: '50px' }}
              onSubmit={handleLoginSubmit}
            >
              <input
                type="text"
                className="input-field"
                placeholder="User_Id"
                required
              />
              <div className="password-container">
                <input
                  type={showPassword.login ? 'text' : 'password'}
                  className="input-field"
                  placeholder="Password"
                  required
                />
                <img
                  src={showPassword.login ? '/eye-off.png' : '/eye.png'}
                  alt="Toggle"
                  className="eye-icon"
                  onClick={() => togglePassword('login')}
                />
              </div>
              <input type="checkbox" className="check-box" />
              <span>Remember Password</span>
              <button type="submit" className="submit-btn">LogIn</button>
            </form>
          ) : (
            <form
              className="input-group"
              style={{ left: '50px' }}
              onSubmit={handleSignupSubmit}
            >
              <input
                type="text"
                className="input-field"
                placeholder="User_Id"
                required
              />
              <input
                type="email"
                className="input-field"
                placeholder="Email"
                required
              />
              <div className="password-container">
                <input
                  type={showPassword.signup ? 'text' : 'password'}
                  className="input-field"
                  placeholder="Password"
                  required
                />
                <img
                  src={showPassword.signup ? '/eye-off.png' : '/eye.png'}
                  alt="Toggle"
                  className="eye-icon"
                  onClick={() => togglePassword('signup')}
                />
              </div>
              <input type="checkbox" className="check-box" />
              <span>I agree to the terms and condition</span>
              <button type="submit" className="submit-btn">Signup</button>
            </form>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2025 ExpenseVault. All rights reserved.</p>
      </footer>
    </>
  );
}

export default AuthPage;
