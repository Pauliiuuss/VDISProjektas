import React, { Component } from 'react';
import NavBar from './NavBar';

export default class ParentPanel extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <h1> SpecialistPanel</h1>
      </div>
    );
  }
}
