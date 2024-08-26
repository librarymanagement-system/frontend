import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../interceptor";
import "./BookDetailPage.css";
import Footer from "../component/footer/Footer.js";
import { ToastContainer, toast } from 'react-toastify';

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const fetchBookDetails = async () => {
    try {
      const response = await api.get(`/api/books/getBookById/${id}`);
      if (response.data) {
        setBook(response.data);
      } else {
        setBook(null);
      }
    } catch (error) {
      console.error("Kitap detayları fetch hatası:", error);
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
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        console.error("Kullanıcı ID'si veya token bulunamadı.");
        navigate("/login");
        return;
      }

      const response = await api.post(`/api/loans/borrow`, null, {
        params: { userId, bookId: id },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        toast.success("Kitap başarıyla ödünç alındı!");
        navigate("/borrowed-books");
      } else {
        console.error("Kitap ödünç alma hatası:", response.data.message);
        toast.error(response.data.message || "Kitap ödünç alma işlemi başarısız.");
      }
    } catch (error) {
      console.error("Kitap ödünç alma hatası:", error.response ? error.response.data : error.message);
      toast.error("Maksimum ödünç kitap sınırına ulaşıldı.");
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
        <Link to="/" className="logo">
          Elysian Kitap Evi
        </Link>
        <div className="hamburger-menu">
          <button className="hamburger-icon" onClick={toggleMenu}>
            ☰
          </button>
          {isMenuOpen && (
            <div className="menu-dropdown">
              <Link to="/profile" onClick={toggleMenu}>Profilim</Link>
              <Link to="/borrowed-books" onClick={toggleMenu}>Ödünç Aldıklarım</Link>
              <Link to="/returns" onClick={toggleMenu}>İadeler</Link>
              <Link to="/" onClick={toggleMenu}>Çıkış Yap</Link>
            </div>
          )}
        </div>
      </header>

      <div className="book-detail-wrapper">
        <div className="book-detail-content">
          <img
            src={book.base64image ? `data:image/png;base64,${book.base64image}` : "/default-image.png"}
            alt={book.title}
            className="book-image-detail"
          />
          <div className="book-info-detail">
            <h1>{book.title}</h1>
            <p><strong>Yazar:</strong> {book.authors.map(author => `${author.firstName} ${author.lastName}`).join(", ")}</p>
            <p><strong>Tür:</strong> {book.genres.map(genre => genre.name).join(", ")}</p>
            <p><strong>Yayın Evi:</strong> {book.publishers.map(publisher => publisher.name).join(", ")}</p>
            <p><strong>Durum:</strong> {book.status}</p>
            <p><strong>Açıklama:</strong> {book.explanation}</p>
            <button className="borrow-button" onClick={handleBorrowClick}>Ödünç Al</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Önemli Bilgilendirme</h2>
            <ul>
              <li>Kullanıcılar, kütüphaneden ödünç aldıkları kitapların iadesini 1 aylık süre içinde gerçekleştirmelidir. İadesi yapılmayan kitaplar kaybolmuş olarak kabul edilir.</li>
              <li>Kitap kaybına sebep olan kullanıcıların ödünç alma süresi ilk sefer için yarıya indirilecek, ikinci kitap kaybından sonra kitap ödünç alma hakları iptal edilecektir.</li>
              <li>Bir kullanıcının üzerinde bulunan ödünç kitap sayısı 3 ile sınırlandırılmıştır.</li>
            </ul>
            <button className="confirm-button" onClick={handleConfirm}>Onaylıyorum</button>
            <button className="close-button" onClick={handleCloseModal}>Kapat</button>
          </div>
        </div>
      )}

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default BookDetailPage;
