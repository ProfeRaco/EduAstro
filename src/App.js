import React, { Component } from 'react';
import './App.css';

import Canvas from './visualisation/canvas';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Canvas />
      </div>
    );
  }
}

export default App;
