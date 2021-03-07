import React, { useRef, useState } from 'react';
import axios from 'axios';

import PlaylistImg from '../images/playlist-d-img.svg';
import OneSongFromPl from './OneSongFromPl';

import TransferIcon from '../images/transfer.svg';
import ExportIcon from '../images/export-icon.svg';

const PlaylistInfo = ({ playlistId }) => {
  const songsList = useRef();

  const [playlistTitle, setPlaylistTitle] = useState(null); // title of the playlist
  const [videoTitles, setVideoTitles] = useState(null); // collection of video titles from the playlist
  const [videoThumbnails, setVideoThumbnails] = useState(null); // collection of video thumbnail sources from the playlist
  const [selectedAll, setSelectedAll] = useState(false);
  const [playlistItemsURL, setPlaylistItemsURL] = useState(
    `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.YT_API_KEY}&part=snippet&playlistId=${playlistId[1]}&maxResults=50`
  );

  var configPlaylistItems = {
    method: 'get',
    url: playlistItemsURL,
  };

  var configPlaylists = {
    method: 'get',
    url: `https://www.googleapis.com/youtube/v3/playlists?key=${process.env.YT_API_KEY}&part=snippet&id=${playlistId[1]}`,
  };

  const handleSelectAll = () => {
    selectedAll ? setSelectedAll(false) : setSelectedAll(true);
  };

  const playlistSongs = Array(8).fill(
    <OneSongFromPl selectedAll={selectedAll} />
  );

  const getPlaylistData = () => {
    const tempVideoTitles = [];
    const tempVideoThumbnails = [];

    axios(configPlaylistItems) // gathering data using the playlistItems GET request
      .then((response) => {
        response.data.items.map(
          (obj) => tempVideoTitles.push(obj.snippet.title) // adding video title strings from response into temp array
        );
        response.data.items.map(
          (obj) => tempVideoThumbnails.push(obj.snippet.thumbnails.default.url) // adding video thumbnail sources from response into temp array
        );
        setVideoTitles(tempVideoTitles); // setting the video titles
        setVideoThumbnails(tempVideoThumbnails); // setting the video thumbnails
      })
      .catch((error) => console.log('error', error));

    axios(configPlaylists) // gathering data using the playlists GET request
      .then((response) => {
        setPlaylistTitle(response.items[0].snippet.localized.title); // setting the playlist title
      })
      .catch((error) => console.log('error', error));
  };

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
