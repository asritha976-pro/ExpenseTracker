import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css';

function Dashboard() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const storedBalance = parseFloat(localStorage.getItem('balance')) || 0;
    setBalance(storedBalance);
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="balance-card">
          <p>Current Balance</p>
          <h2>₹ {balance.toFixed(2)}</h2>
        </div>
        <p>Navigate through the menu to add a new expense or view your transaction history.</p>
      </div>
    </>
  );
}

export default Dashboard;