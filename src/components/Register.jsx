/* TODO - add your code to create a functional React component that renders a registration form */
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/";

function Register({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(`${API_URL}register`, {
      username,
      password,
    });
    setToken(response.data.token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      <input type="submit" value="Register" />
    </form>
  );
}

Register.propTypes = {
  setToken: PropTypes.func,
};

export default Register;
