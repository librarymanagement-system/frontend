import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";
import LoginPage from "./auth/login/LoginPage";
import SignPage from "./auth/sign/SignPage";
import AdminPage from "./admin/AdminPage";
import BooksListPage from "./booklist/BooksListPage";
import BookDetailPage from "./bookdetail/BookDetailPage";
import { AuthProvider } from "./AuthContext";
import BorrowedBooksPage from "./uyelik/borrowedbooks/BorrowedBooksPage";
import ProfilePage from "./uyelik/profile/profile";  // Fix case for ProfilePage
import ReturnsPage from './uyelik/returns/ReturnsPage';

import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/books" element={<BooksListPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/borrowed-books" element={<BorrowedBooksPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/returns" element={<ReturnsPage />} /> {/* Fixed here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
