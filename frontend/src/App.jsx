import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Dashboard from './views/Dashboard';
import AddExpense from './views/AddExpense';
import Expenses from './views/Expenses';
import Profile from './views/Profile';
import NotFound from './views/NotFound';
import SetBalance from './views/SetBalance';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/set-balance" element={<SetBalance />} />
      </Routes>
    </Router>
  );
}

export default App;
