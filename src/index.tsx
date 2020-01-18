import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'styles/main.scss';

import { Home } from 'pages/Home/Home';
import { NotFound } from 'pages/NotFound/NotFound';
import { Manager } from 'pages/Game/Manager';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route exact path='/game'>
        <Manager />
      </Route>

      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
