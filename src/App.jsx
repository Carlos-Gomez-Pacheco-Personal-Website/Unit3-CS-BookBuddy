import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import bookLogo from "./assets/books.png";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";

import Navigation from "./components/Navigations";
import { BooksContext } from "./hooks/useBooksContext";
import { ReservationContext } from "./hooks/useReservationContext";
import { useEffect } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [books, setBooks] = useState([]);
  const [reservation, setReservation] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <BooksContext.Provider value={[books, setBooks]}>
      <ReservationContext.Provider value={[reservation, setReservation]}>
        <Router>
          <div>
            <h1>
              <img id="logo-image" src={bookLogo} width={35} height={35} />
              Library App
            </h1>
            <Navigation token={token} setToken={setToken} />
            <Routes>
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route
                path="/register"
                element={<Register setToken={setToken} />}
              />
              <Route
                path="/account"
                element={
                  token ? <Account token={token} /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/books/:id"
                element={
                  token ? (
                    <SingleBook token={token} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/"
                element={
                  token ? <Books token={token} /> : <Navigate to="/login" />
                }
              />
            </Routes>
          </div>
        </Router>
      </ReservationContext.Provider>
    </BooksContext.Provider>
  );
}

export default App;
