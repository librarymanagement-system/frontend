import React, { useState } from "react";
import Hamburger from "../../component/hamburger/hamburger.js"; // Adjust path if needed
import "./profile.css";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    username: "johndoe123",
    email: "johndoe@example.com",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="profile-page">
      <Hamburger />
      <div className="profile-form-container">
        <h1>Profilimi Güncelle</h1>
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
    </div>
  );
};

export default ProfilePage;
