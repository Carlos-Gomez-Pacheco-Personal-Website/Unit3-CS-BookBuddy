import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import bookLogo from "./assets/books.png";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import Navigation from "./components/Navigations";

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <div>
        <h1>
          <img id="logo-image" src={bookLogo} />
          Library App
        </h1>
        <Navigation token={token} setToken={setToken} />
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/account" element={<Account token={token} />} />
          <Route path="/books/:id" element={<SingleBook />} />
          <Route path="/" element={<Books />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
