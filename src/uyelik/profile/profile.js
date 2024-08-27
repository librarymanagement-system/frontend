import React, { useState, useEffect } from "react";
import Hamburger from "../../component/hamburger/hamburger.js";
import api from "../../interceptor";
import "./profile.css";
import Footer from "../../component/footer/Footer.js";


const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get(`/api/users/getUserDetails/${userId}`);
        const user = response.data;
        setFormData({
          name: user.name,
          username: user.username,
          email: user.email,
          password: "", 
        });
      } catch (error) {
        setErrorMessage("Kullanıcı bilgileri alınamadı.");
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/api/users/updateUser/${userId}`, formData);

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
              value={formData.name}
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
              value={formData.username}
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
              value={formData.email}
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
              value={formData.password}
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
