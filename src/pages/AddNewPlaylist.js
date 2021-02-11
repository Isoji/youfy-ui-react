import React from 'react';
import Layout from '../components/Layout';

import PlaylistImg from '../images/playlist-d-img.svg';
import Checkmark from '../images/checkmark.svg';
import Cross from '../images/cross.svg';
import { Link } from 'react-router-dom';

const AddNewPlaylist = () => {
  return (
    <>
      <Layout>
        <div className='add-new-playlist'>
          <h1>New Playlist</h1>
          <div className='new-playlist-form'>
            <img src={PlaylistImg} alt='' />
            <div className='text'>
              <input
                type='text'
                placeholder='My Awesome Playlist'
                className='inputs title'
              />
              <textarea
                placeholder='Description goes here ...'
                className='inputs desc'
              ></textarea>
              <div className='btns'>
                <Link to='/add-to-playlist' className='link-btn'>
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
        </div>
      </Layout>
    </>
  );
};

export default AddNewPlaylist;
