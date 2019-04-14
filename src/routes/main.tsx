import * as React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

import { Home } from 'routes/home';
import { Preview } from 'routes/preview';
import { NotFound } from 'routes/not-found';
import { Game } from 'routes/game';

export class Main extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* <Header /> */}

        <div className='ContentGrid'>
          <main className='ContentGrid-Content'>
            <Switch>
              <Route exact={true} path='/' component={Home} />
              <Route exact={true} path='/game' component={Game} />

              {/* @TODO Only show in development */}
              <Route exact={true} path='/preview' component={Preview} />

              <Route component={NotFound} />
            </Switch>
          </main>
        </div>

        {/* <Footer /> */}
      </React.Fragment>
    );
  }
}
