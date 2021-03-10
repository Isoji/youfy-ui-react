import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { token } from '../utils/gets';
import Layout from '../components/Layout';

import PlaylistImg from '../images/playlist-d-img.svg';
import Checkmark from '../images/checkmark.svg';
import Cross from '../images/cross.svg';

const AddNewPlaylist = () => {
  const userId = 'yilxfvdt11z0c1myy94cyz6n6';
  const [plName, setPlName] = useState(null);
  const [plDesc, setPlDesc] = useState(null);
  const [playlistCreated, setPlaylistCreated] = useState(false);
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
    url: `https://api.spotify.com/v1/users/${userId}/playlists`,
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
                    <Link onClick={createPlaylist} className='link-btn'>
                      <img src={Checkmark} alt='' className='btn-icon' />
                      <span className='btn-text'>Create</span>
                    </Link>
                    <Link to='/add-to-playlist' className='link-btn'>
                      <img src={Cross} alt='' className='btn-icon' />
                      <span className='btn-text'>Cancel</span>
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
