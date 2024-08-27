import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login, getUserDetails } from '../../services/authService'; 
import "../login/LoginPage.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
      const authResponse = await login(username, password);
      const { token, id: userId } = authResponse;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      const userDetailsResponse = await getUserDetails(userId);
      const userRole = userDetailsResponse.role;

      if (userRole === "ADMIN") {
        toast.success("Başarıyla giriş yaptınız. Yönetici paneline yönlendiriliyorsunuz.");
        navigate("/admin", { replace: true });
      } else {
        toast.success("Başarıyla giriş yaptınız. Kitaplar sayfasına yönlendiriliyorsunuz.");
        navigate(from, { replace: true });
      }
    } catch (error) {
      setErrorMessage("Giriş işlemi başarısız oldu. Lütfen kullanıcı adı ve şifrenizi kontrol edin.");
      toast.error("Giriş işlemi başarısız oldu. Lütfen kullanıcı adı ve şifrenizi kontrol edin.");
    }
  };

  return (
    <div className="login-page">
      <header className="header">
        <Link to="/" className="logo">Elysian Kitap Evi</Link>
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
            <button type="submit" className="btn">Giriş Yap</button>
            <p className="signup-link">
              Hesabınız yok mu? <Link to="/sign-up">Kayıt Ol</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default LoginPage;
