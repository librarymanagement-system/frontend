
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BooksListPage.css";
import Header from "../component/header/Header.js";
import Footer from "../component/footer/Footer.js";
import { useAuth } from "../AuthContext"; // AuthContext'i ekleyelim
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toast stillerini ekleyelim

const BooksListPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState({
    author: "",
    genre: "",
    publisher: "",
    title: "",
  });

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Kullanıcının oturum açıp açmadığını kontrol eden hook

  useEffect(() => {
    const fetchBooks = async () => {
      // Mock data
      const allBooks = [
        {
          id: 1,
          title: "Kitap 1",
          author: "Yazar 1",
          genre: "Tür 1",
          publisher: "Yayın Evi 1",
          image: "kitap1.jpg",
        },
        {
          id: 2,
          title: "Kitap 2",
          author: "Yazar 2",
          genre: "Tür 2",
          publisher: "Yayın Evi 2",
          image: "kitap2.jpg",
        },
        {
          id: 3,
          title: "Kitap 3",
          author: "Yazar 3",
          genre: "Tür 3",
          publisher: "Yayın Evi 3",
          image: "kitap3.jpg",
        },
        {
          id: 4,
          title: "Kitap 4",
          author: "Yazar 4",
          genre: "Tür 4",
          publisher: "Yayın Evi 4",
          image: "kitap4.jpg",
        },
        {
          id: 5,
          title: "Kitap 5",
          author: "Yazar 5",
          genre: "Tür 5",
          publisher: "Yayın Evi 5",
          image: "kitap5.jpg",
        },
        {
          id: 6,
          title: "Kitap 6",
          author: "Yazar 6",
          genre: "Tür 6",
          publisher: "Yayın Evi 6",
          image: "kitap6.jpg",
        },
        {
          id: 7,
          title: "Kitap 7",
          author: "Yazar 7",
          genre: "Tür 7",
          publisher: "Yayın Evi 7",
          image: "kitap7.jpg",
        },
        {
          id: 8,
          title: "Kitap 8",
          author: "Yazar 8",
          genre: "Tür 8",
          publisher: "Yayın Evi 8",
          image: "kitap8.jpg",
        },
        {
          id: 9,
          title: "Kitap 9",
          author: "Yazar 9",
          genre: "Tür 9",
          publisher: "Yayın Evi 9",
          image: "kitap9.jpg",
        },
        {
          id: 10,
          title: "Kitap 10",
          author: "Yazar 10",
          genre: "Tür 10",
          publisher: "Yayın Evi 10",
          image: "kitap10.jpg",
        },
        {
          id: 11,
          title: "Kitap 11",
          author: "Yazar 11",
          genre: "Tür 11",
          publisher: "Yayın Evi 11",
          image: "kitap11.jpg",
        },
        {
          id: 12,
          title: "Kitap 12",
          author: "Yazar 12",
          genre: "Tür 12",
          publisher: "Yayın Evi 12",
          image: "kitap12.jpg",
        },
        {
          id: 13,
          title: "Kitap 13",
          author: "Yazar 13",
          genre: "Tür 13",
          publisher: "Yayın Evi 13",
          image: "kitap13.jpg",
        },
        {
          id: 14,
          title: "Kitap 14",
          author: "Yazar 14",
          genre: "Tür 14",
          publisher: "Yayın Evi 14",
          image: "kitap14.jpg",
        },
        {
          id: 15,
          title: "Kitap 15",
          author: "Yazar 15",
          genre: "Tür 15",
          publisher: "Yayın Evi 15",
          image: "kitap15.jpg",
        },
        {
          id: 16,
          title: "Kitap 16",
          author: "Yazar 16",
          genre: "Tür 16",
          publisher: "Yayın Evi 16",
          image: "kitap16.jpg",
        },
      ];
      setBooks(allBooks);
      setFilteredBooks(allBooks);
    };
    fetchBooks();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const filterBooks = () => {
      const filtered = books.filter((book) =>
        Object.keys(filters).every(
          (key) =>
            typeof book[key] === "string" &&
            book[key].toLowerCase().includes(filters[key].toLowerCase())
        )
      );
      setFilteredBooks(filtered);
    };
    filterBooks();
  }, [filters, books]);

  const handleDetailClick = (id) => {
    if (isAuthenticated) {
      navigate(`/books/${id}`); // Kullanıcı oturum açmışsa kitap detay sayfasına git
    } else {
      toast.warning("Lütfen giriş yapın. Yönlendiriliyorsunuz...");
      setTimeout(() => {
        navigate("/login"); // Oturum açmamışsa giriş yapma sayfasına git
      }, 1000); // 3 saniye bekledikten sonra yönlendirme yap
    }
  };

  return (
    <div className="books-list-page">
      <Header />
      <h2>Kütüphane</h2>
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="title">Kitap ismi ile ara:</label>
          <input
            id="title"
            type="text"
            placeholder="Kitap ismi ile ara..."
            name="title"
            value={filters.title}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="author">Yazar ismi ile ara:</label>
          <input
            id="author"
            type="text"
            placeholder="Yazar ismi ile ara..."
            name="author"
            value={filters.author}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="genre">Tür ile ara:</label>
          <input
            id="genre"
            type="text"
            placeholder="Tür ile ara..."
            name="genre"
            value={filters.genre}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="publisher">Yayın evi ile ara:</label>
          <input
            id="publisher"
            type="text"
            placeholder="Yayın evi ile ara..."
            name="publisher"
            value={filters.publisher}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="books-grid">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>Yazar: {book.author}</p>
            <p>Tür: {book.genre}</p>
            <p>Yayın Evi: {book.publisher}</p>
            <button onClick={() => handleDetailClick(book.id)}>İncele</button>
          </div>
        ))}
      </div>
      <Footer />
      <ToastContainer /> {/* Toast mesajlarının gösterileceği konteyner */}
    </div>
  );
};

export default BooksListPage;