import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '32px' }}>
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <Link to="/">Go back to login</Link>
    </div>
  );
}

export default NotFound;