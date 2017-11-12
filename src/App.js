import React, { Component } from 'react';
import './App.css';

import Canvas from './visualisation/Canvas';
import UI from './interface/UI';

import { bodies } from './engine/initialize';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        centralBody: 0,
        selectedBody: 0,
        playing: false,
        speed: 500000,
        dialogOpened: false,
        dialogSelectedBody: 3,
        dialogA: 10000,
        dialogEC: 0.8,
        dialogIN: 10,
        dialogW: 5,
        dialogOM: 0,
        dialogTA: 0,
        epoch: new Date(),
        bodies,
      },
    };

    this.updateData = this.updateData.bind(this);
  }

  updateData(data) {
    this.setState(Object.assign(this.state.data, data));
  }

  render() {
    return (
      <div className="App">
        <UI data={this.state.data} updateData={this.updateData}>
          <Canvas data={this.state.data} updateData={this.updateData} />
        </UI>
      </div>
    );
  }
}

export default App;
