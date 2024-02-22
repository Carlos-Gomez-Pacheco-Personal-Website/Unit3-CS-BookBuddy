/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Navigation({ token, setToken }) {
  const handleLogout = () => {
    // Clear the token
    setToken(null);
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {token ? (
        <>
          <Link to="/account">Account</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

Navigation.propTypes = {
  setToken: PropTypes.func,
  token: PropTypes.any,
};

export default Navigation;
