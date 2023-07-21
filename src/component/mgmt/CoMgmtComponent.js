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

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import CompanyService from '../../service/CompanyService';
import axios from 'axios';
import { border } from '@mui/system';

const postStyle = {
  height: 470
};

class CoMgmtComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      cards: [],
      cardCount: 0,
      searchWord: '',
      searchResult: '',
      coCd: '',
      coNm: '',
      //gisu: '',   
      //frDt: '', //기수 시작일
      //toDt: '', //기수 종료일
      //insertId: '', //등록자
      //insertDt: '', //등록일  String???
      //insertIp: '', //등록자 ip
      //modifyId: '', //수정자
      //modifyDt: '', //수정일
      //modifyIp: '', //수정 ip
      jongmok: '', //종목
      businessType: '', //업태
      coNb: '', //사업자번호
      ceoNm: '', //대표자명
      coZip: '', //우편번호
      coAddr: '', //주소
      coAddr1: '', //상세주소

      openAddr: false,

      data: {
        columns: [
          { field: 'id', headerName: '회사코드', width: 180, headerAlign: 'center' },
          { field: 'firstName', headerName: '회사명', width: 270, headerAlign: 'center' }
        ],
        rows: [
          { id: 1, firstName: 'John' },
          { id: 2, firstName: 'Jane' },
          { id: 3, firstName: 'Bob' },
          // Add more rows here...
        ]
      },
    }
  }

  // componentDidMount() {
  //   CompanyService.getCoList()
  //     // .then((coCd, coNm, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1, cardCount) => {
  //     //   this.setState({ coCd, coNm, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1 });
  //     //   this.setState({cardCount: CompanyService.getCoList().length})
  //     //   console.log(coCd, coNm, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1,cardCount)
  //     //   console.log(cardCount)
  //   //})
  //   .then((response) => {
  //     // DB에서 가져온 데이터를 cards 배열에 저장합니다.
  //     this.setState({ cards: response.data });
  //   })
  //     .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   }

  handleCompany = (e) => {
    // console.log(e.target.id);
    this.setState({
      [e.target.name]: e.target.value
    })
    // console.log(this.state);
  }

  addCardButton = () => {
    this.setState((prevState) => ({
      cardCount: prevState.cardCount + 1
    }));
  }

  insertCo = () => {
    const { coCd, coNm, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1 } = this.state;
    CompanyService.insertCo(coCd, coNm, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1)

      .then((response) => {
        console.log(response.data);
        window.confirm('회사등록 완료!');
        this.setState({
          coCd: '',
          coNm: '',
          jongmok: '',
          businessType: '',
          coNb: '',
          ceoNm: '',
          coZip: '',
          coAddr: '',
          coAddr1: '',
        });
      })
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        alert("중복된 회사 또는 모두 입력해주세요");
      });
  }

  addrButton = () => {
    // this.setState((current) => ({
    //   openAddr: !current.openAddr
    // }));
    this.setState({ openAddr: true });
  }

  cardClick = (index) => {
    this.setState({ coCd: (index + 1) });
    // CompanyService.getCo(coCd)

    //   .then((response) => {
    //     console.log(response.data);
    //     window.confirm('회사조회 완료!');
    //   })
    //   .catch((error) => {
    //     // 오류 발생 시의 처리
    //     console.error(error);
    //     alert("회사조회 실패..ㅠ");
    //   });
  }

  // 주소 선택 이벤트
  selectAddress = (data) => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    console.log(fullAddr, data.zonecode);
    this.setState({ coZip: data.zonecode });
    this.setState({ coAddr: fullAddr });
    this.setState({ openAddr: false });// dialog창 꺼주기

    // 추가 코드: 주소 정보를 텍스트 필드에 설정
    document.getElementById("coZip").value = data.zonecode;
    document.getElementById("coAddr").value = fullAddr;

  };

  helpClick = () => {
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
    const { open, coCd, coNm, jongmok, businessType, ceoNm, coNb, coZip, coAddr, coAddr1, openAddr } = this.state;
    const { searchWord, searchResult } = this.state;
    const { nbRows, data } = this.state;
    const {  cardCount } = this.state;

    const currentDate = new Date();
    //월을 0부터 시작하므로, 0부터 11까지의 값을 반환
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate()}`;

    // {cards.map((cardData) => (
    //   <Card key={cardData.id} data={cardData} />
    // ))}

    const cards = Array.from({ length: cardCount }).map((_, index) => (
      <Card key={index} sx={{ mt: 1, mb: 1, border: '1px solid #000' }}>
        <CardActionArea onClick={() => this.cardClick(index)}>
          <CardContent sx={{ height: 120 }}>
            <Typography sx={{ fontSize: 15 }} gutterBottom >
              {index + 1}
            </Typography>
            <Typography sx={{ fontSize: 15 }} style={{ textAlign: 'right', marginTop: '-20px' }} >
              {formattedDate}
            </Typography>
            <Typography sx={{ fontSize: 15 }} style={{ textAlign: 'right', marginBottom: '-20px' }}>
              {index + 1}
            </Typography>
            <Typography sx={{ fontSize: 25 }} variant='h3'>
              {coNm}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

    ));

    return (
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

                <Dialog open={open} PaperProps={{ sx: { width: 500, height: 600 } }}>

                  <DialogTitle sx={{ backgroundColor: '#7895CB', color: 'white', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 60 }}>회사검색<IconButton size='small' onClick={() => this.setState({ open: false, userList: [], searchResult: [] })}>

                    <CloseIcon fontSize='medium' sx={{ color: 'white' }} />
                  </IconButton>

                  </DialogTitle>
                  <DialogContent >
                    <Box sx={{ border: '3px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', mt: 1, mb: 1 }}>
                      <Box mb={2}></Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 1 }}>
                        <InputLabel sx={{ fontWeight: 'bold', mr: 1 }}>검색</InputLabel>
                        <TextField id="searchWord" variant="outlined" size='small' onChange={this.handleSearch}></TextField>
                        <Button variant="outlined" style={{ padding: '0px', minWidth: '5px' }}>
                          <SearchIcon fontSize='medium' /></Button></Box>
                      {/* <Button variant="outlined" sx={{ marginLeft: '10px' }} >검색</Button></Box> */}
                      {/* onClick={this.keywordClick} */}
                      <Box mb={1}></Box>
                    </Box>
                    <Box mb={2}></Box>
                    {/* <Typography>
                        keyword: {searchWord} <br />
                        result:  {searchResult} */}
                    <Divider sx={{ border: '1px solid #EAEAEA' }} />
                    <Box sx={{ mt: 1, width: '100%' }}>
                      {/* <Button size="small" onClick={this.removeRow}>
                            Remove a row
                          </Button>
                          <Button size="small" onClick={this.addRow}>
                            Add a row
                          </Button> */}
                      <Box style={{ height: 350, width: '100%'}} >
                      <DataGrid rows={data.rows} columns={data.columns} showColumnVerticalBorder={true}
                        showCellVerticalBorder={true}
                        components={{
                          // 페이징과 "rows per page" 텍스트를 숨기는 컴포넌트 오버라이딩
                          Pagination: () => null,
                          Footer: () => null
                        }}
                      />

                    </Box>
                  </Box>

                  {/* </Typography> */}
                </DialogContent>
                <Divider />
                <DialogActions>
                  <Button variant="outlined" onClick={this.listClick}
                    sx={{
                      backgroundColor: '#4A55A2', color: 'white', "&:hover": {
                        backgroundColor: '#4A55A2'
                      }
                    }} >확인</Button>

                  <Button variant="outlined" onClick={() => this.setState({ open: false, userList: [], searchResult: [] })} >취소</Button>
                </DialogActions>
              </Dialog>

            </Grid>
          </Grid>

          <Grid container sx={{ ml: 2, display: 'flex', justifyContent: 'fixed-end', width: '100%' }} >
            <Fab variant="extended" onClick={this.addCardButton} //aria-label 필요한가..? 
              sx={{
                backgroundColor: '#4A55A2', color: 'white', display: 'flex', justifyContent: 'center', width: '95%',
                "&:hover": {
                  backgroundColor: '#4A55A2'
                }
              }}>
              <AddIcon />
              INSERT
            </Fab>
          </Grid>
      </Grid>
      
            {/* <Box sx={{ width: '25%', minHeight:700 , backgroundColor: '#EAEAEA'}}>
            </Box> */}
    {/* <Box sx={{ width: '75%', minHeight: 700 , ml: 2, backgroundColor: '#EAEAEA'}}> */ }


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
          <Button variant="outlined" onClick={this.insertCo}>저장</Button>
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
              alignItems="center" sx={{ border: '1px solid #000' }}>
              <InputLabel sx={{ textAlign: 'center', color: 'black', marginRight: "10px" }}  >회사코드</InputLabel>
              <TextField placeholder='필수입력값' size='small' sx={{ backgroundColor: '#FFA7A7' }} name='coCd' onChange={this.handleCompany} value={coCd || ''} InputProps={{ readOnly: true }}></TextField>
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
            <TextField name='coNm' size='small' onChange={this.handleCompany} value={coNm || ''}></TextField>
          </Grid>

          <Grid item xs={2}>
            <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>종목</InputLabel>
          </Grid>
          <Grid item xs={4}>
            <TextField name='jongmok' size='small' onChange={this.handleCompany} value={jongmok || ''}></TextField>
          </Grid>
          <Grid item xs={2}>
            <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>업태</InputLabel>
          </Grid>
          <Grid item xs={4}>
            <TextField name='businessType' size='small' onChange={this.handleCompany} value={businessType || ''}></TextField>
          </Grid>

          <Grid item xs={2}>
            <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>대표자명</InputLabel>
          </Grid>
          <Grid item xs={4}>
            <TextField name='ceoNm' size='small' onChange={this.handleCompany} value={ceoNm || ''}></TextField>
          </Grid>
          <Grid item xs={2}>
            <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>사업자번호</InputLabel>
          </Grid>
          <Grid item xs={4}>
            <TextField name='coNb' size='small' onChange={this.handleCompany} value={coNb || ''}></TextField>
          </Grid>

          <Grid item xs={2}>
            <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>회사주소</InputLabel>
          </Grid>
          <Grid item xs={4}>
            <TextField id="coZip" size='small' name="coZip" onChange={this.handleCompany} value={coZip || ''} InputProps={{ readOnly: true }}
              sx={{
                width: '150px' // 원하는 가로 크기를 지정 '기본크기는 약 222px'
              }}></TextField> <Button sx={{ direction: "row", justifyContent: "center", alignItems: "center", mt: 0.2 }} variant="outlined" onClick={this.addrButton}>우편번호</Button>
          </Grid>

          <Dialog open={openAddr} PaperProps={{ sx: { width: 430, height: 560 } }}>
            <DialogTitle sx={{ backgroundColor: '#7895CB', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 60 }}>주소검색<IconButton size='small' onClick={() => this.setState({ openAddr: false })}>
              <CloseIcon sx={{ color: "white" }} fontSize='medium' />
            </IconButton>
            </DialogTitle>

            <DialogContent sx={{ mt: 1 }} >
              <DaumPostcode
                style={postStyle}
                onComplete={this.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                autoClose={true} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
              //defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어 
              />
            </DialogContent>
          </Dialog>


          <Grid item xs={6}></Grid>

          <Grid item xs={2}>
            <InputLabel></InputLabel>
          </Grid>
          <Grid item xs={4}>
            <TextField sx={{ width: '400px' }} id="coAddr" name="coAddr" size='small' onChange={this.handleCompany} value={coAddr || ''} InputProps={{ readOnly: true }}></TextField>
          </Grid>
          <Grid item xs={6}></Grid>

          <Grid item xs={2}>
            <InputLabel></InputLabel>
          </Grid>
          <Grid item xs={4}>
            <TextField sx={{ width: '400px' }} name="coAddr1" size='small' onChange={this.handleCompany} value={coAddr1 || ''}></TextField>
          </Grid>
          <Grid item xs={6}></Grid>


          <Grid item xs={2}>
            <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>회계기수</InputLabel>
          </Grid>
          <Grid item xs={1}>
            <InputLabel sx={{ textAlign: 'right' }}>기</InputLabel>
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={1}>
            <InputLabel sx={{ display: 'flex', justifyContent: 'center', fontSize: 20, mr: 2, mt: 1 }}>~</InputLabel>
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
    {/* </Box> */ }
          </Box >
        </Grid >
    );
  }
}

export default CoMgmtComponent;