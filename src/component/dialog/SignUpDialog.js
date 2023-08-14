import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link } from '@mui/material';
import Button from '@mui/material/Button';
import React, { Component } from 'react';
import SignUpComponent from '../user/SignUpComponent';

class SignUpDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    // SignUpComponent의 ref를 저장할 변수 선언
    this.signUpComponentRef = React.createRef();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.signUpComponentRef.current.handleClose();
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;

    return (
      <>
        <Link id="SignUp" onClick={this.handleOpen}>
          회원가입
          <CheckIcon />
        </Link>
        <Dialog open={open} onClose={this.handleClose} PaperProps={{ sx: { width: 700 } }}>
          <DialogTitle bgcolor={'#4A55A2'} color={'white'} marginBottom={'15'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            회원가입
            <IconButton onClick={this.handleClose} color="inherit">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <SignUpComponent
              ref={this.signUpComponentRef} // ref 할당
              handleClose={this.handleClose}
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'flex-end' }}>
            {/* SignUpComponent의 handleSubmit 호출 */}
            <Button onClick={(e) => this.signUpComponentRef.current.handleSubmit(e)} color="primary">
              가입
            </Button>
            <Button onClick={this.handleClose} color="primary">닫기</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default SignUpDialog;