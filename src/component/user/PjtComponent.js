import ListIcon from '@mui/icons-material/List';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { FiCalendar } from 'react-icons/fi'; // 예시로 사용한 아이콘 라이브러리

class PjtComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectDate: null,
      projectCategory: '',
      projectClassification: '',
      selectedDate: null,
    };
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };
  dateChange = (date) => {
    this.setState({
      startDate: date
    });
  };

  render() {
    const projectCategories = [
      { value: 'category1', label: '카테고리1' },
      { value: 'category2', label: '카테고리2' },
      { value: 'category3', label: '카테고리3' },
    ];

    const { startDate } = this.state;
    return (
      <div>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ListIcon fontSize="large" />
          </Grid>
          <Grid item>
            <span>프로젝트 등록!!</span>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ width: '90%', height: '15%', backgroundColor: '#f0f0f0', padding: '16px' }}>
          <Grid container spacing={2} alignItems="center">
            {/* 첫 번째 텍스트 필드와 라벨 */}
            <Grid item xs={1}>
              <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>프로젝트</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="project-textfield"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ListIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* 두 번째 텍스트 필드와 라벨 */}
            <Grid item xs={1}>
              <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>프로젝트구분</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <TextField
                select
                fullWidth
                id="project-category-select"
                value={this.state.projectCategory}
              >
                {projectCategories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* 세 번째 텍스트 필드와 라벨 */}
            <Grid item xs={1}>
              <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>프로젝트분류</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="project-classification-textfield"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ListIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>프로젝트기간</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <DatePicker dateFormat="yyyy-mm-dd" showIcon selected={startDate} onChange={this.dateChange} customInput={
                <div style={{ position: 'relative' }}>
                  <input type='text' value={startDate} readOnly />
                  <FiCalendar style={{ position: 'absolute', right: '10px', top: '5px' }} />
                </div>
              } />
            </Grid>
          </Grid>
        </Box>
      </div >
    );
  }
}

export default PjtComponent;