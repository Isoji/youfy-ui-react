import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

import PlaylistImg from '../images/playlist-d-img.svg';
import Checkmark from '../images/checkmark.svg';
import { AuthContext, UserContext } from '../utils/contexts';

const AddNewPlaylist = () => {
  const [plName, setPlName] = useState(null);
  const [plDesc, setPlDesc] = useState(null);
  const [playlistCreated, setPlaylistCreated] = useState(false);
  const { token } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  const history = useHistory();

  const handlePlName = (e) => {
    setPlName(e.target.value);
  };
  const handlePlDesc = (e) => {
    setPlDesc(e.target.value);
  };

  const data = JSON.stringify({
    name: plName,
    description: plDesc,
    public: false,
  });

  const config = {
    method: 'post',
    url: `https://api.spotify.com/v1/users/${user.id}/playlists`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const createPlaylist = () => {
    axios(config)
      .then((response) => {
        setPlaylistCreated(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (playlistCreated) {
      setTimeout(() => {
        setPlaylistCreated(false);
        history.push(`/add-to-playlist`);
      }, 4000);
    }
  }, [playlistCreated]);

  return (
    <>
      <Layout>
        <div className='add-new-playlist'>
          {playlistCreated ? (
            <>
              <img src={Checkmark} alt='' className='success-icon' />
              <h1 className='msg'>New playlist created successfully!</h1>
            </>
          ) : (
            <>
              <h1>New Playlist</h1>
              <div className='new-playlist-form'>
                <img src={PlaylistImg} alt='' />
                <div className='text'>
                  <input
                    type='text'
                    placeholder='My Awesome Playlist'
                    className='inputs title'
                    onChange={handlePlName}
                  />
                  <textarea
                    placeholder='Description goes here ...'
                    className='inputs desc'
                    onChange={handlePlDesc}
                  ></textarea>
                  <div className='btns'>
                    <button onClick={createPlaylist} className='btn'>
                      Create
                    </button>
                    <Link to='/add-to-playlist' className='btn'>
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default AddNewPlaylist;
