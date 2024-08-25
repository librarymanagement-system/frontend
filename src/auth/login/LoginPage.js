import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../interceptor";
import "../login/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "/books";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const authResponse = await api.post("/api/authenticate", {
        username,
        password,
      });

      console.log("Giriş başarılı:", authResponse.data);
      const token = authResponse.data.token;
      const userId = authResponse.data.id;

      localStorage.setItem("token", token);

      const userDetailsResponse = await api.get(`/api/users/getUserDetails/${userId}`);
      const userRole = userDetailsResponse.data.role;

      if (userRole === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error(
        "Giriş hatası:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage(
        error.response && error.response.data
          ? `Giriş hatası: ${error.response.data.message}`
          : "Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin."
      );
    }
  };


  return (
    <div className="login-page">
      <header className="header">
        <Link to="/home" className="logo">
          Elysian Kitap Evi
        </Link>
      </header>
      <div className="login-container">
        <div className="login-box">
          <h2>Giriş Yap</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleLogin}>
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
              Giriş Yap
            </button>
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