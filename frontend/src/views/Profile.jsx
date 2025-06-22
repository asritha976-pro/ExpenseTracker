import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Profile.css';

function Profile() {
  const [user, setUser] = useState({ userId: '', email: '' });
  const [balance, setBalance] = useState(localStorage.getItem('balance') || '');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleUpdate = () => {
    if (!balance || isNaN(balance)) {
      alert('Please enter a valid balance');
      return;
    }
    localStorage.setItem('balance', parseFloat(balance).toFixed(2));
    alert('Balance updated!');
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h2>User Profile</h2>
        <div className="user-info">
          <p><strong>User ID:</strong> {user.userId}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <div className="balance-update-box">
          <label>Update Balance:</label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
          <button onClick={handleUpdate}>Save Balance</button>
        </div>
      </div>
    </>
  );
}

export default Profile;
