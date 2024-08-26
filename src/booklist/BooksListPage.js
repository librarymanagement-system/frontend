import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../interceptor";
import "./BooksListPage.css";
import Header from "../component/header/Header.js";
import Footer from "../component/footer/Footer.js";
import { useAuth } from "../AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BooksListPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const fetchBooks = async () => {
    try {
      const response = await api.get("/api/books/searchSingle", {
        params: {
          searchTerm,
          page: 0,
          size: 15,
          sort: "id,asc"
        },
      });
      setBooks(response.data.content || []);
    } catch (error) {
      console.error("Kitaplar yüklenirken hata oluştu:", error);
      toast.error("Kitaplar yüklenirken bir hata oluştu.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDetailClick = (id) => {
    if (isAuthenticated) {
      navigate(`/books/${id}`);
    } else {
      toast.warning("Lütfen giriş yapın. Yönlendiriliyorsunuz...");
      setTimeout(() => {
        navigate("/login", { state: { from: `/books/${id}` } });
      }, 1000);
    }
  };

  return (
    <div className="books-list-page">
      <Header />
      <h2>Kütüphane</h2>
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="search"></label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Başlık, yazar, yayıncı veya tür girin"
          />
        </div>
        <button className="se-area" onClick={fetchBooks}>Ara</button>
      </div>
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img
              src={
                book.base64image
                  ? `data:image/png;base64,${book.base64image}`
                  : "/default-image.png"
              }
              alt={book.title}
              className="book-image"
            />
            <div className="book-details">
              <h2>{book.title}</h2>
              <p>
                {(book.authors || [])
                  .map((a) => `${a.firstName} ${a.lastName}`)
                  .join(", ")}
              </p>
              <p>{(book.genres || []).map((g) => g.name).join(", ")}</p>
              <p className="publisher">
                {(book.publishers || []).map((p) => p.name).join(", ")}
              </p>
              <button onClick={() => handleDetailClick(book.id)} className="view-btn">
                Detay
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default BooksListPage;
