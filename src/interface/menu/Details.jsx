
import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

function Details(props) {
  return (
    <div style={{ padding: 7 }}>
      <SelectField
        floatingLabelText="Center camera on:"
        value={props.data.centralBody}
        onChange={(e, i, value) => props.updateData(Object.assign({}, props.data, { centralBody: value }))}
        fullWidth
      >
        <MenuItem value={0} primaryText="Sun" />
        <MenuItem value={1} primaryText="Mercury" />
        <MenuItem value={2} primaryText="Venus" />
        <MenuItem value={3} primaryText="Earth" />
        <MenuItem value={4} primaryText="Mars" />
        <MenuItem value={5} primaryText="Jupiter" />
        <MenuItem value={6} primaryText="Saturn" />
        <MenuItem value={7} primaryText="Uranus" />
        <MenuItem value={8} primaryText="Neptune" />
      </SelectField>
    </div>
  );
}

export default Details;
