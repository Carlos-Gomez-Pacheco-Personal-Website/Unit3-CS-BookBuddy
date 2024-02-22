/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/";
function SingleBook({ token }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}books/${id}`)
      .then((response) => setBook(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      {/* Render book details here */}
      {token && <button>Checkout</button>}
    </div>
  );
}

SingleBook.propTypes = {
  token: PropTypes.any,
};

export default SingleBook;
