import React, { Suspense } from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';

const App = () => {
  return (
    <Router>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
