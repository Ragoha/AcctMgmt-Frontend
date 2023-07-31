import Grid from '@mui/material/Grid';
import React, { Component } from 'react';
import HeaderComponent from '../common/HeaderComponent';
import Main from '../common/Main';

class MainComponent extends Component {
  render() {

    return (
      <Grid container >
        <Grid item>
            <Main />
        </Grid>
        <Grid item >
            <HeaderComponent />
        </Grid>
      </Grid>
    );
  }
}

export default MainComponent;
