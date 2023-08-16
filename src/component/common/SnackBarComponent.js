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
      openSnackbar: false,
      saveSuccess: false, // 추가: 저장 성공 여부 상태 추가
      severity: "success",
    };
  }

  handleSnackbarOpen = () => {
    this.setState({ openSnackbar: true });
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openSnackbar: false });
  };

  handleSave = () => {
    // 여기에서 데이터베이스에 저장을 시도하고, 성공 여부에 따라 상태 업데이트
    // 예시: 데이터베이스 저장 로직을 호출하고, 저장이 성공하면 saveSuccess를 true로 업데이트

    // 저장이 성공하면 스낵바를 열어줌
    this.setState({ saveSuccess: true, openSnackbar: true });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleSave}>Save to Database</Button>
        <Snackbar
          open={this.state.openSnackbar}
          autoHideDuration={1000}
          onClose={this.handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <div>
            <Alert
              onClose={this.handleSnackbarClose}
              severity={this.severity}
              sx={{ width: "100%" }}
            >
              This is a success message!
            </Alert>
          </div>
        </Snackbar>
      </div>
    );
  }
}

export default SnackBarComponent;
