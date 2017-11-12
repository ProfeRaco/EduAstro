
import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

function Details(props) {
  console.log('props', props, props.data.bodies)
  return (
    <div style={{ padding: 7 }}>
      <SelectField
        floatingLabelText="Center camera on:"
        value={props.data.centralBody}
        onChange={(e, i, value) => props.updateData({ centralBody: value })}
        fullWidth
      >
        {props.data.bodies.map((item, i) => (
          <MenuItem value={i} primaryText={item.name} />
        ))}
      </SelectField>
      <SelectField
        floatingLabelText="Selected element:"
        value={props.data.selectedBody}
        onChange={(e, i, value) => props.updateData({ selectedBody: value })}
        fullWidth
      >
        {props.data.bodies.map((item, i) => (
          <MenuItem value={i} primaryText={item.name} />
        ))}
      </SelectField>
      {(() => {
        const selectedBody = props.data.bodies[props.data.selectedBody];
        if (selectedBody.isBody) {
          return (
            <div>
              {selectedBody.description}
            </div>
          );
        }
        return (
          <div>
            You selected a spacecraft
          </div>
        );
      })()}
    </div>
  );
}

export default Details;
