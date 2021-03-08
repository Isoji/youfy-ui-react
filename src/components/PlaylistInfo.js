import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import OneSongFromPl from './OneSongFromPl';
import TransferIcon from '../images/transfer.svg';
import ExportIcon from '../images/export-icon.svg';
import { formatTitle } from '../utils/formats';
import { token } from '../utils/gets';

const PlaylistInfo = ({ playlistId }) => {
  const YT_API_KEY = 'AIzaSyC6vmYcT-hJnW2dS_gf3X8oHDQWR64z-G8';
  const songsList = useRef();

  const [playlistTitle, setPlaylistTitle] = useState(null); // title of the playlist
  const [playlistVideos, setPlaylistVideos] = useState([]); // playlist video objects from the playlist
  const [songTitle, setSongTitle] = useState(null); // title of the current song to be used for Spotify API query
  const [selectedAll, setSelectedAll] = useState(false);
  const [spotifySongs, setSpotifySongs] = useState([]); // resulted Spotify song objects from the Spotify API queries

  const playlistItemsQueryConfig = {
    method: 'get',
    url: `https://www.googleapis.com/youtube/v3/playlistItems?key=${YT_API_KEY}&part=snippet&playlistId=${playlistId}&maxResults=50`,
  };

  const playlistsQueryConfig = {
    method: 'get',
    url: `https://www.googleapis.com/youtube/v3/playlists?key=${YT_API_KEY}&part=snippet&id=${playlistId}`,
  };

  const spotifySongQueryConfig = {
    method: 'get',
    url: `https://api.spotify.com/v1/search?q=${songTitle}&type=track&limit=1`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSelectAll = () => {
    selectedAll ? setSelectedAll(false) : setSelectedAll(true);
  };

  const getPlaylistData = () => {
    axios(playlistItemsQueryConfig) // gathering data using the playlistItems GET request
      .then((response) => {
        response.data.items.map((obj) => {
          setPlaylistVideos((playlistVideos) => [
            // Pushing the playlistItem object into playlistVideos array state
            ...playlistVideos,
            obj.snippet,
          ]);
          setSongTitle(formatTitle(obj.snippet.title)); // Setting the formatted song title into songTitle state
        });
      })
      .catch((error) => console.log('error', error));

    axios(playlistsQueryConfig) // gathering data using the playlists GET request
      .then((response) => {
        setPlaylistTitle(response.data.items[0].snippet.localized.title); // setting the playlist title
      })
      .catch((error) => console.log('error', error));
  };

  const getSpotifyData = () => {
    songTitle &&
      axios(spotifySongQueryConfig)
        .then((response) => {
          if (response.data.tracks.items[0])
            setSpotifySongs((spotifySongs) => [
              // Pushing the resulted song from Spotify API query into spotifySongs array state
              ...spotifySongs,
              response.data.tracks.items[0],
            ]);
        })
        .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    getPlaylistData();
  }, []);

  // Runs everytime songTitle is changed
  useEffect(() => {
    if (songTitle) {
      getSpotifyData();
    }
  }, [songTitle]);

  return (
    <>
      {playlistTitle && playlistVideos.length > 0 && spotifySongs.length > 0 ? (
        <>
          <div className='playlist-info'>
            <div className='left'>
              <h2 className='lbl'>Youtube Playlist</h2>
              <div className='playlist-container'>
                <img
                  src={playlistVideos[0].thumbnails.default.url}
                  alt=''
                  className='playlist-img'
                />
                <div className='playlist-details'>
                  <h1 className='playlist-title'>{playlistTitle}</h1>
                  <p className='playlist-artist'>
                    {playlistVideos.length} Videos
                  </p>
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
                {spotifySongs.map((song, i) => (
                  <OneSongFromPl selectedAll={selectedAll} song={song} />
                ))}
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
      ) : (
        <h1 className='loading'>Loading...</h1>
      )}
    </>
  );
};

export default PlaylistInfo;
