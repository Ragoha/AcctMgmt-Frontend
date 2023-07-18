import React, { Component } from 'react';
import { Box, Button, TextField, Card, CardContent, Typography, CardActionArea, Container, IconButton, InputLabel, Divider, colors } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Unstable_Grid2';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { DataGrid } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import DaumPostcode from 'react-daum-postcode';

import UserService from '../../service/UserService';


class CoMgmtComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      cardCount: 0,
      searchWord: '',
      searchResult: '',
      nbRows: 3,
      openAddr: false,
      data: {
        columns: [
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'firstName', headerName: 'First Name', width: 150 },
          { field: 'lastName', headerName: 'Last Name', width: 150 },
          { field: 'age', headerName: 'Age', type: 'number', width: 90 },
          { field: 'email', headerName: 'Email', width: 200 },
        ],
        rows: [
          { id: 1, firstName: 'John', lastName: 'Doe', age: 25, email: 'john.doe@example.com' },
          { id: 2, firstName: 'Jane', lastName: 'Smith', age: 32, email: 'jane.smith@example.com' },
          { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 45, email: 'bob.johnson@example.com' },
          // Add more rows here...
        ],
      },
    }
  }

  addCardButton = () => {
    this.setState((prevState) => ({
      cardCount: prevState.cardCount + 1
    }));
  }

  addrButton = () => {
    this.setState((current) => ({
      openAddr: !current.openAddr
    }));
  }

//   // 주소 선택 이벤트
//   selectAddress = (data) => {
//     console.log( data.address, data.zonecode)
    
//     openAddr: !openAddr
// };


  helpClick = () =>{
    this.setState({ open: true });
  };

  handleSearch = (e) => {
    this.setState({ searchWord: e.target.value });
  }

  
  removeRow = () => {
    this.setState((prevState) => ({ nbRows: Math.max(0, prevState.nbRows - 1) }));
  };

  addRow = () => {
    this.setState((prevState) => ({ nbRows: Math.min(100, prevState.nbRows + 1) }));
  };

  render() {
    const { open, userList,openAddr, cardCount } = this.state;

    const { searchWord, searchResult } = this.state;
    const { nbRows, data } = this.state;
    const currentDate = new Date();
    //월을 0부터 시작하므로, 0부터 11까지의 값을 반환
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate()}`;

    const cards = Array.from({ length: cardCount }).map((_, index) => (
      <Card sx={{ mt: 1, mb: 1, border: '1px solid #000' }}>
        <CardActionArea >
          <CardContent>
            <Typography sx={{ fontSize: 15 }} gutterBottom component='div'>
              ss
            </Typography>
            <Typography sx={{ fontSize: 15 }} style={{ textAlign: 'right', marginTop: '-28px' }} component='div'>
              {formattedDate}
            </Typography>
            <Typography sx={{ fontSize: 15 }} style={{ textAlign: 'right', marginBottom: '-20px' }}>
              {index + 1}
            </Typography>
            <Typography sx={{ fontSize: 25 }} variant='h3' component='div'>
              ss
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

    ));

    return (
      <Container sx={{ mt: 2 }}>
        <Grid sx={{ width: '100%', minHeight: 700, backgroundColor: 'white' }}>
          <Box sx={{ display: 'flex' }}>
            <Grid container sx={{ justifyContent: "flex-start", width: '25%', minHeight: 700, backgroundColor: '#EAEAEA' }}>
              <Grid container sx={{ width: '100%', height: 'calc(100% - 7%)' }}>
                <Grid item xs={12} >

                  <Paper
                    component="form" //이거 필요한가.. 음.. 
                    sx={{ width: '100%', mt: 1, border: '1px solid #000' }}
                    onClick={this.helpClick}
                  >
                    <InputBase
                      sx={{ width: '83%', ml: 1 }}
                      placeholder="회사코드/회사명을 입력하세요"
                    // inputProps={{ 'aria-label': 'search' }}
                    
                    />
                    <IconButton type="button">
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                  {/* aria-label="search" */}
                  <Card>
                    {cards}
                  </Card>




                  <Dialog open={open} PaperProps={{sx:{width: 550 , minHeight:500, maxHeight: 600}}}>
            
                  <DialogTitle sx={{backgroundColor: '#6799FF', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>CodeHelp<IconButton size='small' onClick={() => this.setState({ open: false, userList: [],searchResult:[]})}>
                  
                  <CloseIcon fontSize='large'/>
                  </IconButton>
                  
                  </DialogTitle>
                  <DialogContent>
                  <Box mb={2}></Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center' , alignItems: 'center'}}>
                  <InputLabel >검색</InputLabel>
                  <TextField id="searchWord" variant="outlined" onChange={this.handleSearch}></TextField>
                  <Button variant="outlined" sx={{ marginLeft: '10px' }} onClick={this.keywordClick}>Search</Button></Box>
                  <Box mb={1}></Box>
                  <Divider />
                  <Box mb={2}></Box>
                   <Typography>
                  keyword: {searchWord} <br />
                  result:  {searchResult}

                  <Box sx={{ width: '100%' }}>
                    <Button size="small" onClick={this.removeRow}>
                      Remove a row
                    </Button>
                    <Button size="small" onClick={this.addRow}>
                       Add a row
                    </Button>
                  <div style={{ height: 500, width: '100%' }}>
                  <DataGrid rows={data.rows.slice(0, nbRows)} columns={data.columns} pageSize={5} />
                  </div>
                  </Box>

                  </Typography>
                  </DialogContent>
                  <Divider />
                  <DialogActions>
                  <Button variant="outlined" onClick={this.listClick}>Confirm</Button>
                  
                    <Button variant="outlined" onClick={() => this.setState({ open: false, userList: [],searchResult:[]})} >Cancel</Button>
                  </DialogActions>   
            </Dialog>
   


                </Grid>
              </Grid>

              <Grid container sx={{ ml: 2, display: 'flex', justifyContent: 'fixed-end', width: '100%' }} >
                <Fab variant="extended" color="primary" onClick={this.addCardButton} //aria-label 필요한가..?
                  sx={{ display: 'flex', justifyContent: 'center', width: '95%' }}>
                  <AddIcon />
                  INSERT
                </Fab>
              </Grid>
            </Grid>

            {/* <Box sx={{ width: '25%', minHeight:700 , backgroundColor: '#EAEAEA'}}>
            </Box> */}
            {/* <Box sx={{ width: '75%', minHeight: 700 , ml: 2, backgroundColor: '#EAEAEA'}}> */}


            <Grid container sx={{ ml: 1, width: '75%', minHeight: 700, backgroundColor: '#EAEAEA' }}>
              <Grid item sx={{ width: '100%', height: '30px', backgroundColor: '#EAEAEA' }}>
              </Grid>
              <Grid container sx={{ width: '100%', backgroundColor: 'white' }}>
                <Grid container sx={{ width: '100%', height: '50%', backgroundColor: '#EAEAEA' }}>
                </Grid>
                <Grid item xs={2}>
                  <InputLabel sx={{ mr: 2, mt: 1, textAlign: 'center', color: 'black' }}>기본정보</InputLabel>
                </Grid>

                <Grid item xs={8}></Grid>

                <Grid item xs={1} >
                  <Button variant="outlined">수정</Button>
                </Grid>

                <Grid item xs={1} >
                  <Button variant="outlined">삭제</Button>
                </Grid>

              </Grid>

              <Grid container sx={{ width: '100%', height: 'calc(100% - 200px)' }}>
                <Grid container spacing={2}
                  direction="colummn"
                  justifyContent="space-evenly"
                  alignItems="center" sx={{ width: '100%', height: '50px' }}>
                  
            
                  <Grid item xs={6} >
                  <Grid container direction="row"
                  justifyContent="center"
                  alignItems="center" sx={{border: '1px solid #000'}}> 
                  <InputLabel sx={{ textAlign: 'center', color: 'black', marginRight:"10px" }} >회사코드</InputLabel><TextField placeholder='필수입력값' sx={{ backgroundColor: '#FFA7A7' }}></TextField>
                  </Grid>
                  </Grid>
                  {/* <Grid item xs={2} >
                    <InputLabel sx={{ textAlign: 'center', color: 'black' }} >회사코드</InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField placeholder='필수입력값' sx={{ backgroundColor: '#FFA7A7' }}></TextField>
                  </Grid> */}
                  

                  <Grid item xs={2}>
                    <InputLabel sx={{ display: 'flex', justifyContent: 'center', color: 'black' }}>회사명</InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField></TextField>
                  </Grid>

                  <Grid item xs={2}>
                    <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>종목</InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField ></TextField>
                  </Grid>
                  <Grid item xs={2}>
                    <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>업태</InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField></TextField>
                  </Grid>

                  <Grid item xs={2}>
                    <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>대표자명</InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField></TextField>
                  </Grid>
                  <Grid item xs={2}>
                    <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>법인번호</InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField></TextField>
                  </Grid>

                  <Grid item xs={2}>
                    <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>회사주소</InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField sx={{
                      width: '150px' // 원하는 가로 크기를 지정 '기본크기는 약 222px'
                    }}></TextField> <Button sx={{ ml: 2, mt: 1 }} variant="outlined" onClick={this.addrButton}>우편번호</Button>

                {openAddr && 
                <DaumPostcode 
                    // onComplete={selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                    // autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    // defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어 
                    />}
                  </Grid>

                  <Grid item xs={6}></Grid>

                  <Grid item xs={2}>
                    <InputLabel></InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField sx={{
                      width: '400px'
                    }}></TextField>
                  </Grid>
                  <Grid item xs={6}></Grid>


                  <Grid item xs={2}>
                    <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>회계기수</InputLabel>
                  </Grid>
                  <Grid item xs={1}>
                    <InputLabel style={{ textAlign: 'right' }}>기</InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField></TextField>
                  </Grid>
                  <Grid item xs={1}>
                    <InputLabel>~</InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField></TextField>
                  </Grid>


                </Grid>
              </Grid>
            </Grid>
            {/* </Box> */}
          </Box>
        </Grid>
      </Container>
    );
                  }
                }

export default CoMgmtComponent;