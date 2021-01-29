import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import SongInfo from './SongInfo';

const App = () => {
  return (
    <div className='main-container'>
      <Navbar />
      <SongInfo />
      <Footer />
    </div>
  );
};

export default App;
