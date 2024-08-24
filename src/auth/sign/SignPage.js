// src/sign/SignPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../interceptor';
import './SignPage.css';

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/register', {
        name,
        email,
        username,
        password,
      });
      console.log('Kayıt başarılı:', response.data);
      window.location.href = '/login';
    } catch (error) {
      console.error('Kayıt hatası:', error.response ? error.response.data : error.message);
      setErrorMessage('Kayıt yapılamadı. Lütfen bilgilerinizi kontrol edin.');
    }
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSignUp}>
            <div className="input-group">
              <label htmlFor="name">İsim</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">E-posta</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="username">Kullanıcı Adı</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Şifre</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
