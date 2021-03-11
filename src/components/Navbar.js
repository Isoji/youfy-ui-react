import React, { useContext } from 'react';
import { AuthContext } from '../utils/contexts';
import { SP_GET_AUTH, SP_CODE_KEY } from '../utils/gets';

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);

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
  return (
    <nav className='navbar'>
      <h1 className='logo-text'>Youfy</h1>
      <h2 onClick={signIn}>Sign In</h2>
    </nav>
  );
};

export default Navbar;
