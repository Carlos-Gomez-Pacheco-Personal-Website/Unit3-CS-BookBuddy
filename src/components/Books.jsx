/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
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
        </div>
      ))}
    </div>
  );
}

export default Books;
