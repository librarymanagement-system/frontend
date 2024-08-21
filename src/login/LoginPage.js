import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './LoginPage.css'; 

const LoginPage = () => {
  const [eposta, setEposta] = useState('');
  const [sifre, setSifre] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-page">
      <header className="header">
        <Link to="/home" className="logo">
          Elysian Kitap Evi
        </Link>{" "}
      </header>
      <div className="login-container">
        <div className="login-box">
          <h2>Giriş Yap</h2>
          <form onSubmit={handleLogin}>
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
            <button type="submit" className="btn">Giriş Yap</button>
            <p className="signup-link">
              Hesabınız yok mu? <a href="/sign-up">Kayıt Ol</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
