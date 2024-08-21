import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import SignPage from './sign/SignPage';
import AdminPage from './admin/AdminPage';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignPage />} />
                <Route path="/admin/*" element={<AdminPage />} />
            </Routes>
        </Router>
    );
};

export default App;
