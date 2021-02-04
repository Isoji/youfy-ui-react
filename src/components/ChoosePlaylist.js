import React from 'react';
import PlImg1 from '../images/song-album.jpg';
import PlusBig from '../images/plus-big.svg';
import { useHistory } from 'react-router';

const ChoosePlaylist = () => {
  let playlists = [];

  const history = useHistory();

  const goToNP = () => {
    history.push(`/add-new-playlist`);
  };

  for (let index = 0; index < 11; index++) {
    playlists.push(
      <div className='one-playlist' key={index}>
        <img src={PlImg1} alt='' className='playlist-img' />
        <div className='playlist-text'>
          <h4 className='playlist-name'>Top EDM Mix</h4>
          <span className='playlist-owner'>By Justin Logan</span>
        </div>
      </div>
    );
  }
  return (
    <div className='playlists'>
      <div className='one-playlist first' onClick={goToNP}>
        <img src={PlusBig} alt='' className='playlist-img' />
        <div className='playlist-text'>
          <h4 className='big-text'>Create New Playlist</h4>
        </div>
      </div>

      {playlists}
    </div>
  );
};

export default ChoosePlaylist;
