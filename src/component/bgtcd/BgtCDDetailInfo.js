import React, { Component } from 'react';
import { Button, Container, Grid, InputLabel } from "@mui/material";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar } from "react-icons/fi";
import BgtCDService from '../../service/BgtCDService';
import BgtCDDetailInfoFormControl from './BgtCDDetailInfoFormControl';


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
      ctlFg: props.ctlFg,
      bgajustFg: props.bgajustFg,
      bottomFg: props.bottomFg,
      bizFg: props.bizFg,
      /*업데이트 하기위해 조회조건의 bgt_cd값이 필요함 */
      prevBgtCd: props.prevBgtCd,
    }
  }
  componentDidUpdate(prevProps) { //컴포넌트가 업데이트 될때마다 최상위 컴포넌트의 값을 바꿔서 DetailInfo에 들어가는 값을 바꿔주는 로직
    //이거 말고 callback 함수 썼으면 됐을거 같은데 ....나중에 시도해보자
    console.log('update임  CTLFG:' + this.props.ctlFg)
    console.log('update임  prevBgtCd:  ' + this.props.prevBgtCd)
    if (
      this.props.ctlFg !== prevProps.ctlFg ||
      this.props.bgajustFg !== prevProps.bgajustFg ||
      this.props.bottomFg !== prevProps.bottomFg ||
      this.props.bizFg !== prevProps.bizFg
    ) {

      this.setState({
        ctlFg: this.props.ctlFg,
        bgajustFg: this.props.bgajustFg,
        bottomFg: this.props.bottomFg,
        bizFg: this.props.bizFg,
      });
    }
    /*------------------------------------------------------------- */
  }
  updateDetailInfo = () => {
    const ctlDataIndex = this.ctlFgControl.state.dataindex; //Detail_Info_FormControl의 select 에서 선택된 menuitem 값의 dataIndex를 가져온다.
    const bgajustFgIndex = this.bgajustFgControl.state.dataindex;
    const bottomFgIndex = this.bottomFgControl.state.dataindex;
    const bizFgIndex = this.bizFgControl.state.dataindex;
    //console.log('여기서  prevBgtCd:' + this.props.prevBgtCd)
    console.log('깐솔로그')
    console.log(this.props.prevBgtCd)
    console.log('위에서 일단 this.props 보자')
    const updateData = {
      /*변경될 item */
      //bgtCd : 
      bgtCd: this.props.prevBgtCd, //이걸 조건문 (where)로 쿼리를 짤것임
      /*변경될 데이터 */
      ctlFg: ctlDataIndex,
      bgajustFg: bgajustFgIndex,
      bottomFg: bottomFgIndex,
      bizFg: bizFgIndex,
      /*--------*/
    }
    BgtCDService.updateDetailInfo(updateData)
      .then(data => {
        console.log('여긴 detailINfo야 ~' + data)
      }).catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  deleteRow =()=>{
    console.log('deleteRow에서this.props.prevBgtCd 찍어봄  :  '+this.props.prevBgtCd)
    const data = this.props.prevBgtCd;
    BgtCDService.deleteRow(data).catch(error => {
      console.error("deleteRow 에러야 :", error);
    });
  /*[230720] : 지금 삭제는 되는데 삭제하고나서 DataGrid가 바뀌질 않음 -230721-에 해볼예정 */

  }

  dateChange = (date) => {
    this.setState({
      startDate: date
    });
  };
  render() {
    const { menuItemValues, startDate, ctlFg, bgajustFg, bottomFg, bizFg } = this.state;
    return (
      <Container >
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center" sx={{ marginTop: '11px' }}>
              <BgtCDDetailInfoFormControl title={'예산통제구분'} ctlFg={ctlFg} menuItemValues={menuItemValues[0]}
                ref={(ref) => (this.ctlFgControl = ref)}
              />
              <BgtCDDetailInfoFormControl title={'예산전용구분'} bgajustFg={bgajustFg} menuItemValues={menuItemValues[1]}
                ref={(ref) => (this.bgajustFgControl = ref)}
              />
              <Grid container >
                <Grid item md={5} sx={{ marginTop: '11px', marginLeft: '55px' }}>
                  <InputLabel>사용기한</InputLabel>  </Grid>
                <DatePicker dateFormat="yyyy-mm-dd" showIcon selected={startDate} onChange={this.dateChange} customInput={
                  <div style={{ position: 'relative' }}>
                    <input type='text' value={startDate} readOnly />
                    <FiCalendar style={{ position: 'absolute', right: '10px', top: '5px' }} />
                  </div>
                } />  
                {/*기간 범위 넣을 수 있음 https://reactdatepicker.com/#example-custom-header */}
              </Grid>
              <BgtCDDetailInfoFormControl title={'회계계정과목'} menuItemValues={menuItemValues[1]} />
              <BgtCDDetailInfoFormControl title={'최하위과목여부'} bottomFg={bottomFg} menuItemValues={menuItemValues[2]}
                ref={(ref) => (this.bottomFgControl = ref)}
              />
              <BgtCDDetailInfoFormControl title={'구매성격'} bizFg={bizFg} menuItemValues={menuItemValues[3]}
                ref={(ref) => (this.bizFgControl = ref)}
              />
            </Grid>
          </Grid>
          <Grid sx={{ position: 'sticky', bottom: '5px', width: '100%' }}>
            <Button onClick={this.updateDetailInfo} variant="contained" size='large' sx={{ width: '200px', marginRight: '90px' }} style={{ border: '1px solid' }}>저 장</Button>
            <Button onClick={this.deleteRow} variant="contained" size='large' sx={{ width: '200px' }} style={{ border: '1px solid' }}>삭 제</Button>
          </Grid>
        </Grid>
      </Container>//최상위 컨테이너 
    );
  }
}
export default BgtCDDetailInfo;