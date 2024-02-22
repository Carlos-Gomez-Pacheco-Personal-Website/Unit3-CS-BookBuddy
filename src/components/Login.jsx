/* TODO - add your code to create a functional React component that renders a login form */
import PropTypes from "prop-types";
import { useState } from "react";
import { loginUser } from "../api";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await loginUser({ email, password });
    setToken(result.token);
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
    </form>
  );
}

Login.propTypes = {
  setToken: PropTypes.func,
};

export default Login;
