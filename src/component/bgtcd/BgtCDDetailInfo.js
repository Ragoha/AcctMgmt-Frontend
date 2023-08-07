import React, { Component } from 'react';
import { Box, Button, Container, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FiCalendar } from "react-icons/fi";
import BgtCDService from '../../service/BgtCDService';
import BgtCDDetailInfoFormControl from './BgtCDDetailInfoFormControl';
import { ThreeDRotationSharp } from '@mui/icons-material';
import { Divider } from '@material-ui/core';
import { CustomBtnBgtcd, CustomInputLabel } from '../common/style/CommonStyle';
import { connect } from 'react-redux';
import { SET_GROUPCD } from '../../store/BgtCDStore';

/*리덕스 import */
// import { connect } from 'react-redux';
// import { set_detailInfo } from '../../store/BgtCDStore';


class BgtCDDetailInfo extends Component { //DataGrid 옆의 상세정보 창 구현.
  constructor(props) {
    super(props);
    this.state = {
      // Detail_Info_FormControle 의 menuValues
      detailInfo: props.detailInfo,
      // startDate: new Date(),
      // endDate: '',
      menuItemValues: [
        ['1.통제안함', '2.월별조회', '3.분기별조회', '4.년누적조회', '5.월별통제', '6.분기별통제', '7.년누적통계', '8.월누적통제', '9.프로젝트기간통제'],
        ['0.전용가능', '1.전용불가'],
        ['0.여', '1.부'],
        ['0.없음', '1.물품', '2.용역', '3.공사'],
      ],
      title: ['예산통제구분', '예산전용구분', '회계계정과목', '최하위과목여부', '구매성격'],
      //months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      dbValue: props.dbValue,
      coCd : this.props.userInfo,
      ctlFg: null,
      bgajustFg: null,
      bottomFg: null,
      bizFg: null,
      bgtCd: null,
      currentTime : new Date(),
      /*업데이트 하기위해 조회조건의 bgt_cd값이 필요함 */
      //prevBgtCd: props.prevBgtCd,
    }
  }
  getBgtCd = () => {
    return this.state.bgtCd ;
  }
  setDetailInfo = (bgtCd) => {
    console.log('---DetailInfo.js에 있는 setDetailInfo---')
    this.setState({bgtCd : bgtCd},()=>console.log('setDetail에서 bgtcd 인식하는가 '+this.state.bgtCd))
    const{accessToken} = this.props;
    BgtCDService.getDetailInfo(bgtCd ,accessToken)
      .then(response => {
        console.log('ctlFg 값은 ? ' + response[0].ctlFg);
        console.log('bgajustFg 값은 ? ' + response[0].bgajustFg);
        console.log('bottomFg 값은 ? ' + response[0].bottomFg);
        console.log('bizFG 값은 ? ' + response[0].bizFg);
        console.log('bgtCd 값은 ? ' + response[0].bgtCd);
        this.setState({
          ctlFg: response[0].ctlFg,
          bgajustFg: response[0].bgajustFg,
          bottomFg: response[0].bottomFg,
          bizFg: response[0].bizFg
        });
        //여기서 redux에 response[0]의 데이터를 집어넣는다.
        //this.props.set_detailInfo(response[0]);
      })
  }
  updateDetailInfo = () => {
    console.log('---updateDetailInfo---')
    const{accessToken} = this.props;
    const updateData = {
      ctlFg: this.ctlFgControl.state.dataindex,
      bgajustFg: this.bgajustFgControl.state.dataindex,
      bottomFg: this.bottomFgControl.state.dataindex,
      bizFg: this.bizFgControl.state.dataindex,
      bgtCd: this.state.bgtCd,
    }
    BgtCDService.updateDetailInfo(updateData ,accessToken)
      .then(response => {
        console.log('여긴 detailINfo야 ~' + response)
      }).catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  deleteRow = () => {
    console.log('deleteRow에서this.props.prevBgtCd 찍어봄  :  ' + this.state.bgtCd)
    const data = this.state.bgtCd
    const{accessToken} = this.props;
    BgtCDService.deleteRow(data,accessToken)
      .then(response => {
        if (response === 0) {
          alert('삭제완료야 ㅋㅋ')
        } else {
          alert("하위 과목들이 있어서 안돼 ")
        }
      }).catch(error => {
        console.error("deleteRow 에러야 :", error);
      }).then(
      /*여기서 내일 Redux로 부모의 함수하는거 붙이는거 해볼 예정 . */
    );
    /*[230720] : 지금 삭제는 되는데 삭제하고나서 DataGrid가 바뀌질 않음 -230721-에 해볼예정
    * [230801] : delete 이후에 dataGrid 다시 불러오기 구현 시작 
    */
  }
  render() {
    const { menuItemValues, ctlFg, bgajustFg, bottomFg, bizFg } = this.state;
    return (
      <Container >
        <Grid container sx={{borderTop: "3px solid black" }}>
          <Grid item xs={12}  >
             <Grid container >
              <BgtCDDetailInfoFormControl title={'예산통제구분'} ctlFg={ctlFg} menuItemValues={menuItemValues[0]}
                ref={(ref) => (this.ctlFgControl = ref)}
              />
              <BgtCDDetailInfoFormControl title={'예산전용구분'} bgajustFg={bgajustFg} menuItemValues={menuItemValues[1]}
                ref={(ref) => (this.bgajustFgControl = ref)}
              />

<Grid container alignItems="center" sx={{  borderBottom: "1px lightgray solid" , height:'80px'}} >
                <Grid item md={6} >
                  <InputLabel sx={{marginLeft:'16px', marginTop: '5px' }}>사용기한</InputLabel>  
                </Grid>
                <Grid >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name="rangeTextField"
                      format="YYYY-MM-DD"
                      onChange={this.handleChangeDatePicker}
                      slotProps={{
                        textField: {
                          size: "small",
                          sx: { width: "255px", mr: "3px", marginTop: '13px',marginBottom:'3px' }, 
                          inputProps: {
                            style: { 
                              borderRadius: 0 
                            }
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                {/*기간 범위 넣을 수 있음 https://reactdatepicker.com/#example-custom-header */}
              </Grid>
              <BgtCDDetailInfoFormControl title={'회계계정과목'} menuItemValues={menuItemValues[1]}
              />
              <BgtCDDetailInfoFormControl title={'최하위과목여부'} bottomFg={bottomFg} menuItemValues={menuItemValues[2]}
                ref={(ref) => (this.bottomFgControl = ref)}
              />
              <BgtCDDetailInfoFormControl title={'구매성격'} bizFg={bizFg} menuItemValues={menuItemValues[3]}

                ref={(ref) => (this.bizFgControl = ref)}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid sx={{marginTop: '50px'}}> 
              <CustomBtnBgtcd onClick={this.updateDetailInfo} variant="contained" size='large' sx={{ width: '100px',borderColor:'#4A55A2',marginRight:'50px' }} style={{ border: '1px solid' }}>저 장</CustomBtnBgtcd>
              <CustomBtnBgtcd onClick={this.deleteRow} variant="contained" size='large' sx={{ width: '100px' , borderColor:'#4A55A2' }} style={{ border: '1px solid' }}>삭 제</CustomBtnBgtcd>
            </Grid>

          </Grid>
        </Grid>
      </Container> //최상위 컨테이너
    );
  }
}
const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
  userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
});

const mapDispatchToProps = (dispatch) => {
  return {
    SET_GROUPCD: (response) => dispatch(SET_GROUPCD(response)),
  };
}

export default connect(mapStateToProps ,mapDispatchToProps,null ,{forwardRef: true }) (BgtCDDetailInfo);//connect(mapStateToProps, mapDispatchToProps) (