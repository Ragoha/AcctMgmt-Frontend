import CheckIcon from '@mui/icons-material/Check';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import React, { Component } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material';


class SignUpDialog extends Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
      };
    }
  
    handleOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };
  
    render() {
      const { open } = this.state;
  
      return (
        <>
          <Link id="SignUp" onClick={this.handleOpen}>
            Sign Up
            <CheckIcon />
          </Link>
          <Dialog open={open} onClose={this.handleOpen} 
          PaperProps={{sx:{width : 700}}}>
            <DialogTitle bgcolor={'#4A55A2'} color={'white'}
            marginBottom={'15'}>Sign Up</DialogTitle>
            <DialogContent >
              {/* 다이얼로그 내용 */}
              <iframe src="/sign" frameBorder="0" width="100%" height="600px" />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">Close</Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
  }

  export default SignUpDialog;