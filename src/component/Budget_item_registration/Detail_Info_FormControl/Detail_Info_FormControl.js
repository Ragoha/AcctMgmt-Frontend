import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { Component } from "react"
import UserService from "../../../service/UserService";

class Detail_Info_FormControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItemValues: props.menuItemValues || [],
      title: props.title || null,
      selectedMenuItem :this.checkIndex(props.menuItemValues)|| '',
    }
  }
    /*menuItemBalues 관련*/
  checkIndex= (data) =>{
    let defaultValue = '';
    if(data[0]==='0.여'){//여기서 데이터의 기본값을 판별하고 default를 지정해줌.
      defaultValue=data[1]
    }else{
      defaultValue=data[0]
    }
    return defaultValue;
  }

  changeValue = (event) => {
    this.setState({ selectedMenuItem: event.target.value });
  }
  
  render() {
    const { menuItemValues, title,selectedMenuItem } = this.state;
    return (
      <Grid container>
        <Grid item md={5} sx={{ marginTop: '11px' }}>
          <InputLabel>{title}</InputLabel>
        </Grid>
        <Grid item md={7} >
            <Select value={selectedMenuItem} onChange={this.changeValue} >
              {menuItemValues.map((menuItemValue) => (
                <MenuItem id="menu1Item" key={menuItemValue} value={menuItemValue}>
                  {menuItemValue}
                </MenuItem>
              ))}
            </Select>
        </Grid>
      </Grid>
    );
  }
}

export default Detail_Info_FormControl;