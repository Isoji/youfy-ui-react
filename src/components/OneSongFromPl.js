import React, { useEffect, useState } from 'react';
import { toMinutes } from '../utils/formats';

const OneSongFromPl = ({ selectedAll, checkSelected, song }) => {
  const [checked, setChecked] = useState(false);

  const handleChecked = () => {
    checked ? setChecked(false) : setChecked(true);
  };

  useEffect(() => {
    selectedAll ? setChecked(true) : setChecked(false);
  }, [selectedAll]);

  return (
    <>
      <li
        className={checked ? 'one-song checked' : 'one-song'}
        onClick={handleChecked}
        onChange={checkSelected}
        data-checked={checked}
      >
        <div className='left'>
          <img src={song.album.images[0].url} alt='' className='song-img' />
          <div className='song-text'>
            <span className='song-name'>{song.name}</span>
            <span className='song-artist'>{song.artists[0].name}</span>
          </div>
        </div>
        <div className='right'>
          <span className='song-duration'>{toMinutes(song.duration_ms)}</span>
        </div>
      </li>
    </>
  );
};

export default OneSongFromPl;
