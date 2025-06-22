import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SetBalance.css';

function SetBalance() {
  const [balance, setBalance] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!balance || Number(balance) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    localStorage.setItem('balance', balance);
    localStorage.setItem('expenses', JSON.stringify([])); // initialize empty expense list
    navigate('/dashboard');
  };

  return (
    <div className="setbalance-container">
      <h2>Enter Your Initial Bank Balance</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="Enter amount (e.g. 10000)"
          required
        />
        <button type="submit">Save & Continue</button>
      </form>
    </div>
  );
}

export default SetBalance;