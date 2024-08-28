import React from 'react';
import Header from './component/header/Header.js';
import Footer from './component/footer/Footer.js';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
