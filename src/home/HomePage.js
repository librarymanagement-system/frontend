import React from "react";
import "./HomePage.css";
import heroImage from "../assets/images/hero-image.jpg";
import book1 from "../assets/images/book1.jpg";
import book2 from "../assets/images/book2.jpg";
import book3 from "../assets/images/book3.jpg";

const featuredBooks = [book1, book2, book3];

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <div className="header-container">
          <h1 className="logo">Elysian Kitap Evi</h1>
          <nav className="main-menu">
            <ul>
              <li className="menu-item">
                <a href="#">Bağış Yap</a>
              </li>
              <li className="menu-item">
                <a href="#">Biz Kimiz</a>
                <ul className="dropdown">
                  <li>
                    <a href="#">Vizyonumuz</a>
                  </li>
                  <li>
                    <a href="#">Misyonumuz</a>
                  </li>
                  <li>
                    <a href="#">Tarihçemiz</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item">
                <a href="#">Faaliyetlerimiz</a>
                <ul className="dropdown">
                  <li>
                    <a href="#">Kütüphane Rezervasyon Sistemi</a>
                  </li>
                  <li>
                    <a href="#">Etkinlikler</a>
                  </li>
                  <li>
                    <a href="#">Projeler</a>
                  </li>
                  <li>
                    <a href="#">Eğitimler</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item">
                <a href="#">Destekçilerimiz</a>
                <ul className="dropdown">
                  <li>
                    <a href="#">Sponsorlar</a>
                  </li>
                  <li>
                    <a href="#">Bağışçılar</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item">
                <a href="#">Basında Biz</a>
              </li>
              <li className="menu-item">
                <a href="#">Bize Katılın</a>
              </li>
              <li className="menu-item">
                <a href="#">Blog</a>
              </li>
              <li className="menu-item">
                <a href="#">İletişim</a>
              </li>
            </ul>
          </nav>
          <div className="auth-buttons">
            <a href="/sign-up" className="btn login-btn">
              Giriş Yap
            </a>
            <a href="/login" className="btn sign-up-btn">
              Kayıt Ol
            </a>
          </div>
        </div>
      </header>

      <main className="homepage-main">
        <section className="hero">
          <div className="hero-content">
            <h2>Hoşgeldiniz</h2>
            <p>
              En iyi kitapları keşfedin, yeni dünyalar açın ve kütüphanemizin
              sunduğu olanaklardan yararlanın.
            </p>
            <a href="/login" className="cta-button">
              Hızlı Başla
            </a>
          </div>
        </section>

        <section className="featured-books">
          <h2>Öne Çıkan Kitaplar</h2>
          <div className="books-container">
            {featuredBooks.map((book, index) => (
              <div key={index} className="book-card">
                <img
                  src={book}
                  alt={`Öne Çıkan Kitap ${index + 1}`}
                  className="book-image"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="activities">
          <h2>Faaliyetlerimiz</h2>
          <div className="activities-list">
            <div className="activity-item">
              <h3>Kütüphane Rezervasyon Sistemi</h3>
              <p>
                Kitaplarınızı online olarak rezerve edin ve ödünç alma
                işlemlerinizi kolaylaştırın. Sistemi kullanarak kitap
                rezervasyonu yapabilir, mevcut rezervasyonlarınızı takip
                edebilir ve kütüphanemizdeki kitaplara daha hızlı
                erişebilirsiniz.
              </p>
            </div>
            <div className="activity-item">
              <h3>Yazar Buluşmaları</h3>
              <p>
                Popüler yazarlarla yapılacak buluşmalar, kitaplarını imzalatma
                ve sohbet etme fırsatı sunar.
              </p>
            </div>
            <div className="activity-item">
              <h3>Okuma Grupları</h3>
              <p>
                Belirli kitaplar etrafında tartışmaların yapıldığı gruplar,
                okuma deneyiminizi paylaşmanıza yardımcı olur.
              </p>
            </div>
            <div className="activity-item">
              <h3>Kültürel Seminerler</h3>
              <p>
                Kültürel etkinlikler, seminerler ve konuşmalar, entelektüel
                gelişiminizi destekler.
              </p>
            </div>
          </div>
        </section>
      </main>

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
    </div>
  );
};

export default HomePage;
