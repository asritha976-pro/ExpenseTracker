import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const balance = parseFloat(localStorage.getItem('balance') || '0').toFixed(2);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-expense">Add Expenses</Link>
        <Link to="/expenses">All Expenses</Link>
        <Link to="/profile">View Profile</Link>
      </div>

      <div className="nav-right">
        <span className="balance">Balance: ₹ {balance}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
