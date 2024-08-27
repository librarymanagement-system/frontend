import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../services/bookService";
import "./BooksListPage.css";
import Header from "../component/header/Header.js";
import Footer from "../component/footer/Footer.js";
import { useAuth } from "../AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";

const formatList = (items, getName) => {
  return (items || []).map(getName).join(", ");
};

const BooksListPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const loadBooks = async (page = 0) => {
    try {
      const { content, totalElements } = await fetchBooks(searchTerm, page);
      setBooks(content);
      setPageCount(Math.ceil(totalElements / 12));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadBooks(currentPage);
  }, [searchTerm, currentPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDetailClick = (id) => {
    if (isAuthenticated) {
      navigate(`/books/${id}`);
    } else {
      navigate("/login", { state: { from: `/books/${id}` } });
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
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
        <button className="se-area" onClick={() => loadBooks(0)}>
          Ara
        </button>
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
                {formatList(book.authors, (a) => `${a.firstName} ${a.lastName}`)}
              </p>
              <p>{formatList(book.genres, (g) => g.name)}</p>
              <p className="publisher">
                {formatList(book.publishers, (p) => p.name)}
              </p>
              <button
                onClick={() => handleDetailClick(book.id)}
                className="view-btn"
              >
                Detay
              </button>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Önceki"}
        nextLabel={"Sonraki"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default BooksListPage;
