
import React from 'react';

import AppBar from 'material-ui/AppBar';

function TopBar() {
  return (
    <div style={{ position: 'absolute', width: '100%' }}>
      <AppBar
        title="Title"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    </div>
  );
}

export default TopBar;
