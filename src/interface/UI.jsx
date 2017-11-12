
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Menu from './menu/Menu';
import TopBar from './topbar/TopBar';

function UI(props) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <TopBar />
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <div
          style={{
            flex: '1',
          }}
        >
          {props.children}
        </div>
        <Menu
          style={{
            flex: '1',
          }}
        />
      </div>
    </MuiThemeProvider>
  );
}

export default UI;
