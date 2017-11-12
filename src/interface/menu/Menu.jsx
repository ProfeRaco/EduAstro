
import React from 'react';

import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';

import Details from './Details';
import News from './News';

function Menu(props) {
  return (
    <div
      style={Object.assign({
        padding: '70px 5px 5px 5px',
        display: 'block',
      }, props.style)}
    >
      <Paper
        style={{
          textAlign: 'center',
          display: 'block',
        }}
      >
        <Tabs>
          <Tab label="Details" >
            <Details {...props} />
          </Tab>
          <Tab label="News" >
            <News {...props} />
          </Tab>
        </Tabs>
      </Paper>
    </div>
  );
}

export default Menu;
