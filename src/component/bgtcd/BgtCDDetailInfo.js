import React, { Component } from 'react';
import { Box, Button, Container, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar } from "react-icons/fi";
import BgtCDService from '../../service/BgtCDService';
import BgtCDDetailInfoFormControl from './BgtCDDetailInfoFormControl';
import { ThreeDRotationSharp } from '@mui/icons-material';
import { CustomInputLabel } from '../common/style/CommonStyle';


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
      ctlFg: null,
      bgajustFg: null,
      bottomFg: null,
      bizFg: null,
      bgtCd: null
      /*업데이트 하기위해 조회조건의 bgt_cd값이 필요함 */
      //prevBgtCd: props.prevBgtCd,
    }
  }
  getBgtCd =()=>{
    return{bgtCd: this.state.bgtCd}
  }
  // componentDidUpdate(prevProps) { //컴포넌트가 업데이트 될때마다 최상위 컴포넌트의 값을 바꿔서 DetailInfo에 들어가는 값을 바꿔주는 로직

  //   console.log('update임  CTLFG:' + this.props.ctlFg)
  //   console.log('update임  prevBgtCd:  ' + this.props.prevBgtCd)
  //   if (
  //     this.props.ctlFg !== prevProps.ctlFg ||
  //     this.props.bgajustFg !== prevProps.bgajustFg ||
  //     this.props.bottomFg !== prevProps.bottomFg ||
  //     this.props.bizFg !== prevProps.bizFg
  //   ) {

  //     this.setState({
  //       ctlFg: this.props.ctlFg,
  //       bgajustFg: this.props.bgajustFg,
  //       bottomFg: this.props.bottomFg,
  //       bizFg: this.props.bizFg,
  //     });
  //   }
  //   /*------------------------------------------------------------- */
  // }
  setDetailInfo = (bgtCd) => {
    console.log('---setDetailInfo---')
    BgtCDService.getDetailInfo(bgtCd)
      .then(response => {
        console.log('ctlFg 값은 ? ' + response[0].ctlFg);
        console.log('bgajustFg 값은 ? ' + response[0].bgajustFg);
        console.log('bottomFg 값은 ? ' + response[0].bottomFg);
        this.setState(response[0])
        this.setState({ bgtCd: bgtCd })
      })
  }
  updateDetailInfo = () => {
    console.log('---updateDetailInfo---')
    const updateData = {
      ctlFg: this.ctlFgControl.state.dataindex,
      bgajustFg: this.bgajustFgControl.state.dataindex,
      bottomFg: this.bottomFgControl.state.dataindex,
      bizFg: this.bizFgControl.state.dataindex,
      bgtCd: this.state.bgtCd,
    }
    BgtCDService.updateDetailInfo(updateData)
      .then(response => {
        console.log('여긴 detailINfo야 ~' + response)
      }).catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  deleteRow = () => {
    console.log('deleteRow에서this.props.prevBgtCd 찍어봄  :  ' + this.state.bgtCd)
    const data = this.state.bgtCd
    BgtCDService.deleteRow(data).catch(error => {
      console.error("deleteRow 에러야 :", error);
    });
    /*[230720] : 지금 삭제는 되는데 삭제하고나서 DataGrid가 바뀌질 않음 -230721-에 해볼예정 */
  }
  render() {
    const { menuItemValues, startDate, ctlFg, bgajustFg, bottomFg, bizFg } = this.state;
    return (
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{ marginTop: "11px" }}
            >
              <BgtCDDetailInfoFormControl
                title={"예산통제구분"}
                ctlFg={ctlFg}
                menuItemValues={menuItemValues[0]}
                ref={(ref) => (this.ctlFgControl = ref)}
              />
              <BgtCDDetailInfoFormControl
                title={"예산전용구분"}
                bgajustFg={bgajustFg}
                menuItemValues={menuItemValues[1]}
                ref={(ref) => (this.bgajustFgControl = ref)}
              />
              <Grid container>
                <Grid
                  item
                  md={5}
                  sx={{ marginTop: "11px", marginLeft: "55px" }}
                >
                  <CustomInputLabel>사용기한</CustomInputLabel>
                </Grid>
                <DatePicker
                  dateFormat="yyyy-mm-dd"
                  showIcon
                  selected={startDate}
                  onChange={this.dateChange}
                  customInput={
                    <div style={{ position: "relative" }}>
                      <input type="text" value={startDate} readOnly />
                      <FiCalendar
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "5px",
                        }}
                      />
                    </div>
                  }
                />
                {/*기간 범위 넣을 수 있음 https://reactdatepicker.com/#example-custom-header */}
              </Grid>
              <BgtCDDetailInfoFormControl
                title={"회계계정과목"}
                menuItemValues={menuItemValues[1]}
              />
              <BgtCDDetailInfoFormControl
                title={"최하위과목여부"}
                bottomFg={bottomFg}
                menuItemValues={menuItemValues[2]}
                ref={(ref) => (this.bottomFgControl = ref)}
              />
              <BgtCDDetailInfoFormControl
                title={"구매성격"}
                bizFg={bizFg}
                menuItemValues={menuItemValues[3]}
                ref={(ref) => (this.bizFgControl = ref)}
              />
            </Grid>
          </Grid>
          <Grid sx={{ position: "sticky", bottom: "5px", width: "100%" }}>
            <Button
              onClick={this.updateDetailInfo}
              variant="contained"
              size="large"
              sx={{ width: "200px", marginRight: "90px" }}
              style={{ border: "1px solid" }}
            >
              저 장
            </Button>
            <Button
              onClick={this.deleteRow}
              variant="contained"
              size="large"
              sx={{ width: "200px" }}
              style={{ border: "1px solid" }}
            >
              삭 제
            </Button>
          </Grid>
        </Grid>
      </Container> //최상위 컨테이너
    );
  }
}
export default BgtCDDetailInfo;