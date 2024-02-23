const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/";

export async function registerUser(userDetails) {
  const response = await fetch(`${API_URL}users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  });
  return response.json();
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function fetchAccountDetails(token) {
  const response = await fetch(`${API_URL}users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function fetchBooks() {
  const response = await fetch(`${API_URL}books`);
  return response.json();
}

export async function fetchBookDetails(bookId) {
  const response = await fetch(`${API_URL}books/${bookId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function updateBookDetails(bookId, bookDetails, token) {
  const response = await fetch(`${API_URL}books/${bookId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookDetails),
  });
  return response.json();
}

export async function updateBook(bookId, bookDetails, token) {
  const response = await fetch(`${API_URL}books/${bookId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookDetails),
  });
  return response.json();
}

export async function fetchReservations(token) {
  const response = await fetch(`${API_URL}reservations`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function makeReservation(bookId, token) {
  const response = await fetch(`${API_URL}reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookId }),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Server response was not ok.");
  }
}

export async function deleteReservation(reservationId, token) {
  const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
