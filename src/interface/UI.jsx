
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Menu from './menu/Menu';
import TopBar from './topbar/TopBar';
import AddSpacecraftDialog from './dialog/AddSpacecraftDialog'

const theme = {
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
};

function UI(props) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <div>
        <TopBar
          data={props.data}
          updateData={props.updateData}
        />
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
          <div
            style={{
              flex: '1',
              overflow: 'hidden',
            }}
          >
            {props.children}
          </div>
          <Menu
            style={{
              flex: '0 0 400px',
            }}
            data={props.data}
            updateData={props.updateData}
          />
        </div>
        <div
          style={{ position: 'fixed', zIndex: 10, left: 10, bottom: 10 }}
        >
          <FloatingActionButton onClick={() => { props.updateData({ dialogOpened: true }) }}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <AddSpacecraftDialog {...props} />
      </div>
    </MuiThemeProvider>
  );
}

export default UI;
