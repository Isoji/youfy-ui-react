import React from 'react';
import Layout from '../components/Layout';
import ChoosePlaylist from '../components/ChoosePlaylist';

const Home = () => {
  return (
    <div className='main-container'>
      <Layout>
        <ChoosePlaylist />
      </Layout>
    </div>
  );
};

export default Home;
