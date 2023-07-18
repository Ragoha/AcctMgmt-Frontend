import React, { Component } from 'react';
import { Box, Container, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Detail_Info_FormControl from "./Detail_Info_FormControl/Detail_Info_FormControl";
//import {DatePicker}  from '@mui/x-date-pickers/DatePicker'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar } from "react-icons/fi";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SignIn from './SignIn';
import { DataGrid } from '@mui/x-data-grid';

class Detail_Info extends Component { //DataGrid 옆의 상세정보 창 구현.
  constructor(props) {
    super(props);
    this.state = {
      // Detail_Info_FormControle 의 menuValues
      detailInfo: props.detailInfo,
      startDate: new Date(),
      endDate: '',
      menuItemValues: [
        ['1.통제안함', '2.월별조회', '3.분기별조회', '4.년누적조회', '5.월별통제', '6.분기별통제', '7.년누적통계', '8.월누적통제', '9.프로젝트기간통제'],
        ['0.전용가능', '1.전용불가'],
        ['0.여', '1.부'],
        ['0.없음', '1.물품', '2.용역', '3.공사'],
      ],
      title: ['예산통제구분', '예산전용구분', '회계계정과목', '최하위과목여부', '구매성격'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      dbValue: props.dbValue,
      CTL_FG: props.CTL_FG,
      BGAJUST_FG: props.BGAJUST_FG,
      BOTTOM_FG: props.BOTTOM_FG,
      BIG_FG: props.BIG_FG,
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.CTL_FG !== prevProps.CTL_FG ||
      this.props.BGAJUST_FG !== prevProps.BGAJUST_FG ||
      this.props.BOTTOM_FG !== prevProps.BOTTOM_FG ||
      this.props.BIG_FG !== prevProps.BIG_FG
    ) {
      this.setState({
        CTL_FG: this.props.CTL_FG,
        BGAJUST_FG: this.props.BGAJUST_FG,
        BOTTOM_FG: this.props.BOTTOM_FG,
        BIG_FG: this.props.BIG_FG,
      });
    }
  }
  dateChange = (date) => {
    this.setState({
      startDate: date
    });
  };
  render() {
    const { menuItemValues, startDate, CTL_FG ,BGAJUST_FG,BOTTOM_FG,BIG_FG} = this.state;
    return (
      <Container >
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center" sx={{ marginTop: '11px' }}>
              <Detail_Info_FormControl title={'예산통제구분'} CTL_FG={CTL_FG} menuItemValues={menuItemValues[0]} />
              <Detail_Info_FormControl title={'예산전용구분'} BGAJUST_FG={BGAJUST_FG}menuItemValues={menuItemValues[1]} />
              <Grid container >
                <Grid item md={5} sx={{ marginTop: '11px' }}>
                  <InputLabel>사용기한</InputLabel>  </Grid>
                <DatePicker dateFormat="yyyy-mm-dd" showIcon selected={startDate} onChange={this.dateChange} customInput={
                  <div style={{ position: 'relative' }}>
                    <input type='text' value={startDate} readOnly />
                    <FiCalendar style={{ position: 'absolute', right: '10px', top: '5px' }} />
                  </div>
                } />
                {/*기간 범위 넣을 수 있음 https://reactdatepicker.com/#example-custom-header */}
              </Grid>
              <Detail_Info_FormControl title={'회계계정과목'} menuItemValues={menuItemValues[1]} />
              <Detail_Info_FormControl title={'최하위과목여부dd'} menuItemValues={menuItemValues[2]} />
              <Detail_Info_FormControl title={'구매성격'} menuItemValues={menuItemValues[3]} />
            </Grid>
          </Grid>
        </Grid>
      </Container>//최상위 컨테이너 
    );
  }
}
export default Detail_Info;