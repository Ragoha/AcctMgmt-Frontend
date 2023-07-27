import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import { Visibility } from "@mui/icons-material";

class ListDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      listItems: ["abc", "def", "gea"],
      isDeleteIconVisible: false,
    };
  }

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

  componentDidMount() {
    this.setState({
      inputValue:
        this.state.listItems[0] + "외 " + this.state.listItems.length + "건",
    });
  }

  handleMouseEnter = () => {
    this.setState({ isDeleteIconVisible: true });
  };

  handleMouseLeave = () => {
    this.setState({ isDeleteIconVisible: false });
  };

  render() {
    const { inputValue, listItems, isDeleteIconVisible } = this.state;
    return (
      <div>
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
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  console.log(`Pressed keyCode ${e.key}`);
                  this.setState({ listItems: [] });
                }
              }}
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    <DeleteIcon
                      onClick={() => {
                        alert("asdf");
                      }}
                      style={{ cursor: "pointer" }}
                      sx={{
                        position: "absolute",
                        right: "50px",
                        visibility: isDeleteIconVisible ? "visible" : "hidden",
                      }}
                    />
                    <DeleteIcon
                      onClick={() => {
                        alert("1111");
                      }}
                      style={{ cursor: "pointer" }}
                      sx={{ mr: "-30px", position: "absolute", right: "50px" }}
                    />
                    {params.InputProps.endAdornment}
                  </>
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
      </div>
    );
  }
}

export default ListDisplay;
