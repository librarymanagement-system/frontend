import React from "react";
import { Link } from "react-router-dom";
import "./BorrowedBooksPage.css";
import Hamburger from "../../component/hamburger/hamburger.js"; // Adjusted path if needed

const BorrowedBooksPage = () => {
  const currentBorrowedBooks = [
    {
      id: 1,
      title: "Kitap 1",
      author: "Yazar 1",
      genre: "Tür 1",
      publisher: "Yayın Evi 1",
      image: "kitap1.jpg",
      borrowedDate: "2024-08-01",
    },
  ];

  const pastBorrowedBooks = [
    {
      id: 2,
      title: "Kitap 2",
      author: "Yazar 2",
      genre: "Tür 2",
      publisher: "Yayın Evi 2",
      image: "kitap2.jpg",
      borrowedDate: "2024-07-15",
    },
    {
      id: 3,
      title: "Kitap 3",
      author: "Yazar 3",
      genre: "Tür 3",
      publisher: "Yayın Evi 3",
      image: "kitap3.jpg",
      borrowedDate: "2024-06-10",
    },
  ];

  return (
    <div className="borrowed-books-page">
      <Hamburger />
      <div className="borrowed-books-content">
        <h1>Ödünç Aldığınız Kitaplar</h1>

        <section className="current-borrowed-books">
          <h2>Şu Anda Ödünç Aldığınız Kitaplar</h2>
          <div className="borrowed-books-list">
            {currentBorrowedBooks.map((book) => (
              <div key={book.id} className="book-item">
                <img src={book.image} alt={book.title} className="book-image" />
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p>
                    <strong>Yazar:</strong> {book.author}
                  </p>
                  <p>
                    <strong>Tür:</strong> {book.genre}
                  </p>
                  <p>
                    <strong>Yayın Evi:</strong> {book.publisher}
                  </p>
                  <p>
                    <strong>Ödünç Alma Tarihi:</strong> {book.borrowedDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="past-borrowed-books">
          <h2>Geçmişte Ödünç Aldığınız Kitaplar</h2>
          <div className="borrowed-books-list">
            {pastBorrowedBooks.map((book) => (
              <div key={book.id} className="book-item">
                <img src={book.image} alt={book.title} className="book-image" />
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p>
                    <strong>Yazar:</strong> {book.author}
                  </p>
                  <p>
                    <strong>Tür:</strong> {book.genre}
                  </p>
                  <p>
                    <strong>Yayın Evi:</strong> {book.publisher}
                  </p>
                  <p>
                    <strong>Ödünç Alma Tarihi:</strong> {book.borrowedDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BorrowedBooksPage;
