import { Grid, MenuItem } from "@mui/material";
import { Component } from "react";
// import { connect } from 'react-redux';
// import { set_detailInfo } from '../../store/BgtCDStore';
import { CustomInputLabel, CustomWideSelect } from "../common/style/CommonStyle";

class BgtCDDetailInfoFormControl extends Component {
  constructor(props) {
    super(props);
    this.state = { //ctlFg, bgajustFg, bottomFg, bizFg 
      detailInfo: props.detailInfo,
      menuItemValues: props.menuItemValues || '',
      title: props.title || null,
      dbValue: props.dbValue || null,
      defaultValue: "",//this.checkIndex(props.menuItemValues, props.id) || '',
      dataindex: null, //menuItem 즉 선택된 데이터의 index를 반환해서 업데이트 시 DB에 반환할 값을 정해줌.
      ctlFg: this.props.ctlFg, //7
      bgajustFg: this.props.bgajustFg, //8
      bottomFg: this.props.bottomFg, //10
      bizFg: this.props.bizFg, //11 
      disable : false 
    }
  }
  componentDidMount(){
    if(this.state.title ==="회계계정과목"){this.setState({disable:true, defaultValue:this.props.menuItemValues[0]})}
  }

  disableFlag=(flag)=>{
    if(this.state.title ==="회계계정과목"){
      this.setState({disable:true})
    }else{
      this.setState({disable:flag},()=>{
        if(this.state.disable===true){
          this.setState({defaultValue:""})
        }
      })
    }
  }
  setDetailInfo=(data)=>{
    const dataA = this.props.menuItemValues[data];
    this.setState({defaultValue:dataA })
  }
  
  /*menuItemBalues 관련*/
  //['1.통제안함', '2.월별조회', '3.분기별조회', '4.년누적조회', '5.월별통제', '6.분기별통제', '7.년누적통계', '8.월누적통제', '9.프로젝트기간통제']
  checkIndex = (data) => {
    let defaultValue = '';
    if (data[0] === '0.여') {//여기서 데이터의 기본값을 판별하고 default를 지정해줌.
      defaultValue = data[1]
    } else {
      defaultValue = data[0]
    }
    return defaultValue;
  }
  changeValue = (event , child) => { // 변경한 내용을 defaultValue로 설정해주는 함수.
    const index = child.props['dataindex'];
    this.setState({ defaultValue: event.target.value, dataindex: index } //,()=>{this.props.onChange(event.target.value , this.props.id)} [230720]=> 있었는데 왜 있었는지 모르겠음 걍 지움 다른 코드랑 꼬이면 다시 생각해보자..
    );
  }
  render() {
    const { menuItemValues, title, defaultValue } = this.state;
    return (
      <Grid container sx={{ borderBottom: "1px lightgray solid"}} >
        <Grid item md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center',height: "100%", backgroundColor: '#FCFCFC',borderRight: '1px solid #EAEAEA'}} >
          <CustomInputLabel sx={{ display: 'flex', justifyContent: 'flex-end'}}>{title}</CustomInputLabel>
        </Grid>
        <Grid item md={8} sx={{ display: 'flex', alignItems: 'center'}}>
          <CustomWideSelect
            value={defaultValue}
            onChange={this.changeValue} 
            disabled={this.state.disable}
          >
            {" "}
            {menuItemValues.map((menuItemValue, index) => (
              <MenuItem key={index} value={menuItemValue} dataindex={index}>
                {menuItemValue}
              </MenuItem> ))}
          </CustomWideSelect>
        </Grid>
      </Grid>
    );
  }
}

export default BgtCDDetailInfoFormControl;