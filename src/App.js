import React, { Component } from 'react';
import './App.css';

import Canvas from './visualisation/Canvas.jsx';
import UI from './interface/UI'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        centralBody: 0,
        playing: false,
        speed: 500000,
        epoch: new Date(),
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
