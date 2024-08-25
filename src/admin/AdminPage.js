import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminPage.css";
import api from "../interceptor";

const AdminPage = () => {
  const [bookName, setBookName] = useState("");
  const [publisher, setPublisher] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [explanation, setExplanation] = useState("");
  const [bookImage, setBookImage] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/books/getAllBooks", {
          params: {
            page: 0,
            size: 15,
            sort: "id,asc",
          },
        });
        console.log("API yanıtı:", response.data);
        setBooks(response.data.content || []);
      } catch (error) {
        console.error("Fetch books error:", error);
        setError("Kitaplar yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();

    const intervalId = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleAddBook = async () => {
    if (!bookName || !publisher || !author || !genre || !bookImage) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    const formData = new FormData();
    formData.append("title", bookName);
    formData.append("explanation", explanation);
    author.split(",").forEach((a) => formData.append("authors", a.trim()));
    publisher
      .split(",")
      .forEach((p) => formData.append("publishers", p.trim()));
    genre.split(",").forEach((g) => formData.append("genres", g.trim()));
    formData.append("file", bookImage);

    try {
      const response = await api.post("/api/books/addBook", formData);
      if (response.status !== 200) {
        throw new Error(
          `Kitap ekleme başarısız: ${
            response.data.message || "Bilinmeyen hata"
          }`
        );
      }

      const addedBook = response.data;
      setBooks((prevBooks) => [...prevBooks, addedBook]);
      clearInputs();
      alert("Kitap başarıyla eklendi!");
    } catch (error) {
      console.error("Kitap ekleme hatası:", error);
      setError(
        `Kitap ekleme başarısız: ${
          error.response?.data?.message || error.message
        }`
      );
      alert(
        `Kitap ekleme başarısız: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleRemoveBook = async (bookId) => {
    try {
      await api.delete(`/api/books/${bookId}`);
      const updatedBooks = books.filter((book) => book.id !== bookId);
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Kitap kaldırma hatası:", error);
      alert("Kitap kaldırma başarısız.");
    }
  };

  const clearInputs = () => {
    setBookName("");
    setPublisher("");
    setAuthor("");
    setGenre("");
    setExplanation("");
    setBookImage(null);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleExport = async () => {
    try {
      const response = await api.get("/api/books/export", {
        responseType: "blob", // Excel dosyasının blob formatında alınacağını belirtir.
      });
  
      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "books.xlsx"); // Excel dosyasının adı
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
          <button className="logout-button" to="/" onClick={handleLogout}>
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
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Açıklama"
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
                  <th>Açıklama</th>
                  <th>Durum</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {books && books.length > 0 ? (
                  books.map((book) => (
                    <tr key={book.id}>
                      <td>
                        <img
                          src={book.base64image ? `data:image/png;base64,${book.base64image}` : "/default-image.png"}
                          alt={book.title}
                          className="book-image"
                        />
                      </td>
                      <td>{book.title}</td>
                      <td>{(book.publishers || []).map((p) => p.name).join(", ")}</td>
                      <td>
                        {(book.authors || []).map((a) => `${a.firstName} ${a.lastName}`).join(", ")}
                      </td>
                      <td>{(book.genres || []).map((g) => g.name).join(", ")}</td>
                      <td>{book.explanation}</td>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">Henüz kitap bulunmamaktadır.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
