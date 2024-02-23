import { createContext, useContext } from "react";

const BooksContext = createContext([]);

const useBooksContext = () => {
  return useContext(BooksContext);
};

export { BooksContext, useBooksContext };
