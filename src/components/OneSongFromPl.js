import React, { useEffect, useState, useContext } from 'react';
import { toMinutes } from '../utils/formats';
import { PlaylistSongsContext } from '../utils/contexts';

const OneSongFromPl = ({ selectedAll, song }) => {
  const [checked, setChecked] = useState(false);
  const { selectedSongs, setSelectedSongs } = useContext(PlaylistSongsContext);

  const handleChecked = () => {
    if (checked) {
      setChecked(false);
      setSelectedSongs(selectedSongs.filter((item) => item !== song.uri)); // Removes the clicked song from selectedSongs array context
    } else if (!checked) {
      setChecked(true);
      setSelectedSongs((selectedSongs) => [...selectedSongs, song.uri]); // Adds the clicked song into selectedSongs array context
    }
  };

  useEffect(() => {
    if (selectedAll && !checked) {
      setChecked(true);
      setSelectedSongs((selectedSongs) => [...selectedSongs, song.uri]);
    } else if (!selectedAll) {
      setChecked(false);
      setSelectedSongs([]); // Sets selectedSongs to empty array context
    }
  }, [selectedAll]);

  return (
    <>
      <li
        className={checked ? 'one-song checked' : 'one-song'}
        onClick={handleChecked}
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
