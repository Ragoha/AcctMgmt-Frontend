import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";

class ListDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      listItems: ["abc", "def", "gea"],
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
    if(this.state.listItems.length > 0){
      await this.setState({
        inputValue:
          this.state.listItems[0] + "외 " + this.state.listItems.length + "건",
      });
    } else {
      await this.setState({
        inputValue:"",
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
      inputValue: this.state.listItems[0] + "외 " + this.state.listItems.length + "건",
    });
  }

  render() {
    const { inputValue, listItems } = this.state;
    return (
      <div>
        <Autocomplete
          freeSolo
          options={listItems}
          value={inputValue}
          clearIcon={
            <><DeleteIcon
              onClick={() => {
                alert("abc");
                this.setState({ listItems: [] });
              }}
            />
              </>
          }
          // onChange={this.handleAutocompleteChange}
          renderInput={(params) => <TextField {...params} />}
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
