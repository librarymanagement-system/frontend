import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchBookDetails, borrowBook } from "../services/bookService";
import "./BookDetailPage.css";
import Footer from "../component/footer/Footer.js";
import { ToastContainer, toast } from "react-toastify";


const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBookDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchBookDetails(id);
      setBook(data);
    } catch (error) {
      setError("Kitap bulunamadı.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBookDetails();
  }, [id]);

  if (isLoading) {
    return <div>Yükleniyor...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  if (!book) {
    return <div>Kitap bulunamadı.</div>; 
  }

  const handleBorrowClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      await borrowBook(userId, token, id);
      toast.success("Kitap başarıyla ödünç alındı!");
      navigate("/borrowed-books");
    } catch (error) {
      toast.error(error.message || "Kitap ödünç alma işlemi başarısız.");
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

  const authors = book.authors
    .map((author) => `${author.firstName} ${author.lastName}`)
    .join(", ");
  const genres = book.genres.map((genre) => genre.name).join(", ");
  const publishers = book.publishers
    .map((publisher) => publisher.name)
    .join(", ");

  return (
    <div className="book-detail-page">
      <header className="header">
        <Link to="/" className="logo">
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
              <Link to="/" onClick={toggleMenu}>
                Çıkış Yap
              </Link>
            </div>
          )}
        </div>
      </header>

      <div className="book-detail-wrapper">
        <div className="book-detail-content">
          <img
            src={
              book.base64image
                ? `data:image/png;base64,${book.base64image}`
                : "/default-image.png"
            }
            alt={book.title}
            className="book-image-detail"
          />
          <div className="book-info-detail">
            <h1>{book.title}</h1>
            <p>
              <strong>Yazar:</strong> {authors}
            </p>
            <p>
              <strong>Tür:</strong> {genres}
            </p>
            <p>
              <strong>Yayın Evi:</strong> {publishers}
            </p>
            <p>
              <strong>Durum:</strong> {book.status}
            </p>
            <p>
              <strong>Açıklama:</strong> {book.explanation}
            </p>
            <button className="borrow-button" onClick={handleBorrowClick}>
              Ödünç Al
            </button>
          </div>
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

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default BookDetailPage;
