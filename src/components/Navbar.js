import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../utils/contexts';
import { SP_GET_AUTH, SP_CODE_KEY, setCookie, getCookie } from '../utils/gets';

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const signIn = () => {
    /* eslint-disable */
    chrome.identity.launchWebAuthFlow(
      {
        url: SP_GET_AUTH,
        interactive: true,
      },
      (redirect_url) => {
        /* Extract token from redirect_url */
        const redURL = new URLSearchParams(redirect_url);
        const authCode = redURL.get(SP_CODE_KEY);
        setToken(authCode);
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
        console.log(error);
      });
  };

  useEffect(() => {
    getCookie().then((res) => {
      if (res) {
        setToken(res.value);
      }
    });
    if (token) {
      setCookie(token);
      getUser();
    }
  }, [token]);

  return (
    <nav className='navbar'>
      <h1 className='logo-text'>Youfy</h1>
      {user ? <h2>{user.display_name}</h2> : <h2 onClick={signIn}>Sign In</h2>}
    </nav>
  );
};

export default Navbar;
