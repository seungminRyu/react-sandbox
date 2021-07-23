import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/about">어바웃</Link>
          </li>
        </ul>
      </nav>
      <Route path="/" exact={true} component={Home}/>
      <Route path="/about" component={About}/>
    </div>
  );
}

export default App;
