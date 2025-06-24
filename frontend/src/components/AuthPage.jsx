import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import axios from 'axios';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState({ login: false, signup: false });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', email: '', password: ''});
  const navigate = useNavigate();

  const togglePassword = (form) => {
    setShowPassword((prev) => ({ ...prev, [form]: !prev[form] }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', loginData);
      localStorage.setItem('token', response.data.accessToken);
      //alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/signup',signupData);
      console.log('Signup response:',response);
      localStorage.setItem('token',response.data.accessToken);
      navigate('/set-balance');

      // await axios.post('/auth/signup', signupData);
      // alert('Signup successful! Please log in.');
      // setIsLogin(true);
    } catch (error) {
      alert(error.response?.data?.error || 'Signup failed');
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
            <form className="input-group" onSubmit={handleLoginSubmit}>
              <input
                type="email"
                className="input-field"
                placeholder="Email"
                required
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
              <div className="password-container">
                <input
                  type={showPassword.login ? 'text' : 'password'}
                  className="input-field"
                  placeholder="Password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
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
            <form className="input-group" onSubmit={handleSignupSubmit}>
              <input
                type="text"
                className="input-field"
                placeholder="User_Id"
                required
                value={signupData.username}
                onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
              />
              <input
                type="email"
                className="input-field"
                placeholder="Email"
                required
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              />
              <div className="password-container">
                <input
                  type={showPassword.signup ? 'text' : 'password'}
                  className="input-field"
                  placeholder="Password"
                  required
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                />
                <img
                  src={showPassword.signup ? '/eye-off.png' : '/eye.png'}
                  alt="Toggle"
                  className="eye-icon"
                  onClick={() => togglePassword('signup')}
                />
              </div>
              <input type="checkbox" className="check-box" />
              <span>I agree to the terms and conditions</span>
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
