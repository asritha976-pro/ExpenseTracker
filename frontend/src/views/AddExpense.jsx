import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/AddExpense.css';

function AddExpense() {
  const navigate = useNavigate();

  const [expense, setExpense] = useState({
    date: '',
    amount: '',
    category: '',
    title: '',
    paymentType: ''
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = parseFloat(expense.amount);
    const currentBalance = parseFloat(localStorage.getItem('balance')) || 0;

    if (amount > currentBalance) {
      alert("Insufficient balance!");
      return;
    }

    const newExpense = {
      ...expense,
      amount,
      id: Date.now()
    };

    // Update expenses in localStorage
    const existingExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const updatedExpenses = [newExpense, ...existingExpenses];
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

    // Update balance
    const newBalance = currentBalance - amount;
    localStorage.setItem('balance', newBalance.toFixed(2));

    alert("Expense added!");
    navigate('/dashboard');
  };

  return (
    <>
      <Navbar />
      <div className="add-expense-form-container">
        <h2>Add New Expense</h2>
        <form onSubmit={handleSubmit}>
          <input type="date" name="date" value={expense.date} onChange={handleChange} required />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={expense.amount}
            onChange={handleChange}
            required
          />

          <select name="category" value={expense.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            name="title"
            placeholder="Note / Title"
            value={expense.title}
            onChange={handleChange}
            required
          />

          <div className="radio-group">
            <label>Payment Type:</label>
            <div className="radio-options">
              <label>
                <input
                  type="radio"
                  name="paymentType"
                  value="Cash"
                  checked={expense.paymentType === 'Cash'}
                  onChange={handleChange}
                  required
                />
                Cash
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentType"
                  value="UPI"
                  checked={expense.paymentType === 'UPI'}
                  onChange={handleChange}
                />
                UPI
              </label>
            </div>
          </div>

          <button type="submit">Add Expense</button>
        </form>
      </div>
    </>
  );
}

export default AddExpense;
