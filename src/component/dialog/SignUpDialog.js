import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Link } from '@mui/material';
import Button from '@mui/material/Button';
import React, { Component } from 'react';
import SignUpComponent from '../user/SignUpComponent';
import { CustomButtonGridContainer, CustomCloseIcon, CustomConfirmButton, CustomDialogActions, CustomDialogTitle } from '../common/style/CommonDialogStyle';

class SignUpDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    // SignUpComponent의 ref를 저장할 변수 선언
    this.signUpComponentRef = React.createRef();
  }
  handleDialogClick = (e) => {
    // 이벤트 버블링을 막아 다이얼로그를 클릭해도 닫히지 않도록 함
    e.stopPropagation();
  };

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
        <Dialog
          open={open}
          onClose={this.handleClose}
          PaperProps={{ sx: { width: 700 } }}
          onClick={this.handleDialogClick}
        >
          <CustomDialogTitle>
            회원가입
            <IconButton size="small" onClick={this.handleClose}>
              <CustomCloseIcon />
            </IconButton>
          </CustomDialogTitle>
          <DialogContent>
            <SignUpComponent
              ref={this.signUpComponentRef} // ref 할당
              handleClose={this.handleClose}
            />
          </DialogContent>
          <CustomDialogActions>
            <Grid
              container
              justifyContent="center"
              sx={{mb: 2 }}
            >
              <CustomConfirmButton
                variant="outlined"
                onClick={(e) => this.signUpComponentRef.current.handleSubmit(e)}
              >
                가입
              </CustomConfirmButton>

              <Button variant="outlined" onClick={this.handleClose}>
                닫기
              </Button>
            </Grid>
          </CustomDialogActions>
        </Dialog>
      </>
    );
  }
}

export default SignUpDialog;