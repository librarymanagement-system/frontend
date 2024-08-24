import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./BookDetailPage.css";

const BookDetailPage = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const books = [
    {
      id: 1,
      title: "Kitap 1",
      author: "Yazar 1",
      genre: "Tür 1",
      publisher: "Yayın Evi 1",
      image: "kitap1.jpg",
    },
    // Diğer kitaplar burada olabilir
  ];

  const borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

  const book = books.find((book) => book.id === parseInt(id, 10));

  if (!book) {
    return <div>Kitap bulunamadı.</div>;
  }

  const handleBorrowClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    const updatedBorrowedBooks = [...borrowedBooks, book];
    localStorage.setItem("borrowedBooks", JSON.stringify(updatedBorrowedBooks));
    setIsModalOpen(false);
    navigate("/borrowed-books");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
        <img src={book.image} alt={book.title} className="book-image" />
        <div className="book-info">
          <h1>{book.title}</h1>
          <p>
            <strong>Yazar:</strong> {book.author}
          </p>
          <p>
            <strong>Tür:</strong> {book.genre}
          </p>
          <p>
            <strong>Yayın Evi:</strong> {book.publisher}
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
