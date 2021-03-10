import React, { Suspense, useState, useMemo } from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import AddNewPlaylist from '../pages/AddNewPlaylist';
import AddToPlaylist from '../pages/AddToPlaylist';
import Home from '../pages/Home';
import TransferPlaylist from '../pages/TransferPlaylist';
import { SongContext, PlaylistSongsContext } from '../utils/contexts';

const App = () => {
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

  return (
    <Router>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <SongContext.Provider value={songValue}>
            <PlaylistSongsContext.Provider value={selectedSongsValue}>
              <Route exact path='/' component={Home} />
              <Route path='/add-to-playlist/' component={AddToPlaylist} />
              <Route path='/transfer-playlist/' component={TransferPlaylist} />
              <Route path='/add-new-playlist/' component={AddNewPlaylist} />
            </PlaylistSongsContext.Provider>
          </SongContext.Provider>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
