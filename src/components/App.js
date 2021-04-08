import axios from 'axios';
import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import AddNewPlaylist from '../pages/AddNewPlaylist';
import AddToPlaylist from '../pages/AddToPlaylist';
import Home from '../pages/Home';
import TransferPlaylist from '../pages/TransferPlaylist';
import {
  AuthContext,
  UserContext,
  SongContext,
  PlaylistSongsContext,
} from '../utils/contexts';
import { SP_GET_AUTH, SP_CODE_KEY, setCookie, getCookie } from '../utils/gets';

const App = () => {
  const [token, setToken] = useState(null);
  const authValue = useMemo(() => ({ token, setToken }), [token, setToken]);

  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  const [currentSong, setCurrentSong] = useState(null);
  const songValue = useMemo(() => ({ currentSong, setCurrentSong }), [
    currentSong,
    setCurrentSong,
  ]);

  const [selectedSongs, setSelectedSongs] = useState([]);
  const selectedSongsValue = useMemo(
    () => ({ selectedSongs, setSelectedSongs }),
    [selectedSongs, setSelectedSongs]
  );

  const [btnLoading, setBtnLoading] = useState(false);

  const signIn = () => {
    setBtnLoading(true);
    /* eslint-disable */
    chrome.identity.launchWebAuthFlow(
      {
        url: SP_GET_AUTH,
        interactive: true,
      },
      (redirect_url) => {
        /* Extract token from redirect_url */
        if (redirect_url) {
          const redURL = new URLSearchParams(redirect_url);
          const authCode = redURL.get(SP_CODE_KEY);
          setToken(authCode);
        } else {
          setBtnLoading(false);
        }
      }
    );
  };

  const getUser = () => {
    const config = {
      method: 'get',
      url: 'https://api.spotify.com/v1/me',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        /* console.log(error); */
      });
  };

  useEffect(() => {
    if (token) {
      setCookie(token);
      getUser();
    } else {
      getCookie().then((res) => {
        if (res) {
          setToken(res.value);
        }
      });
    }
  }, [token]);

  return (
    <Router>
      {token && user ? (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <AuthContext.Provider value={authValue}>
              <UserContext.Provider value={userValue}>
                <SongContext.Provider value={songValue}>
                  <PlaylistSongsContext.Provider value={selectedSongsValue}>
                    <Route exact path='/' component={Home} />
                    <Route path='/add-to-playlist/' component={AddToPlaylist} />
                    <Route
                      path='/transfer-playlist/'
                      component={TransferPlaylist}
                    />
                    <Route
                      path='/add-new-playlist/'
                      component={AddNewPlaylist}
                    />
                  </PlaylistSongsContext.Provider>
                </SongContext.Provider>
              </UserContext.Provider>
            </AuthContext.Provider>
          </Switch>
        </Suspense>
      ) : (
        <div className='login-page'>
          <h1>Please sign in to transfer your favorite songs to Spotify</h1>
          {btnLoading ? (
            <button className='btn'>Loading...</button>
          ) : (
            <button onClick={signIn} className='btn'>
              Sign in to Spotify
            </button>
          )}
        </div>
      )}
    </Router>
  );
};

export default App;
