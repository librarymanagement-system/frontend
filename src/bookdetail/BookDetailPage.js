import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 
import './BookDetailPage.css';
import Header from "../component/Header";

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const books = [
    {
      id: 1,
      title: "Kitap 1",
      author: "Yazar 1",
      genre: "Tür 1",
      publisher: "Yayın Evi 1",
      image: "kitap1.jpg",
      description: "Kitap 1 hakkında detaylı açıklama burada yer alacak."
    },
  ];

  const book = books.find((book) => book.id === parseInt(id, 10));

  if (!book) {
    return <div>Kitap bulunamadı.</div>;
  }

  const handleBorrowClick = () => {
    if (!isAuthenticated) {
      navigate('/login'); 
    } else {
      navigate(`/borrow/${id}`); 
    }
  };

  return (
    <div className="book-detail-page">
      <Header />

      <div className="book-detail-content">
        <img src={book.image} alt={book.title} className="book-image" />
        <div className="book-info">
          <h1>{book.title}</h1>
          <p><strong>Yazar:</strong> {book.author}</p>
          <p><strong>Tür:</strong> {book.genre}</p>
          <p><strong>Yayın Evi:</strong> {book.publisher}</p>
          <p><strong>Açıklama:</strong> {book.description}</p>
          <button className="borrow-button" onClick={handleBorrowClick}>Ödünç Al</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
