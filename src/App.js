import logo from './logo.svg';
import './App.css';
import React, { PureComponent } from 'react';
import {ArticleListScene} from './scenes/'

import {  Route, Switch, withRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={'/articles'} component={ArticleListScene} />
      </Switch>
    </div>
  );
}

export default App;
