import React, { Suspense } from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import AddNewPlaylist from '../pages/AddNewPlaylist';
import AddToPlaylist from '../pages/AddToPlaylist';
import Home from '../pages/Home';
import TransferPlaylist from '../pages/TransferPlaylist';

const App = () => {
  return (
    <Router>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/add-to-playlist/' component={AddToPlaylist} />
          <Route path='/transfer-playlist/' component={TransferPlaylist} />
          <Route path='/add-new-playlist/' component={AddNewPlaylist} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
