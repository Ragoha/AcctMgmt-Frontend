import { TextField } from "@mui/material";
import React, { Component } from "react";


class AsideComponent extends Component {
  render() {
    return (
      <>
        사이드입니다.
        <TextField
          id="password"
          label="Password"
          // type="password"
          onKeyDown={(data: any) => {
            if (data.charCode === 13) {
              console.log("Key `Enter` pressed");
            }
          }}
        />
      </>
    );
  }
}

export default AsideComponent;