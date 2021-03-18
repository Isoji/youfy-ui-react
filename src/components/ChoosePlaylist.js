import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import PlImg1 from '../images/song-album.jpg';
import PlusBig from '../images/plus-big.svg';
import { useHistory } from 'react-router';
import { AuthContext, SongContext } from '../utils/contexts';
import { Link } from 'react-router-dom';

import Checkmark from '../images/checkmark.svg';
import Cross from '../images/cross.svg';

const ChoosePlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPl, setSelectedPl] = useState(null);
  const [songAdded, setSongAdded] = useState(false);
  const [noPlaylists, setNoPlaylists] = useState(false);
  const { currentSong } = useContext(SongContext);
  const { token } = useContext(AuthContext);

  const history = useHistory();

  const goToNP = () => {
    history.push(`/add-new-playlist`);
  };

  const goBack = () => {
    setSelectedPl(null);
    history.push(`/add-to-playlist`);
  };

  const userPlaylistsConfig = {
    method: 'get',
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const addPlConfig = {
    method: 'post',
    url: `https://api.spotify.com/v1/playlists/${
      selectedPl && selectedPl.playlistId
    }/tracks?uris=${currentSong.uri}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const getPlaylists = () => {
    axios(userPlaylistsConfig)
      .then((response) => {
        setPlaylists(response.data.items);
        if (response.data.items) {
          if (response.data.items.length === 0) {
            setNoPlaylists(true);
          }
        }
      })
      .catch((error) => {
        /* console.log(error); */
      });
  };

  const getPlaylistId = (e) => {
    if (e.target.dataset.playlistId) {
      setSelectedPl(e.target.dataset);
    } else {
      setSelectedPl(e.target.parentElement.dataset);
    }
  };

  const addToPlaylist = () => {
    axios(addPlConfig)
      .then((response) => {
        setSongAdded(true);
      })
      .catch((error) => {
        /* console.log(error); */
      });
  };

  useEffect(() => {
    getPlaylists();
    if (songAdded) {
      setTimeout(() => {
        setSongAdded(false);
        setSelectedPl(null);
        history.push(`/add-to-playlist`);
      }, 4000);
    }
  }, [songAdded]);

  return (
    <>
      <div className='choose-playlist'>
        {selectedPl ? (
          <div className='confirmation'>
            {songAdded ? (
              <>
                <img src={Checkmark} alt='' className='success-icon' />
                <h1 className='msg'>
                  <span> {currentSong.name}</span> added to
                  <span> {selectedPl.playlistName}</span> successfully!
                </h1>
              </>
            ) : (
              <>
                <h1 className='msg'>
                  Do you want to add
                  <span> {currentSong.name}</span> to
                  <span> {selectedPl.playlistName}</span>?
                </h1>
                <div className='btns'>
                  <Link onClick={addToPlaylist} className='btn'>
                    Yes
                  </Link>
                  <Link onClick={goBack} className='btn'>
                    No
                  </Link>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <h1>Choose a Playlist</h1>
            {noPlaylists ? (
              <p>
                You don't have any playlists in your Spotify library, Please
                create a new playlist.
              </p>
            ) : null}
            <div className='playlists'>
              <div className='one-playlist first' onClick={goToNP}>
                <img src={PlusBig} alt='' className='playlist-img' />
                <div className='playlist-text'>
                  <h4 className='big-text'>Create New Playlist</h4>
                </div>
              </div>

              {playlists &&
                playlists.map((playlist, i) => (
                  <div
                    className='one-playlist'
                    onClick={getPlaylistId}
                    data-playlist-id={playlist.id}
                    data-playlist-name={playlist.name}
                    key={i}
                  >
                    <img
                      src={playlist.images[0] ? playlist.images[0].url : PlImg1}
                      alt={playlist.name}
                      title={playlist.name}
                      className='playlist-img'
                    />
                    <div
                      className='playlist-text'
                      data-playlist-id={playlist.id}
                      data-playlist-name={playlist.name}
                    >
                      <h4 className='playlist-name'>{playlist.name}</h4>
                      <span className='playlist-owner'>
                        By {playlist.owner.display_name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChoosePlaylist;
