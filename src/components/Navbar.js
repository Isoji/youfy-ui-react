import React from 'react';
import Searchbar from './Searchbar';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1 className='logo-text'>Youfy</h1>
      <Searchbar placeholder='Search Songs ...' />
      <h2>Sign In</h2>
    </nav>
  );
};

export default Navbar;
