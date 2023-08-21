import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import React, { Component, createRef } from "react";
import BgtCDDialogComponent from "../dialog/BgtCDDialogComponent";
import { connect } from "react-redux";

class BgtCdAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      listItems: [],
      isDeleteIconVisible: false,
      bgtCDTextField: "",
      bgtCd: "",
      bgtCdList: [],
      bgtNm: "",
    };

    this.bgtCdRef = createRef();
  }

  setListItem = (data) => {
    console.log(data);
    const listItems = data.map((item) => item.bgtCd + ". " + item.bgtNm);
    let bgtCDTextField;
    if (listItems.length > 1) {
      bgtCDTextField = listItems[0] + " 외 " + (listItems.length - 1) + "건";
    } else {
      bgtCDTextField = listItems[0];
    }
    console.log(listItems);
    this.setState({
      listItems: listItems,
      bgtCDTextField: bgtCDTextField,
    });
  };

  handleRemove = async (index) => {
    await this.setState((prevState) => ({
      listItems: prevState.listItems.filter((item, i) => i !== index),
      bgtCdList: prevState.bgtCdList.filter((item, i) => i !== index),
    }));
    if (this.state.listItems.length > 1) {
      await this.setState({
        bgtCDTextField:
          this.state.listItems[0] +
          " 외 " +
          (this.state.listItems.length - 1) +
          "건",
      });
    } else if (this.state.listItems.length == 1) {
      await this.setState({
        bgtCDTextField: this.state.listItems[0],
      });
    } else {
      await this.setState({
        bgtCDTextField: "",
      });
    }

    this.props.changeBgtCdList(this.state.bgtCdList);
  };

  handleAutocompleteChange = (event, value) => {
    this.setState({ inputValue: value || "" });
  };

  handleClickListItem = (event) => {
    event.stopPropagation();
  };

  handleMouseEnter = () => {
    this.setState({ isDeleteIconVisible: true });
  };

  handleMouseLeave = () => {
    this.setState({ isDeleteIconVisible: false });
  };

  handleClickSearch = () => {
    console.log(this.bgtCdRef);
    this.bgtCdRef.current.setBgtCDDialog();
  };

  handleSetBgtCDTextField = (dataList) => {
    console.log(dataList);
    const bgtCDTextList = dataList.map(
      (data) => data.bgtCd + ". " + data.bgtNm
    );
    const bgtCdList = dataList.map((data) => data.bgtCd);
    let bgtCDTextField;
    if (bgtCDTextList.length > 1) {
      bgtCDTextField =
        bgtCDTextList[0] + " 외 " + (bgtCDTextList.length - 1) + "건";
    } else {
      bgtCDTextField = bgtCDTextList[0];
    }

    this.setState({
      bgtCdList: bgtCdList,
      listItems: bgtCDTextList,
      bgtCDTextField: bgtCDTextField,
    });

    this.props.changeBgtCdList(bgtCdList);

  };

  handleKeyDownBgtCd = (e) => {
    console.log(this.state);
    console.log(e.key);
    if (e.key === "Backspace") {
      this.setState(
        {
          bgtCDTextField: "",
          bgtCd: "",
          bgtCDRows: [],
          listItems: [],
          bgtCdList: [],
        }
      );
      this.props.resetBgt();
    } else if (e.key === "Enter") {
      this.bgtCdRef.current.setBgtCDDialog(this.state.bgtCDTextField);
    }
  };

    handleInputChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    console.log(this.state);
  };


  render() {
    const { bgtCDTextField, listItems, isDeleteIconVisible } = this.state;
    return (
      <>
        <Autocomplete
          tfStyle
          freeSolo
          options={listItems}
          value={bgtCDTextField}
          inputValue={bgtCDTextField}
          size=""
          disableClearable
          clearIcon={
            <>
              <DeleteIcon
                onClick={() => {
                  alert("abc");
                  this.setState({ listItems: [] });
                }}
                sx={{ mr: "30", position: "absolute", left: "-70" }}
              />
            </>
          }
          renderInput={(params) => (
            <TextField
              onFocus={this.handleMouseEnter}
              onBlur={this.handleMouseLeave}
              placeholder="예산과목코드/예산과목명"
              name="bgtCDTextField"
              onChange={this.handleInputChange}
              sx={{
                width: 255,
                "& .MuiInputBase-root": {
                  height: 40,
                  paddingLeft: "9px",
                  paddingTop: 0,
                  paddingRight: "14px",
                  paddingBottom: 0,
                },
              }}
              onKeyDown={this.handleKeyDownBgtCd}
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <DeleteIcon
                      onClick={() => {
                        this.setState({ bgtCDTextField: "" });
                      }}
                      style={{ cursor: "pointer" }}
                      sx={{
                        position: "absolute",
                        right: "32px",
                        visibility: isDeleteIconVisible ? "visible" : "hidden",
                      }}
                    />
                    <SearchIcon onClick={this.handleClickSearch} />
                    {params.InputProps.endAdornment}
                  </InputAdornment>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <li
              {...props}
              onClick={this.handleClickListItem}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>{option}</div>
              <IconButton
                onClick={() => this.handleRemove(listItems.indexOf(option))}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </li>
          )}
        />
        <BgtCDDialogComponent
          handleSetBgtCDTextField={this.handleSetBgtCDTextField}
          ref={this.bgtCdRef}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken,
  user: state.user || {},
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  BgtCdAutocomplete
);
