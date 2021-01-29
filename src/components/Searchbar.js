import React from 'react';

import SearchIcon from '../images/search-icon.svg';

const Searchbar = ({ placeholder }) => {
  return (
    <input
      type='text'
      className='searchbar'
      placeholder={placeholder}
      style={{
        background: `url(${SearchIcon}) no-repeat`,
      }}
    />
  );
};

export default Searchbar;
