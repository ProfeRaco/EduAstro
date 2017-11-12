import React from 'react';

import TextField from 'material-ui/TextField';

function Spacecraft(props) {
  return (
    <div style={{ padding: 7 }}>
      {/* <TextField
        floatingLabelText="Initial Attracting Body"
        value={props.data.spacecraft.initialBody}
        onChange={(e, value) => props.updateData({ spacecraft: { initialBody: value } })}
        fullWidth
      /> */}
      <TextField/>
    </div>
  );
}

export default Spacecraft;
