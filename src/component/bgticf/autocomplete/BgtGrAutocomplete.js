import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import React, { Component, createRef } from "react";
import BgtCDDialogComponent from "../dialog/BgtCDDialogComponent";
import { connect } from "react-redux";
import BgtGrDialogComponent from "../dialog/BgtGrDialogComponent";

class BgtGrAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      listItems: [],
      isDeleteIconVisible: false,
      bgtGrTextField: "",
      bgtGrCd: "",
      bgtGrCdList: [],
      bgtGrNm: "",
    };

    this.bgtGrRef = createRef();
  }

  setListItem = (data) => {
    console.log(data);
    const listItems = data.map((item) => item.bgtGrCd + ". " + item.bgtGrNm);
    let bgtGrTextField;
    if (listItems.length > 1) {
      bgtGrTextField = listItems[0] + " 외 " + (listItems.length - 1) + "건";
    } else {
      bgtGrTextField = listItems[0];
    }
    console.log(listItems);
    this.setState({
      listItems: listItems,
      bgtGrTextField: bgtGrTextField,
    });
  };

  handleRemove = async (index) => {
    await this.setState((prevState) => ({
      listItems: prevState.listItems.filter((item, i) => i !== index),
      bgtGrCdList: prevState.bgtGrCdList.filter((item, i) => i !== index),
    }));
    if (this.state.listItems.length > 1) {
      await this.setState({
        bgtGrTextField:
          this.state.listItems[0] +
          " 외 " +
          (this.state.listItems.length - 1) +
          "건",
      });
    } else if (this.state.listItems.length == 1) {
      await this.setState({
        bgtGrTextField: this.state.listItems[0],
      });
    } else {
      await this.setState({
        bgtGrTextField: "",
      });
    }

    this.props.changeBgtGrList(this.state.bgtGrCdList);
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
    console.log(this.bgtGrRef);
    // this.bgtGrRef.current.setBgtCDDialog();
    this.bgtGrRef.current.setBgtGrDialog();
  };

  handleSetBgtGrTextField = (dataList) => {
    console.log(dataList);
    const bgtGrTextList = dataList.map(
      (data) => data.bgtGrCd + ". " + data.bgtGrNm
    );
    const bgtGrCdList = dataList.map((data) => data.bgtGrCd);
    let bgtGrTextField;
    if (bgtGrTextList.length > 1) {
      bgtGrTextField =
        bgtGrTextList[0] + " 외 " + (bgtGrTextList.length - 1) + "건";
    } else {
      bgtGrTextField = bgtGrTextList[0];
    }

    this.setState({
      bgtGrCdList: bgtGrCdList,
      listItems: bgtGrTextList,
      bgtGrTextField: bgtGrTextField,
    });

    this.props.changeBgtGrList(bgtGrCdList);
  };

  handleKeyDownBgtCd = (e) => {
    console.log(this.state);
    console.log(e.key);
    if (e.key === "Backspace") {
      this.setState({
        bgtGrTextField: "",
        bgtGrCd: "",
        bgtGrRows: [],
        listItems: [],
        bgtGrCdList: [],
      });
      this.props.resetBgtGr();
    } else if (e.key === "Enter") {
      this.bgtGrRef.current.setBgtGrDialog(this.state.bgtGrTextField);
    }
  };

  handleInputChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    console.log(this.state);
  };

  render() {
    const { bgtGrTextField, listItems, isDeleteIconVisible } = this.state;
    return (
      <>
        <Autocomplete
          tfStyle
          freeSolo
          options={listItems}
          value={bgtGrTextField}
          inputValue={bgtGrTextField}
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
              placeholder="예산그룹코드/예산그룹명"
              name="bgtGrTextField"
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
                        this.setState({
                          bgtGrTextField: "",
                          listItems: [],
                          bgtGrCdList: [],
                        });
                        this.props.resetBgtGr();
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
        <BgtGrDialogComponent
          handleSetBgtGrTextField={this.handleSetBgtGrTextField}
          ref={this.bgtGrRef}
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
  BgtGrAutocomplete
);
