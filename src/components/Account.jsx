/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { fetchAccountDetails } from "../api.js";

function Account({ token }) {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (token) {
      fetchAccountDetails(token)
        .then((data) => {
          if (data) {
            setAccount(data);
          } else {
            console.error("Unexpected API response:", data);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [token]);

  if (!token) {
    return <p>Please log in or create an account.</p>;
  }

  if (!account) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Account Details</h2>
      <p>First Name: {account.firstname}</p>
      <p>Last Name: {account.lastname}</p>
      <p>Email: {account.email}</p>
      <h3>Books:</h3>
      {account.books.length > 0 ? (
        <ul>
          {account.books.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      ) : (
        <p>No books checked out.</p>
      )}
    </div>
  );
}

Account.propTypes = {
  token: PropTypes.any,
};

export default Account;
