import React, { useRef, useState, useEffect, useContext } from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';
import OneSongFromPl from './OneSongFromPl';
import TransferIcon from '../images/transfer.svg';
import ExportIcon from '../images/export-icon.svg';
import { formatTitle } from '../utils/formats';
import { YT_API_KEY, token } from '../utils/gets';
import { Link } from 'react-router-dom';
import { PlaylistSongsContext } from '../utils/contexts';

import Checkmark from '../images/checkmark.svg';
import Cross from '../images/cross.svg';

const PlaylistInfo = ({ playlistId }) => {
  const songsList = useRef();
  const userId = 'yilxfvdt11z0c1myy94cyz6n6';

  const [playlistTitle, setPlaylistTitle] = useState(null); // title of the playlist
  const [playlistDesc, setPlaylistDesc] = useState(null); // title of the playlist
  const [playlistVideos, setPlaylistVideos] = useState([]); // playlist video objects from the playlist
  const [songTitle, setSongTitle] = useState(null); // title of the current song to be used for Spotify API query
  const [selectedAll, setSelectedAll] = useState(false);
  const [spotifySongs, setSpotifySongs] = useState([]); // resulted Spotify song objects from the Spotify API queries
  const [isTransferClicked, setIsTransferClicked] = useState(null);
  const [isPlaylistCreated, setIsPlaylistCreated] = useState(false);
  const [targetPlaylistId, setTargetPlaylistId] = useState(null);
  const [addToPlaylistConfig, setAddToPlaylistConfig] = useState(null);
  const [successfulTransfer, setSuccessfulTransfer] = useState(false);
  const { selectedSongs, setSelectedSongs } = useContext(PlaylistSongsContext);

  const data = JSON.stringify({
    name: playlistTitle,
    description: playlistDesc,
    public: false,
  });

  const youtubePlaylistItemsConfig = {
    method: 'get',
    url: `https://www.googleapis.com/youtube/v3/playlistItems?key=${YT_API_KEY}&part=snippet&playlistId=${playlistId}&maxResults=50`,
  };

  const youtubePlaylistsConfig = {
    method: 'get',
    url: `https://www.googleapis.com/youtube/v3/playlists?key=${YT_API_KEY}&part=snippet&id=${playlistId}`,
  };

  const spotifySongConfig = {
    method: 'get',
    url: `https://api.spotify.com/v1/search?q=${songTitle}&type=track&limit=1`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const spotifyCreatePlaylistConfig = {
    method: 'post',
    url: `https://api.spotify.com/v1/users/${userId}/playlists`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const handleSelectAll = () => {
    selectedAll ? setSelectedAll(false) : setSelectedAll(true);
  };

  const handleTransferBtn = () => {
    if (!isTransferClicked && selectedSongs.length > 0) {
      setIsTransferClicked(true);
    } else {
      setIsTransferClicked(false);
    }
  };

  const getPlaylistData = () => {
    axios(youtubePlaylistItemsConfig) // gathering data using the playlistItems GET request
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

    axios(youtubePlaylistsConfig) // gathering data using the playlists GET request
      .then((response) => {
        setPlaylistTitle(response.data.items[0].snippet.title); // Setting the playlist title into playlistTitle state
        setPlaylistDesc(response.data.items[0].snippet.description); // Setting the playlist description into playlistDesc state
      })
      .catch((error) => console.log('error', error));
  };

  const getSpotifyData = () => {
    songTitle &&
      axios(spotifySongConfig)
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

  const createSpotifyPlaylist = () => {
    axios(spotifyCreatePlaylistConfig)
      .then((response) => {
        setTargetPlaylistId(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToSpotifyPlaylist = () => {
    axios(addToPlaylistConfig)
      .then((response) => {
        setSuccessfulTransfer(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const exportPlaylistAsTxt = () => {
    let titles = [];
    playlistVideos.map((video) => {
      titles.push(video.title);
    });

    saveAs(
      new Blob([titles.join('\n')], {
        type: 'text/plain;charset=utf-8',
      }),
      `${playlistTitle}.txt`
    );
  };

  useEffect(() => {
    if (successfulTransfer) {
      setTimeout(() => {
        setSuccessfulTransfer(false);
        setIsTransferClicked(false);
      }, 4000);
    }
  }, [successfulTransfer]);

  useEffect(() => {
    addToPlaylistConfig && addToSpotifyPlaylist();
  }, [addToPlaylistConfig]);

  useEffect(() => {
    targetPlaylistId &&
      setAddToPlaylistConfig({
        method: 'post',
        url: `https://api.spotify.com/v1/playlists/${targetPlaylistId}/tracks?uris=${selectedSongs}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  }, [targetPlaylistId]);

  useEffect(() => {
    songTitle && getSpotifyData();
  }, [songTitle]);

  useEffect(() => {
    getPlaylistData();
  }, []);

  return (
    <>
      <div className='transfer-playlist'>
        {playlistTitle &&
        playlistDesc &&
        playlistVideos.length > 0 &&
        spotifySongs.length > 0 &&
        !isTransferClicked ? (
          <>
            <h1>Transfer Playlist</h1>
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
                  {spotifySongs.map((song) => (
                    <OneSongFromPl selectedAll={selectedAll} song={song} />
                  ))}
                </ul>
              </div>
            </div>
            <div className='btns'>
              <Link onClick={handleTransferBtn} className='link-btn'>
                <img src={TransferIcon} alt='' className='btn-icon' />
                <span className='btn-text'>Transfer</span>
              </Link>
              <Link onClick={exportPlaylistAsTxt} className='link-btn'>
                <img src={ExportIcon} alt='' className='btn-icon' />
                <span className='btn-text'>Export</span>
              </Link>
            </div>
          </>
        ) : isTransferClicked ? (
          <>
            {successfulTransfer ? (
              <>
                <img src={Checkmark} alt='' className='success-icon' />
                <h1 className='msg'>
                  <span>"{playlistTitle}"</span> successfully added to Spotify!
                </h1>
              </>
            ) : (
              <>
                <h1 className='msg'>
                  Do you want to convert the selected songs as
                  <span> "{playlistTitle}" </span>to Spotify?
                </h1>
                <div className='btns'>
                  <Link
                    onClick={
                      (() => setSelectedSongs(selectedSongs.join(', ')),
                      createSpotifyPlaylist)
                    }
                    className='link-btn'
                  >
                    <img src={Checkmark} alt='' className='btn-icon' />
                    <span className='btn-text'>Yes</span>
                  </Link>
                  <Link
                    onClick={() => setIsTransferClicked(false)}
                    className='link-btn'
                  >
                    <img src={Cross} alt='' className='btn-icon' />
                    <span className='btn-text'>No</span>
                  </Link>
                </div>
              </>
            )}
          </>
        ) : (
          <h1 className='loading'>Loading...</h1>
        )}
      </div>
    </>
  );
};

export default PlaylistInfo;
