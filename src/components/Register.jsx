/* TODO - add your code to create a functional React component that renders a registration form */
import PropTypes from "prop-types";
import { useState } from "react";
import { registerUser } from "../api";
import { Link } from "react-router-dom";

function Register({ setToken }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await registerUser({ firstname, lastname, email, password });
    if (result.token) {
      setToken(result.token);
      setMessage("Registration successful!");
    } else {
      console.error("Registration failed:", result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input type="submit" value="Register" className="register-button" />
      <p>{message}</p>
      <a href="/login" className="login-button">
        Log in
      </a>
      <Link to="/" className="go-back-link">
        Go Back
      </Link>
    </form>
  );
}

Register.propTypes = {
  setToken: PropTypes.func,
};

export default Register;
