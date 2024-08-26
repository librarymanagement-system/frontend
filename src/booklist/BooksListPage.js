import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../interceptor";
import "./BooksListPage.css";
import Header from "../component/header/Header.js";
import Footer from "../component/footer/Footer.js";
import { useAuth } from "../AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";

const BooksListPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const fetchBooks = async (page = 0) => {
    try {
      const response = await api.get("/api/books/searchSingle", {
        params: {
          searchTerm,
          page,
          size: 12, // Sayfa başına kitap sayısını 12 olarak ayarla
          sort: "id,asc"
        },
      });
      setBooks(response.data.content || []);
      setPageCount(Math.ceil(response.data.totalElements / 12)); // Toplam sayfa sayısını hesapla
    } catch (error) {
      console.error("Kitaplar yüklenirken hata oluştu:", error);
      toast.error("Kitaplar yüklenirken bir hata oluştu.");
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [searchTerm, currentPage]);

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
        <button className="se-area" onClick={() => fetchBooks(0)}>Ara</button>
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
