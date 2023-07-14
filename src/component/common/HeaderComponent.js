import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import '../../css/Header.css';

const styles = theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'skyblue',
    padding: '10px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
  },
  banner: {
    fontSize: '24px',
    color: 'grey',
    fontWeight: 'bold',
  },
  menuBar: {
    display: 'flex',
    gap: '10px',
  },
  menuButton: {
    padding: '8px 12px',
    backgroundColor: 'green',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: 'blue',
    },
  },
});

class HeaderComponent extends Component {
    handleclick = (e) => {
        window.location.href = "/login";
    }
  render() {

    const { classes } = this.props;

    
    return (
       
      <Box className={classes.header}>
        <Box className={classes.banner}>배너</Box>
        <Box className={classes.menuBar}>
          <button className={classes.menuButton}>메뉴 1</button>
          <button className={classes.menuButton}>메뉴 2</button>
          <button className={classes.menuButton}type="submit" onSubmit={this.handleclick}>메뉴3</button>
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(HeaderComponent);
