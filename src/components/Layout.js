import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, searchTitle }) => {
  return (
    <>
      <div className='main-container'>
        <Navbar searchTitle={searchTitle} />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
