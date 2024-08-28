import React, { useState, useEffect } from "react";
import Hamburger from "../../component/hamburger/hamburger.js";
import api from "../../interceptor";
import "./profile.css";
import Footer from "../../component/footer/Footer.js";
import {
  getUserDetails,
  updateUserDetails,
} from "../../services/authService.js";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await getUserDetails(userId);
        setName(user.name);
        setUsername(user.username);
        setEmail(user.email);
        setPassword("");
      } catch (error) {
        setErrorMessage("Kullanıcı bilgileri alınamadı.");
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserDetails(userId, { name, username, email, password });
      setSuccessMessage("Profil başarıyla güncellendi!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Profil güncellenirken bir hata oluştu.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="profile-page">
      <Hamburger />
      <div className="profile-form-container">
        <h1>Profilimi Güncelle</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">İsim</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="profile-submit-btn">
            Güncelle
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
