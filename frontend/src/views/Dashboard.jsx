import Navbar from '../components/Navbar';

function Dashboard() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '32px' }}>
        <h1>Dashboard</h1>
        <p>Welcome to your ExpenseVault dashboard.</p>
      </div>
    </>
  );
}

export default Dashboard;