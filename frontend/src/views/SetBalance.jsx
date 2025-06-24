import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SetBalance.css';

function SetBalance() {
  const [balance, setBalance] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!balance || Number(balance) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try{
      const token = localStorage.getItem('token');

      const response = await axios.put('/users/set-balance',{balance:Number(balance)},{headers:{Authorization:`Bearer ${token}`}})
      
      localStorage.setItem('balance', response.data.balance);
      localStorage.setItem('expenses', JSON.stringify([])); // initialize empty expense list
      navigate('/dashboard');
    }catch(error){
      alert(error.response?.data?.error || 'Failed to update balance');
    }
     
   
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