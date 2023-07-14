import React, { Component } from 'react';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import HeaderComponent from '../common/HeaderComponent';
import Main from '../common/Main';

class MainComponent extends Component {
  render() {
///    const { classes } = this.props;

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
