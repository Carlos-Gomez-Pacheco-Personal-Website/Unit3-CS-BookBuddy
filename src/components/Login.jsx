/* TODO - add your code to create a functional React component that renders a login form */
import PropTypes from "prop-types";
import { useState } from "react";
import { loginUser } from "../api";
import { Link } from "react-router-dom";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await loginUser({ email, password });
    if (result.token) {
      setToken(result.token);
    } else {
      console.error("Login failed:", result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <a href="/Register" className="login-button">
        Register
      </a>
      <Link to="/" className="go-back-link">
        Go Back
      </Link>
    </form>
  );
}

Login.propTypes = {
  setToken: PropTypes.func,
};

export default Login;
