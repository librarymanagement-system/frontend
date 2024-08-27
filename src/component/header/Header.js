import React from "react";
import { Link } from "react-router-dom"; 
import "./Header.css"; 
import logo from "../../assets/images/logo.png"; // Logo dosyasının yolu

const Header = () => {
  return (
    <header className="homepage-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Elysian Kitap Evi Logo" />
        </Link>
        <nav className="main-menu">
          <ul>
            <li className="menu-item">
              <Link to="#">Bağış Yap</Link>
            </li>
            <li className="menu-item">
              <Link to="#">Biz Kimiz</Link>
              <ul className="dropdown">
                <li>
                  <Link to="#">Vizyonumuz</Link>
                </li>
                <li>
                  <Link to="#">Misyonumuz</Link>
                </li>
                <li>
                  <Link to="#">Tarihçemiz</Link>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <Link to="#">Faaliyetlerimiz</Link>
              <ul className="dropdown">
                <li>
                  <Link to="#">Kütüphane Rezervasyon Sistemi</Link>
                </li>
                <li>
                  <Link to="#">Etkinlikler</Link>
                </li>
                <li>
                  <Link to="#">Projeler</Link>
                </li>
                <li>
                  <Link to="#">Eğitimler</Link>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <Link to="#">Destekçilerimiz</Link>
              <ul className="dropdown">
                <li>
                  <Link to="#">Sponsorlar</Link>
                </li>
                <li>
                  <Link to="#">Bağışçılar</Link>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <Link to="#">Basında Biz</Link>
            </li>
            <li className="menu-item">
              <Link to="#">Bize Katılın</Link>
            </li>
            <li className="menu-item">
              <Link to="#">Blog</Link>
            </li>
            <li className="menu-item">
              <Link to="#">İletişim</Link>
            </li>
            <li className="menu-item">
              <Link to="#">Hakkımızda</Link>
            </li>
          </ul>
          
        </nav>
        <div className="auth-buttons">
          <Link to="/login" className="btn login-btn">
            Giriş Yap
          </Link>
          <Link to="/sign-up" className="btn sign-up-btn">
            Kayıt Ol
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
