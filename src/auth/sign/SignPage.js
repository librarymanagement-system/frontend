import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../../services/authService'; 
import './SignPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(name, email, username, password);
      toast.success("Başarıyla kayıt oldunuz! Giriş yapabilirsiniz.");
      navigate('/login');
    } catch (error) {
      setErrorMessage('Kayıt yapılamadı. Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.');
      toast.error("Kayıt yapılamadı. Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.");
    }
  };

  return (
    <div className="signup-page">
      <header className="header">
        <Link to="/" className="logo">Elysian Kitap Evi</Link>
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
            <button type="submit" className="btn">Kayıt Ol</button>
            <p className="login-link">
              Zaten bir hesabınız var mı? <Link to="/login">Giriş Yap</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default SignUpPage;
