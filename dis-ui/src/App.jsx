import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import UnderConstruction from './components/UnderConstruction';

export default class App extends Component {
  render() {
    document.title = 'dis-ui';
    return (
      <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <UnderConstruction />
        </BrowserRouter>
      </div>
    );
  }
}
