import React from "react";
import { Link } from "react-router-dom"; 
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="homepage-footer">
    <div className="footer-container">
      <div className="footer-section contact">
        <h3>İletişim</h3>
        <p>
          Email: <a href="mailto:info@elysian.com">info@elysian.com</a>
        </p>
        <p>
          Telefon: <a href="tel:+901234567890">+90 123 456 7890</a>
        </p>
        <p>
          Adres: Elysian Kitap Evi, Kütüphane Sokak, No: 123, Şehir, Ülke
        </p>
      </div>
      <div className="footer-section social">
        <h3>Sosyal Medya</h3>
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
        <a href="#">LinkedIn</a>
      </div>
      <div className="footer-section about">
        <h3>Hakkımızda</h3>
        <p>
          Kütüphanemiz, kitapların ötesinde bir deneyim sunar. Hedefimiz,
          toplumu okuma alışkanlıkları ve kültürel etkinliklerle
          desteklemektir.
        </p>
      </div>
    </div>
    <p className="footer-bottom">© 2024 Elysian Kitap Evi</p>
  </footer>
  );
};

export default Footer;