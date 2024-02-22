/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchBookDetails } from "../api";

function SingleBook() {
  const { id } = useParams();
  const location = useLocation();
  const [book, setBook] = useState(location.state ? location.state.book : null);

  useEffect(() => {
    if (!book) {
      fetchBookDetails(id)
        .then((data) => {
          if (data) {
            setBook(data);
          } else {
            console.error("Unexpected API response:", data);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [id, book]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <img src={book.coverimage} alt={book.title} width={100} height={100} />
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <p>Available: {book.available ? "Yes" : "No"}</p>
    </div>
  );
}

export default SingleBook;
