import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignPage.css';

const SignUpPage = () => {
  const [isim, setIsim] = useState("");
  const [eposta, setEposta] = useState("");
  const [sifre, setSifre] = useState("");
  const [sifreOnay, setSifreOnay] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signup-page">
      <header className="header">
        <Link to="/home" className="logo">
          Elysian Kitap Evi
        </Link>{" "}
      </header>
      <div className="signup-container">
        <div className="signup-box">
          <h2>Kayıt Ol</h2>
          <form onSubmit={handleSignUp}>
            <div className="input-group">
              <label htmlFor="isim">İsim</label>
              <input
                type="text"
                id="isim"
                value={isim}
                onChange={(e) => setIsim(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="eposta">E-posta</label>
              <input
                type="email"
                id="eposta"
                value={eposta}
                onChange={(e) => setEposta(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="sifre">Şifre</label>
              <input
                type="password"
                id="sifre"
                value={sifre}
                onChange={(e) => setSifre(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="sifreOnay">Şifreyi Onayla</label>
              <input
                type="password"
                id="sifreOnay"
                value={sifreOnay}
                onChange={(e) => setSifreOnay(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn">
              Kayıt Ol
            </button>
            <p className="login-link">
              Zaten bir hesabınız var mı? <a href="/login">Giriş Yap</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
