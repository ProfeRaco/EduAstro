import React, { Component } from 'react';
import './App.css';

import Canvas from './visualisation/Canvas';
import UI from './interface/UI';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        centralBody: 0,
      },
    };

    this.updateData = this.updateData.bind(this);
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
