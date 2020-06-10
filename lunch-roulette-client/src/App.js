import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import FrontPage from './components/FrontPage/FrontPage';
import './App.css';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Switch>
          <Route exact path="/" component={ FrontPage } />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
