/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
// import { fetchBooks } from "../api";
// import { fetchBookDetails } from "../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBooks } from "../api";

function Books() {
  const [books, setBooks] = useState([]);

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
  }, []);

  return (
    <div>
      <h2>Books</h2>
      {books.map((book) => (
        <div key={book.id}>
          <Link to={`/books/${book.id}`}>{book.title}</Link>
        </div>
      ))}
    </div>
  );
}

export default Books;
