import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./hamburger.css";

const Hamburger = ({ logoText }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
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
            <Link to="/profile" onClick={toggleMenu}>
              Profilim
            </Link>
            <Link to="/borrowed-books" onClick={toggleMenu}>
              Ödünç Aldıklarım
            </Link>
            <Link to="/" onClick={toggleMenu}>
              Çıkış Yap
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Hamburger;
