import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SongContext } from '../utils/contexts';
import { formatTitle, toMinutes } from '../utils/formats';
import { token } from '../utils/gets';
import Layout from './Layout';

//images
import AlbumArt from '../images/song-album.jpg';
import PlayIcon from '../images/play.svg';
import PlusIcon from '../images/plus.svg';
import MoreIcon from '../images/more.svg';
import Related from './Related';

const SongInfo = () => {
  const [songName, setSongName] = useState(null);
  const [songs, setSongs] = useState([]);
  const [url, setUrl] = useState(null);
  const { currentSong, setCurrentSong } = useContext(SongContext);

  const songQueryConfig = {
    method: 'get',
    url: `https://api.spotify.com/v1/search?q=${songName}&type=track&limit=10`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const getTitle = () => {
    url &&
      fetch(url)
        .then((response) => response.text())
        .then((html) => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const title = doc.querySelectorAll('title')[0];
          setSongName(formatTitle(title.innerText));
        });
  };

  const getSong = async () => {
    songName &&
      axios(songQueryConfig)
        .then((response) => {
          console.log(response.data.tracks.items[0]);
          setSongs(response.data.tracks.items);
          setCurrentSong(response.data.tracks.items[0]);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  useEffect(() => {
    getTitle();
    getSong();
    console.log(songName);
    /* eslint-disable */
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      setUrl(tabs[0].url);
    });
  }, [url, songName]);

  return (
    <Layout>
      <div className='song-info'>
        {songs.length > 0 ? (
          <>
            <div className='song-container'>
              <img
                src={songs[0].album.images[0].url}
                alt=''
                className='song-img'
              />
              <div className='song-details'>
                {/* <span className='song-type'>{songs[0].type}</span> */}
                <h1 className='song-title'>{songs[0].name}</h1>
                <p className='song-artist'>{songs[0].artists[0].name}</p>
                <p className='song-duration'>
                  {toMinutes(songs[0].duration_ms)}
                </p>
                <div className='btns'>
                  <a
                    className='link-btn'
                    target='_blank'
                    rel='noreferrer'
                    href={songs[0].external_urls.spotify}
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
            {songs.length >= 2 ? (
              <>
                <div className='line'></div>
                <Related songs={songs} />
              </>
            ) : null}
          </>
        ) : (
          <h1 className='loading'>Loading...</h1>
        )}
      </div>
    </Layout>
  );
};

export default SongInfo;
