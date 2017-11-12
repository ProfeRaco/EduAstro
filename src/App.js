import React, { Component } from 'react';
import './App.css';

import Canvas from './visualisation/Canvas.jsx';
import UI from './interface/UI'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { data: {} };
  }

  updateData(data) {
    this.setState({ data });
  }

  render() {
    return (
      <div className="App">
        <UI data={this.state.data} updateData={this.updateData}>
          <Canvas data={this.state.data} />
        </UI>
      </div>
    );
  }
}

export default App;
