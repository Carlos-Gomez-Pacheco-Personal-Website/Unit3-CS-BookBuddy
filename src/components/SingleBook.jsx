/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchBookDetails,
  updateBookDetails,
  fetchReservations,
  deleteReservation,
} from "../api.js";

function SingleBook({ token }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    fetchBookDetails(id, token)
      .then((data) => {
        if (data) {
          fetchReservations(token)
            .then((response) => {
              response.reservation.forEach((reservation) => {
                if (
                  reservation.title.toLowerCase() ==
                  data.book.title.toLowerCase()
                ) {
                  setReservation(reservation);
                }
              });
            })
            .catch((error) => console.error(error));
          setBook(data.book);
        } else {
          console.error("Unexpected API response:", data);
        }
      })
      .catch((error) => console.error(error));
  }, [id, token]);

  const handleReservation = async () => {
    const updatedBook = await updateBookDetails(
      id,
      { available: false },
      token
    );

    if (updatedBook.book) {
      setBook(updatedBook.book);
    } else {
      console.error("Reservation failed:", updatedBook.message);
    }
  };

  const handleReturn = async () => {
    if (reservation) {
      const deleteResult = await deleteReservation(reservation.id, token);
      if (deleteResult) {
        const updatedBook = await updateBookDetails(
          id,
          { available: true },
          token
        );
        if (updatedBook.book) {
          setBook(updatedBook.book);
        } else {
          console.error("Update failed:", updatedBook.message);
        }
      } else {
        console.error("Delete failed:", deleteResult.message);
      }
    }
  };

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="booksseg">
      <h2>{book.title}</h2>
      <img src={book.coverimage} alt={book.title} width={100} height={100} />
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <p>Available: {book.available ? "Yes" : "No"}</p>
      {book.available ? (
        <button onClick={handleReservation}>Make Reservation</button>
      ) : (
        <button onClick={handleReturn}>Return Book</button>
      )}
      <Link to="/" className="go-back-link">
        Go Back
      </Link>
    </div>
  );
}

SingleBook.propTypes = {
  token: PropTypes.any,
};

export default SingleBook;
