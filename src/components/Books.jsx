/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBooks, fetchReservations, deleteReservation } from "../api";

function Books({ token }) {
  const [books, setBooks] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchBooks()
      .then((data) => {
        if (data.books) {
          setBooks(data.books);
        } else {
          console.error("Unexpected API response:", data);
        }
      })
      .catch((error) => console.error(error));

    if (token) {
      fetchReservations(token)
        .then((data) => {
          if (data) {
            setReservations(data);
          } else {
            console.error("Unexpected API response:", data);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [token]);

  const handleReturn = async (reservationId) => {
    const result = await deleteReservation(reservationId, token);
    if (result) {
      setReservations(
        reservations.filter((reservation) => reservation.id !== reservationId)
      );
    } else {
      console.error("Return failed:", result.message);
    }
  };

  return (
    <div>
      <h2>Books</h2>
      {books.map((book) => (
        <div
          key={book.id}
          style={{ border: "1px solid black", margin: "10px", padding: "10px" }}
        >
          <h3>{book.title}</h3>
          <img
            src={book.coverimage}
            alt={book.title}
            width={100}
            height={100}
          />
          <p>Author: {book.author}</p>
          <Link
            to={{
              pathname: `/books/${book.id}`,
              state: { book },
            }}
          >
            <button>View Details</button>
          </Link>
          {reservations.find(
            (reservation) => reservation.bookid === book.id
          ) && (
            <button onClick={() => handleReturn(book.id)}>Return Book</button>
          )}
        </div>
      ))}
    </div>
  );
}

Books.propTypes = {
  token: PropTypes.any,
};

export default Books;
