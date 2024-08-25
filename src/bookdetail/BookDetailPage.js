import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../interceptor";
import "./BookDetailPage.css";

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const fetchBookDetails = async () => {
    try {
      console.log('API URL:', `/api/books/getBookById/${id}`);
      const response = await api.get(`/api/books/getBookById/${id}`);
      console.log('API Yanıtı:', response.data); 
      if (response.data) {
        setBook(response.data);
      } else {
        setBook(null);
      }
    } catch (error) {
      console.error("Fetch book details error:", error);
      setBook(null);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const handleBorrowClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      await api.post("/api/loans/borrow", { bookId: book.id });
      navigate("/borrowed-books");
    } catch (error) {
      console.error("Borrow book error:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!book) {
    return <div>Kitap bulunamadı.</div>;
  }

  return (
    <div className="book-detail-page">
      <header className="header">
        <Link to="/home" className="logo">
          Elysian Kitap Evi
        </Link>
        <div className="hamburger-menu">
          <button className="hamburger-icon" onClick={toggleMenu}>
            ☰
          </button>
          {isMenuOpen && (
            <div className="menu-dropdown">
              <Link to="/profile" onClick={toggleMenu}>
                Profilim
              </Link>
              <Link to="/borrowed-books" onClick={toggleMenu}>
                Ödünç Aldıklarım
              </Link>
              <Link to="/returns" onClick={toggleMenu}>
                İadeler
              </Link>
              <Link to="/logout" onClick={toggleMenu}>
                Çıkış Yap
              </Link>
            </div>
          )}
        </div>
      </header>

      <div className="book-detail-content">
        <img
          src={
            book.base64image
              ? `data:image/png;base64,${book.base64image}`
              : "/default-image.png"
          }
          alt={book.title}
          className="book-image"
        />
        <div className="book-info">
          <h1>{book.title}</h1>
          <p>
            <strong>Yazar:</strong>{" "}
            {book.authors
              .map((author) => `${author.firstName} ${author.lastName}`)
              .join(", ")}
          </p>
          <p>
            <strong>Tür:</strong>{" "}
            {book.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Yayın Evi:</strong>{" "}
            {book.publishers.map((publisher) => publisher.name).join(", ")}
          </p>
          <p>
            <strong>Açıklama:</strong> {book.explanation}
          </p>
          <button className="borrow-button" onClick={handleBorrowClick}>
            Ödünç Al
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Önemli Bilgilendirme</h2>
            <ul>
              <li>
                Kullanıcılar, kütüphaneden ödünç aldıkları kitapların iadesini 1
                aylık süre içinde gerçekleştirmelidir. İadesi yapılmayan
                kitaplar kaybolmuş olarak kabul edilir.
              </li>
              <li>
                Kitap kaybına sebep olan kullanıcıların ödünç alma süresi ilk
                sefer için yarıya indirilecek, ikinci kitap kaybından sonra
                kitap ödünç alma hakları iptal edilecektir.
              </li>
              <li>
                Bir kullanıcının üzerinde bulunan ödünç kitap sayısı 3 ile
                sınırlandırılmıştır.
              </li>
            </ul>
            <button className="confirm-button" onClick={handleConfirm}>
              Onaylıyorum
            </button>
            <button className="close-button" onClick={handleCloseModal}>
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailPage;
