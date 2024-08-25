import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BorrowedBooksPage.css";
import Hamburger from "../../component/hamburger/hamburger.js"; 
import Modal from "react-modal";

Modal.setAppElement("#root");

const BorrowedBooksPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

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

  const handleReturnBook = (book) => {
    setSelectedBook(book);
    setModalIsOpen(true);
  };

  const confirmReturn = () => {
    // Burada kitap iade işlemi yapılacak
    setModalIsOpen(false);
    setSelectedBook(null);
  };

  const cancelReturn = () => {
    setModalIsOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="borrowed-books-page">
      <Hamburger />
      <div className="borrowed-books-content">
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
                  <button onClick={() => handleReturnBook(book)} className="return-button">İade Et</button>
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={cancelReturn}
        contentLabel="Onay Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Kitap İade İşlemi</h2>
        <p>
          {selectedBook ? `"${selectedBook.title}" kitabını iade etmek istediğinize emin misiniz?` : ""}
        </p>
        <button onClick={confirmReturn} className="modal-confirm-button">Onaylıyorum</button>
        <button onClick={cancelReturn} className="modal-cancel-button">İptal</button>
      </Modal>
    </div>
  );
};

export default BorrowedBooksPage;
