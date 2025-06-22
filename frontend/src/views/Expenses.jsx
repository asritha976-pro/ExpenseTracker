import Navbar from '../components/Navbar';

function Expenses() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '32px' }}>
        <h1>All Expenses</h1>
        <p>This will list all your expenses here.</p>
      </div>
    </>
  );
}

export default Expenses;