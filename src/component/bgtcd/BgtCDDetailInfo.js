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
import SnackBarComponent from '../common/SnackBarComponent';
import Swal from 'sweetalert2';

/*리덕스 import */
// import { connect } from 'react-redux';
// import { set_detailInfo } from '../../store/BgtCDStore';


class BgtCDDetailInfo extends Component { //DataGrid 옆의 상세정보 창 구현.
  constructor(props) {
    super(props);
    this.snackBarRef = React.createRef();
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
      coCd: this.props.userInfo,
      ctlFg: null,
      bgajustFg: null,
      bottomFg: null,
      bizFg: null,
      bgtCd: null,
      toDt : dayjs(new Date()).format("YYYY-MM-DD"),
      /*업데이트 하기위해 조회조건의 bgt_cd값이 필요함 */
      //prevBgtCd: props.prevBgtCd,
    }
  }

  getBgtCd = () => {
    return this.state.bgtCd;
  }
  setDetailInfo = (bgtCd) => {
    this.setState({ bgtCd: bgtCd })
    const { accessToken } = this.props;
    BgtCDService.getDetailInfo(bgtCd, accessToken)
      .then(response => {
        // console.log('ctlFg 값은 ? ' + response[0].ctlFg);
        // console.log('bgajustFg 값은 ? ' + response[0].bgajustFg);
        // console.log('bottomFg 값은 ? ' + response[0].bottomFg);
        // console.log('bizFG 값은 ? ' + response[0].bizFg);
        // console.log('bgtCd 값은 ? ' + response[0].bgtCd);
        // console.log('Todt는 값은 ? ' + response[0].toDt);
        this.setState({
          ctlFg: response[0].ctlFg,
          bgajustFg: response[0].bgajustFg,
          bottomFg: response[0].bottomFg,
          bizFg: response[0].bizFg,
          toDt : response[0].toDt,
        });
        //여기서 redux에 response[0]의 데이터를 집어넣는다.
        //this.props.set_detailInfo(response[0]);
      })
  }
  setDetailInfoAfterAddRow=(detailInfo)=>{//addRow시 추가된 빈 로우 값에 DetailInfo(기본 값 설정.)
    this.setState({
      ctlFg:detailInfo.ctlFg,
      bgajustFg:detailInfo.bgajustFg,
      bottomFg: detailInfo.bottomFg,
      bizFg:detailInfo.bizFg,
      toDt:detailInfo.toDt,
    })
    
  }
  selectData=()=>{
    const detailInfo={
      ctlFg: this.ctlFgControl.state.dataindex,
      bgajustFg: this.bgajustFgControl.state.dataindex,
      bottomFg: this.bottomFgControl.state.dataindex,
      bizFg: this.bizFgControl.state.dataindex,
      bgtCd: this.state.bgtCd,
      toDt: this.state.toDt
    }
    return detailInfo;
  }

  //[230810] 원래 updateDetailInfo였던것.
  getDetailInfo = () => {
    const updateData = {
      ctlFg: this.ctlFgControl.state.dataindex,
      bgajustFg: this.bgajustFgControl.state.dataindex,
      bottomFg: this.bottomFgControl.state.dataindex,
      bizFg: this.bizFgControl.state.dataindex,
      bgtCd: this.state.bgtCd,
      toDt: this.state.toDt
    }
    return updateData;
    
  }
  /*On change Date*/
  handleChangeDatePicker = async (newValue) => {
    await this.setState({
      toDt: dayjs(newValue).format("YYYY-MM-DD")
    });
  };

  deleteRow = () => {
    const tBgtCd = this.state.bgtCd;
    const { coCd } = this.props.userInfo;
    const gisu = this.props.gisu;
    const keyword = this.props.keyword;
    const groupCd = this.props.groupCd;
    console.log("로스트아크화이팅")
    console.log(gisu)
    console.log(groupCd)
    console.log(keyword)
    console.log('tBgtCd : ?' +tBgtCd );
    this.showCommonSwalYn("삭제", "삭제하시겠습니까?", "info", "삭제", (confirmed) => {
      if (confirmed) {
        if(tBgtCd===undefined ||tBgtCd===null||tBgtCd===""){
          console.log('tBgtCd :  ? ' + tBgtCd)
          this.snackBarRef.current.handleUp("error" , "과목을 선택해주세요")
          return null;
        }
        const data = {
          coCd : coCd,
          bgtCd :this.state.bgtCd,
          gisu : gisu,
          keyword : keyword,
          groupCd : groupCd
        }
        const { accessToken } = this.props;
        BgtCDService.deleteRow(data, accessToken)
          .then(response => {
            if (response === 2) {
              this.snackBarRef.current.handleUp("success" , "삭제완료")
              this.props.getRecallDataGrid();
              // BgtCDService.getSearchData(coCd, gisu, keyword, groupCd, accessToken).then(////
              //   (response) => {
              //     console.log("response?")
              //     console.dir(response)
              //     if (response.data != "") {
              //       this.setState({ rows: response.data })
              //     } else {
              //       this.setState({ rows: [{ dataPath: "수입", bgtCd: " " }, { dataPath: "수출", bgtCd: "  " }] })
              //     }
              //   }
              // )
            }else if (response===1){
              this.snackBarRef.current.handleUp("error" , "사용중인 데이터입니다.")
            } else if(response ===0){
              this.snackBarRef.current.handleUp("error" , "하위 과목이 존재합니다")
            }
          }).catch(error => {
            console.error("deleteRow 에러야 :", error);
          }).then(
           
        );
      }else {
        this.showCommonToast('warning', '삭제가 취소되었습니다.');
      }

    });
  }
  showCommonToast = (icon, title, timer) => {
    const commonToast = Swal.mixin({
      toast: true,
      position: 'center-center',
      showConfirmButton: false,
      timer: timer ? timer : 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    commonToast.fire({
      icon: icon,
      title: title
    });
  }
  //icon = success, error, warning, info, question | title : "알럿창에 띄울 제목" | text:알럿창에 띄울 멘트
  showCommonSwal = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      color: '#716add',
      background: '#FCFCFC', // 원하는 배경색으로 설정
      customClass: {
        container: 'custom-swal-container',
        popup: 'custom-swal-popup',
      },
    });
  }
  //CustomSwal.showCommonSwalYn("저장", "저장하시겠습니까?", "info", "저장", (confirmed) => {
  showCommonSwalYn = (title, text, icon, yesButtonText, callback) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: yesButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        callback(true); // 확인 버튼을 눌렀을 때 콜백 함수를 호출하고 true를 전달
      }
      else {
        callback(false); // 취소 버튼을 눌렀을 때 콜백 함수를 호출하고 false를 전달
      }
    });
  }
  render() {
    const { menuItemValues, ctlFg, bgajustFg, bottomFg, bizFg, toDt } = this.state;
    return (
      <Grid container sx={{ borderTop: "3px solid black" }}>
        <Grid item sx={{ border: "2px solid #EAEAEA" }}>
          <Grid container>
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

            <Grid
              container
              alignItems="center"
              sx={{ borderBottom: "1px lightgray solid" }}
            >
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  backgroundColor: "#FCFCFC",
                  alignItems: "center",
                  height: "100%",
                  borderRight: "1px solid #EAEAEA",
                }}
              >
                <CustomInputLabel
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  사용기한
                </CustomInputLabel>
              </Grid>
              <Grid item xs={8}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                  disabled={true}
                    name="date"
                    format="YYYY-MM-DD"
                    value={dayjs(toDt)}
                    onChange={this.handleChangeDatePicker}
                    slotProps={{
                      textField: {
                        size: "small",
                        sx: {
                          width: "150px",
                          ml: "8px",
                          marginTop: "8px",
                          marginBottom: "8px",
                        },
                        inputProps: {
                          style: {
                            borderRadius: 0,
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
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
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid sx={{ marginTop: "50px" }}>
            <Button
              onClick={this.props.updateDetailInfo}
              variant="contained"
              size="large"
              sx={{
                width: "100px",
                borderColor: "#4A55A2",
                marginRight: "8px",
              }}
            >
              저 장
            </Button>
            <Button
              onClick={this.deleteRow}
              variant="outlined"
              size="large"
              sx={{ width: "100px", borderColor: "#4A55A2" }}
            >
              삭 제
            </Button>
          </Grid>
        </Grid>
        <SnackBarComponent ref={this.snackBarRef}/>
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BgtCDDetailInfo);//connect(mapStateToProps, mapDispatchToProps) (