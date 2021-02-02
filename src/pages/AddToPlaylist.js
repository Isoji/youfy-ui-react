import React from 'react';
import ChoosePlaylist from '../components/ChoosePlaylist';
import Layout from '../components/Layout';

const AddToPlaylist = () => {
  return (
    <Layout>
      <div className='choose-playlist'>
        <h1>Your Playlists</h1>
        <ChoosePlaylist />
      </div>
    </Layout>
  );
};

export default AddToPlaylist;
