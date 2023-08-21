import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import React, { Component, createRef } from "react";
import BgtCDDialogComponent from "./dialog/bgtcd/BgtCDDialogComponent";
import { connect } from "react-redux";

class ListDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      listItems: [],
      isDeleteIconVisible: false,
    };

    this.bgtCdRef = createRef();
  }

  setListItem = (data) => {
    console.log(data);
    const listItems = data.map((item) => item.bgtCd + ". " + item.bgtNm);
    let inputValue;
    if (listItems.length > 1) {
      inputValue = listItems[0] +" 외 "+(listItems.length - 1)+"건";
    } else {
      inputValue = listItems[0];
    }
    console.log(listItems);
    this.setState({
      listItems: listItems,
      inputValue: inputValue,
    });
  };

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = () => {
    const { inputValue, listItems } = this.state;
    if (inputValue.trim() !== "") {
      this.setState({
        listItems: [...listItems, inputValue],
        inputValue: "",
      });
    }
  };

  handleRemove = async (index) => {
    await this.setState((prevState) => ({
      listItems: prevState.listItems.filter((item, i) => i !== index),
    }));
    if (this.state.listItems.length > 0) {
      await this.setState({
        inputValue:
          this.state.listItems[0] + "외 " + this.state.listItems.length + "건",
      });
    } else {
      await this.setState({
        inputValue: "",
      });
    }
  };

  handleAutocompleteChange = (event, value) => {
    this.setState({ inputValue: value || "" });
  };

  handleClickListItem = (event) => {
    event.stopPropagation();
  };

  // componentDidMount() {
  //   this.setState({
  //     inputValue:
  //       this.state.listItems[0] + "외 " + this.state.listItems.length + "건",
  //   });
  // }

  handleMouseEnter = () => {
    this.setState({ isDeleteIconVisible: true });
  };

  handleMouseLeave = () => {
    this.setState({ isDeleteIconVisible: false });
  };

  handleClickSearch = () => {
    console.log(this.bgtCdRef);
    this.bgtCdRef.current.handleUp();
  }

  render() {
    const { inputValue, listItems, isDeleteIconVisible } = this.state;
    return (
      <>
        <Autocomplete
          tfStyle
          freeSolo
          options={listItems}
          value={inputValue}
          size=""
          disableClearable
          clearIcon={
            <>
              <DeleteIcon
                onClick={() => {
                  alert("abc");
                  this.setState({ listItems: [] });
                }}
                sx={{ mr: "30", position: "absolute", left: "-80" }}
              />
            </>
          }
          // onChange={this.handleAutocompleteChange}
          renderInput={(params) => (
            <TextField
              onFocus={this.handleMouseEnter} // 이 줄을 추가하세요
              onBlur={this.handleMouseLeave} // 이 줄을 추가하세요
              placeholder="예산과목코드/예산과목명"
              sx={{
                width: 255,
                "& .MuiInputBase-root": {
                  height: 40,
                  paddingLeft: "9px",
                  paddingTop: 0,
                  // paddingRight: 0,
                  paddingBottom: 0,
                },
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  console.log(`Pressed keyCode ${e.key}`);
                  this.setState({ listItems: [], inputValue: "" });
                }
              }}
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <DeleteIcon
                      onClick={() => {
                        alert("asdf");
                      }}
                      style={{ cursor: "pointer" }}
                      sx={{
                        position: "absolute",
                        right: "32px",
                        visibility: isDeleteIconVisible ? "visible" : "hidden",
                      }}
                    />
                    <SearchIcon
                      onClick={this.handleClickSearch}
                    />
                    {params.InputProps.endAdornment}
                  </InputAdornment>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} onClick={this.handleClickListItem}>
              <span>{option}</span>
              <IconButton
                onClick={() => this.handleRemove(listItems.indexOf(option))}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </li>
          )}
        />
        <BgtCDDialogComponent ref={this.bgtCdRef} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken,
  user: state.user || {},
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  ListDisplay
);

