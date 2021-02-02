import React, { useEffect, useState } from 'react';
import Img1 from '../images/albumarts/5.jpg';

const OneSongFromPl = ({ selectedAll, checkSelected }) => {
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
          <img src={Img1} alt='' className='song-img' />
          <div className='song-text'>
            <span className='song-name'>Evermore</span>
            <span className='song-artist'>Taylor Swift</span>
          </div>
        </div>
        <div className='right'>
          <span className='song-duration'>4:56</span>
        </div>
      </li>
    </>
  );
};

export default OneSongFromPl;
