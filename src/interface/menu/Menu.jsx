
import React from 'react';

import Paper from 'material-ui/Paper';

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
        {'asdf'}
      </Paper>
    </div>
  );
}

export default Menu;
