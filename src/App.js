import React from 'react';
import Nav from './components/Nav/Nav'
import routes from './routes'
import {withRouter} from 'react-router-dom'

import './reset.css'
import './App.css';

function App(props) {
  return (
    <div className="App">
    {props.location.pathname === '/' || props.location.pathname === '/register'
    ?<>
      {routes}
    </>
    :<>
      <Nav />
      {routes}
    </>}
    </div>
  );
}

export default withRouter(App);
