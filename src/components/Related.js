import React from 'react';
import Img1 from '../images/albumarts/1.jpg';
import Img2 from '../images/albumarts/2.jpg';
import Img3 from '../images/albumarts/3.jpg';
import Img4 from '../images/albumarts/4.jpg';
import Img5 from '../images/albumarts/5.jpg';
import Img6 from '../images/albumarts/6.jpg';
import Img7 from '../images/albumarts/7.jpg';
import Img8 from '../images/albumarts/8.jpg';

const Related = ({ songs }) => {
  let relatedAlbums = [];
  const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8];

  for (let index = 0; index < 8; index++) {
    relatedAlbums.push(
      <div className='one-album'>
        <img src={images[index]} alt='' />
      </div>
    );
  }

  return (
    <div className='related-container'>
      <h2>Related</h2>
      <div className='related-albums'>
        {songs &&
          songs.slice(1).map((song, i) => {
            if (i < 7) {
              return (
                <a
                  href={songs[0].external_urls.spotify}
                  target='_blank'
                  rel='noreferrer'
                  className='one-album'
                  key={i}
                >
                  <img
                    src={song.album.images[0].url}
                    alt={song.name}
                    title={song.name}
                  />
                </a>
              );
            } else return null;
          })}
      </div>
    </div>
  );
};

export default Related;
