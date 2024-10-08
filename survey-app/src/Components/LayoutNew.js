// src/Components/Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import NavExample from './NewNavBar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const noNavRoutes = ['/signup', '/login', '/','/forgot-password','/reset-password'];

  const shouldShowNav = !noNavRoutes.includes(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      {shouldShowNav && <NavExample />}
      <main className="flex-grow-1 p-0 m-0">
        <div className="container-fluid p-0">{children}</div>
      </main>
      {shouldShowNav && <Footer />}
    </div>
  );
};

export default Layout;
