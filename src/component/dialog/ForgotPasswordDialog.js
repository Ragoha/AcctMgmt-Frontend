import SearchIcon from '@mui/icons-material/Search';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Link } from '@mui/material';
import React, { Component } from 'react';

class ForgotPasswordDialog extends Component {
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
        <Link id="forgot" onClick={this.handleOpen}>
          Forgot Password
          <SearchIcon />
        </Link>
        <Dialog open={open} onClose={this.handleOpen}>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogContent>
            {/* 다이얼로그 내용 */}
            <iframe src="/time" frameBorder="0" width="100%" height="400px" />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
export default ForgotPasswordDialog;