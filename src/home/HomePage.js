import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import heroImage from "../assets/images/hero-image.jpg";
import book1 from "../assets/images/book1.jpg";
import book2 from "../assets/images/book2.jpg";
import book3 from "../assets/images/book3.jpg";
import Header from "../component/header/Header.js";
import Footer from "../component/footer/Footer.js";
import Layout from '../Layout.js';


const featuredBooks = [book1, book2, book3];

const HomePage = () => {
  const navigate = useNavigate();

  const handleQuickStart = () => {
    navigate("/books");
  };

  return (
    <Layout>

    <div className="homepage">
      <main className="homepage-main">
        <section className="hero">
          <div className="hero-content">
            <h2>Hoşgeldiniz</h2>
            <p>
              En iyi kitapları keşfedin, yeni dünyalar açın ve kütüphanemizin
              sunduğu olanaklardan yararlanın.
            </p>
            <button onClick={handleQuickStart} className="cta-button">
              Hızlı Başla
            </button>
          </div>
        </section>

        <section className="featured-books">
          <h2>Öne Çıkan Kitaplar</h2>
          <div className="books-container">
            {featuredBooks.map((book, index) => (
              <img
                key={index}
                src={book}
                alt={`Öne Çıkan Kitap ${index + 1}`}
                className="book-image-home"
              />
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
    </div>
    </Layout>

  );
};

export default HomePage;
