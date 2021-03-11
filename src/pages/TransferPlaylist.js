import React from 'react';
import Layout from '../components/Layout';
import PlaylistInfo from '../components/PlaylistInfo';

const TransferPlaylist = ({ playlistId }) => {
  return (
    <Layout>
      <PlaylistInfo playlistId={playlistId} />
    </Layout>
  );
};

export default TransferPlaylist;
