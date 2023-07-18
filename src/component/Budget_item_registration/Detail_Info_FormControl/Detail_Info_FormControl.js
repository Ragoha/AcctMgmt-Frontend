import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { Component } from "react"
import UserService from "../../../service/UserService";

class Detail_Info_FormControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailInfo: props.detailInfo,
      menuItemValues: props.menuItemValues || [],
      title: props.title || null,
      dbValue: props.dbValue || null,
      defaultValue: this.checkIndex(props.menuItemValues ,props.dbValue) || '',
      CTL_FG : props.CTL_FG
    }
  }
  componentDidMount(){
    console.dir(this.props)
  }
  componentDidUpdate(prevProps) {
    if(this.props.CTL_FG !== prevProps.CTL_FG){
      this.setState({CTL_FG: this.props.CTL_FG},()=>{
        const newDefaultValue=this.state.CTL_FG;
        this.setState({defaultValue: this.props.menuItemValues[newDefaultValue]});
      });
    }
  }

  /*menuItemBalues 관련*/
  //['1.통제안함', '2.월별조회', '3.분기별조회', '4.년누적조회', '5.월별통제', '6.분기별통제', '7.년누적통계', '8.월누적통제', '9.프로젝트기간통제']
  checkIndex = (data) => {
    console.log('자! checkIndex')

    let defaultValue = '';
      if (data[0] === '0.여') {//여기서 데이터의 기본값을 판별하고 default를 지정해줌.
        defaultValue = data[1]
      } else {
        defaultValue = data[0]
      }
      return defaultValue;
    }
  changeValue = (event) => {
    this.setState({ defaultValue: event.target.value });
  }


  render() {
    const { menuItemValues, title, defaultValue } = this.state;
    return (
      <Grid container>
        <Grid item md={5} sx={{ marginTop: '11px' }}>
          <InputLabel>{title}</InputLabel>
        </Grid>
        <Grid item md={7} >
          <Select value={defaultValue} onChange={this.changeValue}
            sx={{ width: '229px' }} size="small" inputProps={{ style: { height: '11px' } }}>
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