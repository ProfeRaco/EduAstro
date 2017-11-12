
import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

import Spacecraft from '../../engine/classes/Spacecraft'
import Coordinates from '../../engine/classes/Coordinates'

function AddSpacecraftDialog(props) {
  const handleClose = () => (props.updateData({ dialogOpened: false }));
  const handleAddSpacecraft = () => {
    const newSpacecraft = new Spacecraft(
      `Spacecraft ${props.data.bodies.length + 1}`,
      props.data.epoch,
      new Coordinates(
        'keplerian',
        props.data.bodies[props.data.dialogSelectedBody],
        props.data.dialogA,
        props.data.dialogEC,
        props.data.dialogIN,
        props.data.dialogOM,
        props.data.dialogW,
        props.data.dialogTA,
      )
    );

    props.updateData({ bodies: [...props.data.bodies, newSpacecraft] })
  };

  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onClick={handleClose}
    />,
    <FlatButton
      label="Submit"
      primary
      keyboardFocused
      onClick={handleAddSpacecraft}
    />,
  ];

  return (
    <div>
      <Dialog
        title="Add spacecraft"
        actions={actions}
        modal={false}
        open={props.data.dialogOpened}
        onRequestClose={handleClose}
        autoScrollBodyContent
      >
        <table>
          <tbody>
            <tr>
              <td>Epoch</td>
              <td>Orbit arround</td>
            </tr>
            <tr>
              <td>Now</td>
              <td>
                <SelectField
                  value={props.data.dialogSelectedBody}
                  onChange={(e, i, value) => props.updateData({ dialogSelectedBody: value })}
                  id="add_s_center"
                  fullWidth
                >
                  {props.data.bodies
                    .filter(item => item.isBody)
                    .map((item, i) => (
                      <MenuItem key={item.name} value={i} primaryText={item.name} />
                    ))
                  }
                </SelectField>
              </td>
            </tr>
            <tr>
              <td>Semi-major axis</td>
              <td>Eccentricity</td>
            </tr>
            <tr>
              <td><TextField onChange={(e, val) => { props.updateData({ dialogA: val }); }} value={props.data.dialogA} id="add_s_A" />Km</td>
              <td><TextField onChange={(e, val) => { props.updateData({ dialogEC: val }); }} value={props.data.dialogEC} id="add_s_EC" /></td>
            </tr>
            <tr>
              <td>Inclination</td>
              <td>Perifocus argument</td>
            </tr>
            <tr>
              <td><TextField onChange={(e, val) => { props.updateData({ dialogIN: val }); }} value={props.data.dialogIN} id="add_s_IN" />º</td>
              <td><TextField onChange={(e, val) => { props.updateData({ dialogW: val }); }} value={props.data.dialogW} id="add_s_W" />º</td>
            </tr>
            <tr>
              <td>Longitude of the right ascention node</td>
              <td>True anomaly</td>
            </tr>
            <tr>
              <td><TextField onChange={(e, val) => { props.updateData({ dialogOM: val }); }} value={props.data.dialogOM} id="add_s_OM" />º</td>
              <td><TextField onChange={(e, val) => { props.updateData({ dialogTA: val }); }} value={props.data.dialogTA} id="add_s_TA" />º</td>
            </tr>
          </tbody>
        </table>
      </Dialog>
    </div>
  );
}

export default AddSpacecraftDialog;
