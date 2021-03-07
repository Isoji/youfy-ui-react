import React, { useRef, useState } from 'react';

import PlaylistImg from '../images/playlist-d-img.svg';
import OneSongFromPl from './OneSongFromPl';

import TransferIcon from '../images/transfer.svg';
import ExportIcon from '../images/export-icon.svg';

const PlaylistInfo = ({ playlistId }) => {
  const songsList = useRef();

  const [selectedAll, setSelectedAll] = useState(false);

  const handleSelectAll = () => {
    selectedAll ? setSelectedAll(false) : setSelectedAll(true);
  };
  const playlistSongs = Array(8).fill(
    <OneSongFromPl selectedAll={selectedAll} />
  );

  // your yt function

  return (
    <>
      <div className='playlist-info'>
        <div className='left'>
          <h2 className='lbl'>Youtube Playlist</h2>
          <div className='playlist-container'>
            <img src={PlaylistImg} alt='' className='playlist-img' />
            <div className='playlist-details'>
              <span className='playlist-type'>PUBLIC</span>
              <h1 className='playlist-title'>Favorite Songs</h1>
              <p className='playlist-artist'>26 Songs</p>
              <p className='playlist-duration'>Updated Today</p>
            </div>
          </div>
        </div>
        <div className='line'></div>
        <div className='right'>
          <div className='header'>
            <h2 className='lbl'>Detected Songs</h2>
            <input
              type='button'
              value={selectedAll ? 'Unselect all' : 'Select all'}
              className='btn'
              onClick={handleSelectAll}
            />
          </div>
          <ul className='playlist-songs' id='pl-list' ref={songsList}>
            {playlistSongs}
          </ul>
        </div>
      </div>
      <div className='btns'>
        <a className='link-btn' href='https://youfyapp.com'>
          <img src={TransferIcon} alt='' className='btn-icon' />
          <span className='btn-text'>Transfer to Spotify</span>
        </a>
        <a className='link-btn' href='https://youfyapp.com'>
          <img src={ExportIcon} alt='' className='btn-icon' />
          <span className='btn-text'>Export</span>
        </a>
      </div>
    </>
  );
};

export default PlaylistInfo;
