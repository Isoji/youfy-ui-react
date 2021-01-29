import React from 'react';
import ChoosePlaylist from '../pages/ChoosePlaylist';
import Footer from './Footer';
import Navbar from './Navbar';

const App = () => {
  return (
    <div className='main-container'>
      <Navbar />
      <ChoosePlaylist />
      <Footer />
    </div>
  );
};

export default App;
