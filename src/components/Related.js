import React, { useContext } from 'react';
import { SongContext } from '../utils/contexts';

const Related = ({ songs }) => {
  const { currentSong, setCurrentSong } = useContext(SongContext);

  const changeCurrentSong = (e) => {
    setCurrentSong(songs[e.target.dataset.songIndex]);
  };

  return (
    <div className='related-container'>
      <h2>Related</h2>
      <div className='related-albums'>
        {songs &&
          songs.map((song, i) => (
            <div className='one-album' key={i}>
              <img
                src={song.album.images[0].url}
                alt={song.name}
                title={song.name}
                onClick={changeCurrentSong}
                data-song-index={i}
                className={currentSong.id === song.id ? 'active' : ''}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Related;
