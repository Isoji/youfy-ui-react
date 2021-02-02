import React from 'react';

//images
import AlbumArt from '../images/song-album.jpg';
import PlayIcon from '../images/play.svg';
import PlusIcon from '../images/plus.svg';
import MoreIcon from '../images/more.svg';
import Related from './Related';
import { Link } from 'react-router-dom';

const SongInfo = () => {
  return (
    <div className='song-info'>
      <div className='song-container'>
        <img src={AlbumArt} alt='' className='song-img' />
        <div className='song-details'>
          <span className='song-type'>SINGLE</span>
          <h1 className='song-title'>Don't Let Me Down</h1>
          <p className='song-artist'>By The Chainsmokers - 2016</p>
          <p className='song-duration'>3 min 28 sec</p>
          <div className='btns'>
            <a className='link-btn' href='/#'>
              <img src={PlayIcon} alt='' className='btn-icon' />
              <span className='btn-text'>Play</span>
            </a>
            <Link to='/add-to-playlist' className='link-btn'>
              <img src={PlusIcon} alt='' className='btn-icon' />
              <span className='btn-text'>Add to Playlist</span>
            </Link>
            <a className='link-btn' href='/#'>
              <img src={MoreIcon} alt='' className='btn-icon' />
              <span className='btn-text'>More</span>
            </a>
          </div>
        </div>
      </div>
      <div className='line'></div>
      <Related />
    </div>
  );
};

export default SongInfo;
