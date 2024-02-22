/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBookDetails } from "../api";

function SingleBook({ token }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBookDetails(id)
      .then((data) => {
        if (data) {
          setBook(data);
        } else {
          console.error("Unexpected API response:", data);
        }
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <img src={book.coverimage} alt={book.title} />
      <p>Available: {book.available ? "Yes" : "No"}</p>
      {token && <button>Checkout</button>}
    </div>
  );
}

SingleBook.propTypes = {
  token: PropTypes.any,
};

export default SingleBook;
