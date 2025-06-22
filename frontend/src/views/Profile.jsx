import Navbar from '../components/Navbar';

function Profile() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '32px' }}>
        <h1>Profile</h1>
        <p>Manage your user information and settings.</p>
      </div>
    </>
  );
}

export default Profile;