import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ExpenseList from "./DeleteExpenses";
import '../styles/Expenses.css';
import axios from 'axios';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [sortType, setSortType] = useState('latest');

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

  // 
  const sortExpenses = (type) => {
  let sorted = [...expenses];

  if (type === 'high') {
    sorted.sort((a, b) => b.amount - a.amount);
  } else if (type === 'low') {
    sorted.sort((a, b) => a.amount - b.amount);
  } else if (type === 'latest') {
    sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (type === 'oldest') {
    sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
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

        <ExpenseList initialExpenses={expenses} onExpensesChange={setExpenses} />
      </div>
    </>
  );
}

export default Expenses;
