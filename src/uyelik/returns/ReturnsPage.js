import React, { useState } from 'react';
import Hamburger from '../../component/hamburger/hamburger.js'; // Corrected path
import '../returns/ReturnsPage.css'; // Create and adjust styles as needed

const ReturnsPage = () => {
  // Mock data for borrowed books
  const [borrowedBooks, setBorrowedBooks] = useState([
    { id: 1, title: 'Book Title 1', author: 'Author 1', dueDate: '2024-09-01' },
    { id: 2, title: 'Book Title 2', author: 'Author 2', dueDate: '2024-09-10' },
    { id: 3, title: 'Book Title 3', author: 'Author 3', dueDate: '2024-09-15' },
  ]);

  // Function to handle book return
  const handleReturnBook = (bookId) => {
    setBorrowedBooks(borrowedBooks.filter(book => book.id !== bookId));
    // Here you would normally call the backend API to process the return
  };

  return (
    <div className="returns-page">
      <Hamburger />
      <div className="returns-content">
        <h1>Geri İade Edilecek Kitaplar</h1>
        <ul className="book-list">
          {borrowedBooks.map((book) => (
            <li key={book.id} className="book-item">
              <div className="book-info">
                <h3>{book.title}</h3>
                <p><strong>Yazar:</strong> {book.author}</p>
                <p><strong>Son İade Tarihi:</strong> {book.dueDate}</p>
              </div>
              <button className="return-button" onClick={() => handleReturnBook(book.id)}>
                İade Et
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReturnsPage;
