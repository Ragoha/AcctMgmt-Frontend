import React, { Component } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SnackBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      saveSuccess: false, // 추가: 저장 성공 여부 상태 추가
      severity: "",
      message: "",
    };
  }

  handleUp = (severity, message) => {
    this.setState({ open: true, severity: severity, message: message });
  }

  handleSnackbarOpen = () => {
    this.setState({ open: true });
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  handleSave = () => {
    this.setState({ saveSuccess: true, open: true });
  };

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <div>
            <Alert
              onClose={this.handleSnackbarClose}
              severity={this.severity}
              sx={{ width: "100%" }}
            >
              {this.state.message}
            </Alert>
          </div>
        </Snackbar>
      </div>
    );
  }
}

export default SnackBarComponent;
