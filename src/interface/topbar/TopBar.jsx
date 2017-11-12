
import React from 'react';

import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

import Play from 'material-ui/svg-icons/av/play-arrow';
import Stop from 'material-ui/svg-icons/av/stop';
import FastForward from 'material-ui/svg-icons/av/fast-forward';
import FastRewind from 'material-ui/svg-icons/av/fast-rewind';

function TopBar(props) {
  return (
    <div style={{ position: 'absolute', width: '100%' }}>
      <Toolbar style={{height: 45}}>
        <ToolbarGroup>
          <IconButton touch onClick={() => (props.updateData({ speed: (props.data.speed - 5000) <= 0 ? 1 : (props.data.speed - 5000) }))}>
            <FastRewind />
          </IconButton>
          {(() => {
            if (!props.data.playing) {
              return (
                <IconButton touch onClick={() => (props.updateData({ playing: true }))}>
                  <Play />
                </IconButton>
              );
            }

            return (
              <IconButton touch onClick={() => (props.updateData({ playing: false }))}>
                <Stop />
              </IconButton>
            );
          })()}
          <IconButton touch onClick={() => (props.updateData({ speed: props.data.speed === 1 ? 5000 : props.data.speed + 5000 }))}>
            <FastForward />
          </IconButton>
          <ToolbarTitle style={{fontSize: 15}} text={'x' + props.data.speed} />
          <DatePicker
            hintText="Current date"
            mode="landscape"
            openToYearSelection
            value={props.data.epoch}
            style={{ width: 90 }}
            dialogContainerStyle={{ width: 90 }}
            onChange={(e, date) => (props.updateData({ epoch: date }))}
          />
          <TimePicker
            hintText="Current time"
            autoOk
            value={props.data.epoch}
            style={{ width: 90 }}
            onChange={(e, date) => (props.updateData({ epoch: date }))}
          />
        </ToolbarGroup>
      </Toolbar>

    </div>
  );
}

export default TopBar;
