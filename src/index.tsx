import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';

import 'styles/main.scss';

import { Main } from 'routes/main';

const RouteContainer = posed.div({
  enter: {
    opacity: 1,
    transition: {
      default: { ease: 'linear', duration: 350 }
    }
  },
  exit: {
    opacity: 0,
    transition: {
      default: { ease: 'linear', duration: 350 }
    }
  }
});

class App extends React.Component {
  render() {
    return (
      // <Provider store={createStore(store)}>
        <BrowserRouter>
          <Route
            render={({ location }) => (
              <PoseGroup className='PoseGroup'>
                <RouteContainer key={location.pathname}>

                  <Main />

                </RouteContainer>
              </PoseGroup>
            )}
          />
        </BrowserRouter>
      // </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
