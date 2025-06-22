import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ background: '#eee', padding: '16px' }}>
      <Link to="/dashboard" style={{ marginRight: '16px' }}>Dashboard</Link>
      <Link to="/add-expense" style={{ marginRight: '16px' }}>Add Expense</Link>
      <Link to="/expenses" style={{ marginRight: '16px' }}>All Expenses</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}

export default Navbar;