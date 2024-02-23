/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { deleteReservation, fetchAccountDetails } from "../api.js";
import { useReservationContext } from "../hooks/useReservationContext.js";

function Account({ token }) {
  const [reservation, setReservation] = useReservationContext();
  const [account, setAccount] = useState(null);

  const deleteThis = (bookId) => {
    deleteReservation(bookId, token)
      .then((data) => {
        if (data) {
          fetchAccountDetails(token)
            .then((data) => {
              if (data) {
                setAccount(data);
                // Update the reservation state with the new data
                const updatedReservations = data.books.filter(
                  (book) => book.id !== bookId
                );
                setReservation(updatedReservations);
              } else {
                console.error("Unexpected API response:", data);
              }
            })
            .catch((error) => console.error(error));
        } else {
          console.error("Unexpected API response:", data);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (token) {
      fetchAccountDetails(token)
        .then((data) => {
          if (data) {
            setAccount(data);
            setReservation(data.books);
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
    <div className="accountseg">
      <h2>Account Details</h2>
      <p>First Name: {account.firstname}</p>
      <p>Last Name: {account.lastname}</p>
      <p>Email: {account.email}</p>
      <h3>Books:</h3>
      {reservation.length > 0 ? (
        <ul>
          {reservation.map((book) => (
            <li key={book.id}>
              <p>{book.bookId}</p>
              <img
                src={book.coverimage}
                alt={book.title}
                width={100}
                height={100}
              />
              <p>Title: {book.title}</p>
              <p>Author: {book.author}</p>
              <button onClick={() => deleteThis(book.id)}>Return</button>
            </li>
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
