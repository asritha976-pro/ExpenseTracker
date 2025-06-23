import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Expenses.css';
import axios from 'axios';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [sortType, setSortType] = useState('latest'); // latest, oldest, high, low

  // useEffect(() => {
  //   const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
  //   setExpenses(storedExpenses);
  // }, []);
// from here to 
  useEffect(() => {
    axios.get('/expenses', {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      if(res?.data?.expenses){
        setExpenses(res.data.expenses);
      }
    })
    .catch(err => {
      console.error('Failed to fetch expenses',error.message)
    });
  },[]);
// here

  const sortExpenses = (type) => {
    let sorted = [...expenses];

    if (type === 'high') {
      sorted.sort((a, b) => b.amount - a.amount);
    } else if (type === 'low') {
      sorted.sort((a, b) => a.amount - b.amount);
    } else if (type === 'latest') {
      sorted.sort((a, b) => b.id - a.id); // latest first
    } else if (type === 'oldest') {
      sorted.sort((a, b) => a.id - b.id);
    }

    setSortType(type);
    setExpenses(sorted);
  };

  return (
    <>
      <Navbar />
      <div className="expenses-container">
        <h2>Transaction History</h2>

        <div className="sort-buttons">
          <button onClick={() => sortExpenses('high')}>Expense: High → Low</button>
          <button onClick={() => sortExpenses('low')}>Expense: Low → High</button>
          <button onClick={() => sortExpenses('latest')}>Date: Latest First</button>
          <button onClick={() => sortExpenses('oldest')}>Date: Oldest First</button>
        </div>

        {expenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          <ul className="expenses-list">
            {expenses.map((exp) => (
              <li key={exp.id} className="expense-card">
                <div><strong>₹{exp.amount}</strong> — {exp.title}</div>
                <div>{exp.category} | {exp.date}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Expenses;
