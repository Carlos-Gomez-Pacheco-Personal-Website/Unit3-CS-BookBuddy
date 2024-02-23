const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/";

export const registerUser = (userDetails) => {
  return fetch(`${API_URL}users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  }).then((response) => response.json());
};

export const loginUser = (credentials) => {
  return fetch(`${API_URL}users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((response) => response.json());
};

export const fetchAccountDetails = (token) => {
  return fetch(`${API_URL}users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
};

export const fetchBooks = () => {
  return fetch(`${API_URL}books`).then((response) => response.json());
};

export const fetchBookDetails = (bookId) => {
  return fetch(`${API_URL}books/${bookId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const updateBookDetails = (bookId, bookDetails, token) => {
  return fetch(`${API_URL}books/${bookId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookDetails),
  }).then((response) => response.json());
};

export const updateBook = (bookId, bookDetails, token) => {
  return fetch(`${API_URL}books/${bookId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookDetails),
  }).then((response) => response.json());
};

export const fetchReservations = (token) => {
  return fetch(`${API_URL}reservations`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
};

export const makeReservation = (bookId, token) => {
  return fetch(`${API_URL}reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookId }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Server response was not ok.");
    }
  });
};

export const deleteReservation = (reservationId, token) => {
  console.log(reservationId);
  return fetch(`${API_URL}/reservations/${reservationId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.ok === false) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  });
};
