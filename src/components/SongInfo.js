import React, { useState, useEffect } from 'react';

//images
import AlbumArt from '../images/song-album.jpg';
import PlayIcon from '../images/play.svg';
import PlusIcon from '../images/plus.svg';
import MoreIcon from '../images/more.svg';
import Related from './Related';
import { Link } from 'react-router-dom';

import { formatTitle } from '../utils/formats';
import Layout from './Layout';

const SongInfo = () => {
  const [songName, setSongName] = useState(null);
  const [url, setUrl] = useState(null);

  const getTitle = () => {
    url &&
      fetch(url)
        .then((response) => response.text())
        .then((html) => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const title = doc.querySelectorAll('title')[0];
          setSongName(formatTitle(title.innerText));
          return title.innerText;
        });
  };

  useEffect(() => {
    getTitle();
    /* eslint-disable */
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      setUrl(tabs[0].url);
    });
  }, [url]);

  return (
    <div className='song-info'>
      {songName ? (
        <>
          <Layout>
            <div className='song-container'>
              <img src={AlbumArt} alt='' className='song-img' />
              <div className='song-details'>
                <span className='song-type'>SINGLE</span>
                <h1 className='song-title'>{songName}</h1>
                <p className='song-artist'>By The Chainsmokers - 2016</p>
                <p className='song-duration'>3 min 28 sec</p>
                <div className='btns'>
                  <a
                    className='link-btn'
                    target='_blank'
                    href={`https://open.spotify.com/search/${encodeURI(
                      songName
                    )}`}
                  >
                    <img src={PlayIcon} alt='' className='btn-icon' />
                    <span className='btn-text'>Play</span>
                  </a>
                  <Link to='/add-to-playlist' className='link-btn'>
                    <img src={PlusIcon} alt='' className='btn-icon' />
                    <span className='btn-text'>Add to Playlist</span>
                  </Link>
                  <a className='link-btn' href='https://youfyapp.com'>
                    <img src={MoreIcon} alt='' className='btn-icon' />
                    <span className='btn-text'>More</span>
                  </a>
                </div>
              </div>
            </div>
            <div className='line'></div>
            <Related />
          </Layout>
        </>
      ) : (
        <h1 className='loading'>Loading...</h1>
      )}
    </div>
  );
};

export default SongInfo;
