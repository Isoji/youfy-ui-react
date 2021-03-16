import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, SongContext } from '../utils/contexts';
import { formatTitle, toMinutes } from '../utils/formats';
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
  const [more, setMore] = useState(false);
  const [songFound, setSongFound] = useState(true);
  const { currentSong, setCurrentSong } = useContext(SongContext);
  const { token } = useContext(AuthContext);

  const songQueryConfig = {
    method: 'get',
    url: `https://api.spotify.com/v1/search?q=${songName}&type=track&limit=7`,
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

  const getSong = () => {
    songName &&
      axios(songQueryConfig)
        .then((response) => {
          if (response.data.tracks.items[0]) {
            setSongs(response.data.tracks.items);
            setCurrentSong(response.data.tracks.items[0]);
          } else {
            setSongFound(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const handleMoreBtn = () => {
    more ? setMore(false) : setMore(true);
  };

  useEffect(() => {
    getTitle();
    getSong();
    /* eslint-disable */
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      setUrl(tabs[0].url);
    });
  }, [url, songName]);

  return (
    <Layout>
      <div className='song-info'>
        {songs.length > 0 && currentSong ? (
          <>
            <div className='song-container'>
              <img
                src={currentSong.album.images[0].url}
                alt=''
                className='song-img'
              />
              <div className='song-details'>
                <h1 className='song-title'>{currentSong.name}</h1>
                <p className='song-artist'>{currentSong.artists[0].name}</p>
                <p className='song-duration'>
                  {toMinutes(currentSong.duration_ms)}
                </p>
                <div className='btns'>
                  <div className='row'>
                    <a
                      className='link-btn'
                      target='_blank'
                      rel='noreferrer'
                      href={currentSong.external_urls.spotify}
                    >
                      <img src={PlayIcon} alt='' className='btn-icon' />
                      <span className='btn-text'>Play</span>
                    </a>
                    <Link to='/add-to-playlist' className='link-btn'>
                      <img src={PlusIcon} alt='' className='btn-icon' />
                      <span className='btn-text'>Add to Playlist</span>
                    </Link>
                    <a
                      className='link-btn'
                      href='https://youfyapp.com'
                      onClick={handleMoreBtn}
                    >
                      <img src={MoreIcon} alt='' className='btn-icon' />
                      <span className='btn-text'>{more ? 'Less' : 'More'}</span>
                    </a>
                  </div>
                  {more ? (
                    <>
                      <div className='row'>
                        <a
                          className='link-btn'
                          target='_blank'
                          href={encodeURI(
                            `https://music.apple.com/search?term=${currentSong.name}`
                          )}
                        >
                          <img src={PlayIcon} alt='' className='btn-icon' />
                          <span className='btn-text'>Apple Music</span>
                        </a>
                        <a
                          className='link-btn'
                          target='_blank'
                          href={encodeURI(
                            `https://music.amazon.com/search/${currentSong.name}`
                          )}
                        >
                          <img src={PlayIcon} alt='' className='btn-icon' />
                          <span className='btn-text'>Amazon Music</span>
                        </a>
                      </div>
                    </>
                  ) : null}
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
          <h1 className='loading'>
            {songFound ? 'Loading...' : "Sorry, we can't detect the song."}
          </h1>
        )}
      </div>
    </Layout>
  );
};

export default SongInfo;
