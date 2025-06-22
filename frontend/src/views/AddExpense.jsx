import Navbar from '../components/Navbar';

function AddExpense() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '32px' }}>
        <h1>Add Expense</h1>
        <p>Here you can add a new expense entry.</p>
      </div>
    </>
  );
}

export default AddExpense;