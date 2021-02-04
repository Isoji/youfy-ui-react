import React, { useState } from 'react';
import Layout from '../components/Layout';

import TransferPlaylist from './TransferPlaylist';
import SongInfo from '../components/SongInfo';

const Home = () => {
  const [url, setUrl] = useState(null);
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    setUrl(tabs[0].url);
  });

  return (
    <>
      {url ? (
        url.includes('https://www.youtube.com/playlist') ? (
          <TransferPlaylist />
        ) : url.includes('https://www.youtube.com/watch') ? (
          <Layout>
            <SongInfo />
          </Layout>
        ) : (
          <div
            style={{
              width: '576px',
              height: '320px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <h2 style={{ maxWidth: '80%' }}>
              ⚠️ No YouTube song or playlist found! <br /> Youfy extension only
              works when you have a song or playlist open on{' '}
              <a
                href='http://youtube.com/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Youtube.com
              </a>
            </h2>
          </div>
        )
      ) : (
        <h1>Loading..</h1>
      )}
    </>
  );
};

export default Home;
