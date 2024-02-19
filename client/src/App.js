import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/HomePage';
import PlayerPage from './components/PlayerPage';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact Component={HomePage} />
        <Route path='/player/:id' Component={PlayerPage} />
      </Switch>
    </Router>
  );
}

export default App;
