import React, { useState, useEffect } from "react";
import Hamburger from "../../component/hamburger/hamburger.js";
import Modal from "react-modal";
import api from "../../interceptor";
import "./BorrowedBooksPage.css";
import Footer from "../../component/footer/Footer.js";

Modal.setAppElement("#root");

const BorrowedBooksPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentBorrowedBooks, setCurrentBorrowedBooks] = useState([]);
  const [pastBorrowedBooks, setPastBorrowedBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const successMessage = "Kitap başarıyla iade edildi.";
  const failureMessage = "İade başarısız."

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setErrorMessage("User ID is not available. Please log in again.");
      return;
    }

    const fetchUserLoans = async () => {
      try {
        const response = await api.get(`/api/users/getUserLoans/${userId}`);
        const loans = response.data;
        const current = [];
        const past = [];

        loans.forEach((loan) => {
          const bookData = {
            loanId: loan.id,
            bookId: loan.book.id,
            title: loan.book.title,
            image: `data:image/jpeg;base64,${loan.book.base64image}`,
            borrowedDate: loan.loanDate,
            status: loan.status,
            author: loan.book.author,
            genre: loan.book.genre,
            publisher: loan.book.publisher,
          };

          if (loan.status === "ACTIVE" || loan.status === "LATE") {
            current.push(bookData);
          } else if (loan.status === "COMPLETED" || loan.status === "LOST") {
            past.push(bookData);
          }
        });

        setCurrentBorrowedBooks(current);
        setPastBorrowedBooks(past);
      } catch (error) {
        setErrorMessage("Ödünç alınan kitaplar yüklenirken bir hata oluştu.");
      }
    };

    fetchUserLoans();
  }, [userId]);

  const handleReturnBook = (book) => {
    setSelectedBook(book);
    setModalIsOpen(true);
  };

  const confirmReturn = async () => {
    if (!selectedBook) return;

    try {
      const userId = localStorage.getItem("userId");
      if (!userId || !selectedBook.bookId) {
        setErrorMessage("Invalid user or book ID.");
        return;
      }

      const response = await api.post(`/api/loans/return`, null, {
        params: { userId, bookId: selectedBook.bookId },
      });


      if (response.data === successMessage) {
        setCurrentBorrowedBooks((prevBooks) =>
          prevBooks.filter((book) => book.bookId !== selectedBook.bookId)
        );
        setPastBorrowedBooks((prevBooks) => [
          ...prevBooks,
          { ...selectedBook, status: "COMPLETED" },
        ]);

        setModalIsOpen(false);
        setSelectedBook(null);
      } else {
        setErrorMessage(failureMessage);
      }
    } catch (error) {
      setErrorMessage("İade sırasında bir hata oluştu.");
    }
  };

  const cancelReturn = () => {
    setModalIsOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="borrowed-books-page">
      <Hamburger />
      <div className="borrowed-books-content">
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <section className="current-borrowed-books">
          <h2>Şu Anda Ödünç Aldığınız Kitaplar</h2>
          <div className="borrowed-books-list">
            {currentBorrowedBooks.length > 0 ? (
              currentBorrowedBooks.map((book) => (
                <div key={book.id} className="book-item">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="book-image"
                  />
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p>
                      <strong>Ödünç Alma Tarihi:</strong> {book.borrowedDate}
                    </p>
                    <p>
                      <strong>Durum:</strong> {book.status}
                    </p>
                    <button
                      onClick={() => handleReturnBook(book)}
                      className="return-button"
                    >
                      {book.status === "LATE"
                        ? "Gecikmiş Kitabı İade Et"
                        : "İade Et"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Şu anda ödünç aldığınız kitap yok.</p>
            )}
          </div>
        </section>

        <section className="sec past-borrowed-books">
          <h2>Geçmişte Ödünç Aldığınız Kitaplar</h2>
          <div className="borrowed-books-list">
            {pastBorrowedBooks.length > 0 ? (
              pastBorrowedBooks.map((book) => (
                <div key={book.id} className="book-item">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="book-image"
                  />
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
                    <p>
                      <strong>Durum:</strong> {book.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Geçmişte ödünç aldığınız kitap yok.</p>
            )}
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
          {selectedBook
            ? `"${selectedBook.title}" kitabını iade etmek istediğinize emin misiniz?`
            : ""}
        </p>
        <button onClick={confirmReturn} className="modal-confirm-button">
          Onaylıyorum
        </button>
        <button onClick={cancelReturn} className="modal-cancel-button">
          İptal
        </button>
      </Modal>
      <Footer />
    </div>
  );
};

export default BorrowedBooksPage;
