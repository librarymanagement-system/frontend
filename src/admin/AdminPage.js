import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
    const [bookName, setBookName] = useState('');
    const [publisher, setPublisher] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dateTime, setDateTime] = useState(new Date().toLocaleString());

    const navigate = useNavigate();

    // Mock Data
    const mockBooks = [
        { id: '1', name: 'Kitap 1', publisher: 'Yayıncı 1', author: 'Yazar 1', genre: 'Tür 1', status: 'active' },
        { id: '2', name: 'Kitap 2', publisher: 'Yayıncı 2', author: 'Yazar 2', genre: 'Tür 2', status: 'active' },
        { id: '3', name: 'Kitap 3', publisher: 'Yayıncı 3', author: 'Yazar 3', genre: 'Tür 3', status: 'active' }
    ];

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                setTimeout(() => {
                    setBooks(mockBooks);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                setError('Error fetching books');
                console.error('Error fetching books:', error);
                setLoading(false);
            }
        };

        fetchBooks();

        const intervalId = setInterval(() => {
            setDateTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleAddBook = () => {
        if (!bookName || !publisher || !author || !genre) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }

        const newBook = {
            id: (books.length + 1).toString(),
            name: bookName,
            publisher,
            author,
            genre,
            status: 'active'
        };

        setBooks([...books, newBook]);
        clearInputs();
    };

    const handleRemoveBook = (bookId) => {
        setBooks(books.filter(book => book.id !== bookId));
    };

    const clearInputs = () => {
        setBookName('');
        setPublisher('');
        setAuthor('');
        setGenre('');
    };

    const handleLogout = () => {
        navigate('/home');
    };

    return (
        <div className="admin-container">
            <header className="header">
                <Link to="/" className="logo">Elysian Kitap Evi</Link>
                <div className="header-right">
                    <div className="date-time">{dateTime}</div>
                    <button className="logout-button" onClick={handleLogout}>Çıkış</button>
                </div>
            </header>
            <div className="admin-content">
                <div className="form-container">
                    <h1>Kitap Ekleme ve Çıkarma</h1>
                    <div className="form-group">
                        <input 
                            type="text" 
                            value={bookName} 
                            onChange={(e) => setBookName(e.target.value)} 
                            placeholder="Kitap İsmi" 
                        />
                        <input 
                            type="text" 
                            value={publisher} 
                            onChange={(e) => setPublisher(e.target.value)} 
                            placeholder="Yayın Evi" 
                        />
                        <input 
                            type="text" 
                            value={author} 
                            onChange={(e) => setAuthor(e.target.value)} 
                            placeholder="Yazar" 
                        />
                        <input 
                            type="text" 
                            value={genre} 
                            onChange={(e) => setGenre(e.target.value)} 
                            placeholder="Tür" 
                        />
                        <button onClick={handleAddBook}>Kitap Ekle</button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </div>
                <div className="book-list">
                    <h2>Mevcut Kitaplar</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Kitap İsmi</th>
                                    <th>Yayın Evi</th>
                                    <th>Yazar</th>
                                    <th>Tür</th>
                                    <th>Durum</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map(book => (
                                    <tr key={book.id}>
                                        <td>{book.name}</td>
                                        <td>{book.publisher}</td>
                                        <td>{book.author}</td>
                                        <td>{book.genre}</td>
                                        <td>{book.status}</td>
                                        <td>
                                            <button onClick={() => handleRemoveBook(book.id)} className="remove-btn">
                                                Kaldır
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
