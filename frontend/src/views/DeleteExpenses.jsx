import axios from 'axios';
import '../styles/DeleteExpenses.css';

function ExpenseList({ initialExpenses, onExpensesChange }) {
  //const expenses = initialExpenses || [];

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
  if (!confirmDelete) return;

  try{
    const token = localStorage.getItem("token");
    const response = await axios.delete(`/expenses/${id}`,{headers:{Authorization: `Bearer ${token}`,},})
    
    const updatedExpenses = initialExpenses.filter(exp => exp._id !== id);
    if(onExpensesChange) onExpensesChange(updatedExpenses);

    //alert("Expense deleted successfully");
  }catch(error){
    console.error("Failed to delete expense:",error.message);
    alert(error.response?.data?.error || "Failed to delete expense. Please try again");
  }
  // const updatedExpenses = expenses.filter(exp => exp.id !== id);
  // localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

  // const deletedExpense = expenses.find(exp => exp.id === id);
  // const currentBalance = parseFloat(localStorage.getItem("balance")) || 0;
  // const newBalance = currentBalance + deletedExpense.amount;
  // localStorage.setItem("balance", newBalance.toFixed(2));

  if (onExpensesChange) onExpensesChange(updatedExpenses);
};

  return (
    <ul className="expenses-list">
      {initialExpenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        initialExpenses.map((exp) => (
          <li key={exp.id} className="expense-card">
            <div>
              <strong>₹{exp.amount}</strong> — {exp.title}
              <br />
              {exp.category} | {exp.paymentType} | {exp.date}
            </div>
            <button onClick={() => handleDelete(exp._id)} className="delete-btn">Delete</button>
          </li>
        ))
      )}
    </ul>
  );
}

export default ExpenseList;
