import React from 'react';
import Layout from '../components/Layout';
import PlaylistInfo from '../components/PlaylistInfo';

const TransferPlaylist = ({ playlistId }) => {
  return (
    <Layout searchTitle='Playlists'>
      <div className='transfer-playlist'>
        <h1>Transfer Playlist</h1>
        <PlaylistInfo playlistId={playlistId} />
      </div>
    </Layout>
  );
};

export default TransferPlaylist;
