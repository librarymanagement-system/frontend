import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../component/Header';
import './BorrowPage.css';

const BorrowPage = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBorrowClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="borrow-page">
      <Header />
      <div className="borrow-page-content">
        <h1>Kitap Ödünç Alma</h1>
        <p className="book-id">Kitap ID: <span>{id}</span></p>
        <form className="borrow-form">
          <label htmlFor="user-name">Adınız:</label>
          <input type="text" id="user-name" name="user-name" required />

          <label htmlFor="user-email">E-posta:</label>
          <input type="email" id="user-email" name="user-email" required />

          <label htmlFor="return-date">Dönüş Tarihi:</label>
          <input type="date" id="return-date" name="return-date" required />

          <button type="button" className="submit-button" onClick={handleBorrowClick}>Ödünç Al</button>
        </form>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Önemli Bilgilendirme</h2>
              <ul>
                <li>Kullanıcılar, kütüphaneden ödünç aldıkları kitapların iadesini 1 aylık süre içinde gerçekleştirmelidir. İadesi yapılmayan kitaplar kaybolmuş olarak kabul edilir.</li>
                <li>Kitap kaybına sebep olan kullanıcıların ödünç alma süresi ilk sefer için yarıya indirilecek, ikinci kitap kaybından sonra kitap ödünç alma hakları iptal edilecektir.</li>
                <li>Bir kullanıcının üzerinde bulunan ödünç kitap sayısı 3 ile sınırlandırılmıştır.</li>
              </ul>
              <button className="confirm-button" onClick={handleConfirm}>Onaylıyorum</button>
              <button className="close-button" onClick={handleCloseModal}>Kapat</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowPage;
