import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminPage.css";
import api from '../interceptor';

const AdminPage = () => {
  const [bookName, setBookName] = useState("");
  const [publisher, setPublisher] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [bookImage, setBookImage] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());

  const navigate = useNavigate();

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    if (storedBooks) {
      setBooks(storedBooks);
    }

    const intervalId = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

    const handleAddBook = async () => {
        if (!bookName || !publisher || !author || !genre || !bookImage) {
            alert("Please fill in all fields.");
            return;
        }

        const formData = new FormData();
        formData.append('title', bookName);
        author.split(",").forEach(a => formData.append('authors', a.trim()));
        publisher.split(",").forEach(p => formData.append('publishers', p.trim()));
        genre.split(",").forEach(g => formData.append('genres', g.trim()));
        formData.append('file', bookImage);

        try {
            const response = await api.post('/api/books/addBook', formData);
            // Check if the response was successful based on status code
            if (response.status !== 200) {
                throw new Error(`Failed to add book: ${response.data.message || 'Unknown error'}`);
            }

            const addedBook = response.data;
            setBooks(prevBooks => [...prevBooks, addedBook]);
            clearInputs();
            alert("Book added successfully!");

        } catch (error) {
            console.error("Add book error:", error);
            setError(`Failed to add book: ${error.response?.data?.message || error.message}`);
            alert(`Failed to add book: ${error.response?.data?.message || error.message}`);
        }
    };





  const handleRemoveBook = (bookId) => {
    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks)); 
  };

  const clearInputs = () => {
    setBookName("");
    setPublisher("");
    setAuthor("");
    setGenre("");
    setBookImage(null);
  };

  const handleLogout = () => {
    navigate("/home");
  };

  const handleExport = async () => {
    try {
      const response = await fetch("/api/export-books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "books.xlsx";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert("Excel dosyası indirilemedi.");
      }
    } catch (error) {
      console.error("Export error:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="admin-container">
      <header className="header">
        <Link to="/" className="logo">
          Elysian Kitap Evi
        </Link>
        <div className="header-right">
          <div className="date-time">{dateTime}</div>
          <button className="logout-button" onClick={handleLogout}>
            Çıkış
          </button>
        </div>
      </header>
      <div className="admin-content">
        <div className="form-container">
          <h1>Kitap Ekleme ve Çıkarma</h1>
          <div className="form-group">
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="Kitap İsmi"
            />
            <input
              type="text"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              placeholder="Yayın Evi"
            />
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Yazar"
            />
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Tür"
            />
            <input
              type="file"
              onChange={(e) => setBookImage(e.target.files[0])}
              accept="image/*"
            />
            <button onClick={handleAddBook}>Kitap Ekle</button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="book-list">
          <h2>Mevcut Kitaplar</h2>
          <button onClick={handleExport} className="export-btn">
            Kitapları Excel Olarak İndir
          </button>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Resim</th>
                  <th>Kitap İsmi</th>
                  <th>Yayın Evi</th>
                  <th>Yazar</th>
                  <th>Tür</th>
                  <th>Durum</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>
                      <img
                        src={book.image}
                        alt={book.name}
                        className="book-image"
                      />
                    </td>
                    <td>{book.name}</td>
                    <td>{book.publisher}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.status}</td>
                    <td>
                      <button
                        onClick={() => handleRemoveBook(book.id)}
                        className="remove-btn"
                      >
                        Kaldır
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
