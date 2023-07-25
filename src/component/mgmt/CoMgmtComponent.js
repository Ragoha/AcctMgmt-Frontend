import React, { Component } from 'react';

import { Box, Button, TextField, DialogActions, Divider, Card, CardContent, Typography, CardActionArea, IconButton, InputLabel } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Unstable_Grid2';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DaumPostcode from 'react-daum-postcode';
import ListIcon from '@mui/icons-material/List';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid } from '@mui/x-data-grid';

import CompanyService from '../../service/CompanyService';
import DialogComponent from '../common/DialogComponent';
import { createRef } from 'react';
import AddressComponent from './dialog/AddressComponent';

class CoMgmtComponent extends Component {
  constructor(props) {
    super(props);
    this.dialogRef = React.createRef();
    this.addrRef = React.createRef();
    this.state = {
      open: false,

      cards: [],
      cardCount: 0,
      searchWord: '',
      searchResult: '',
      coCd: 0,
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
      coCdList: [],
      coNmList: [],

      data: {
        columns: [
          { field: 'id', headerName: '기수', width: 90, headerAlign: 'center' },
          { field: 'firstName', headerName: '시작일', width: 180, headerAlign: 'center' },
          { field: 'firstName', headerName: '종료일', width: 180, headerAlign: 'center' }
        ],
        rows: [
          { id: 1, firstName: 'John' },
          { id: 2, firstName: 'Jane' },
          { id: 3, firstName: 'Bob' },
          // Add more rows here...
        ]
      }
    }
  }

  componentDidMount() {
    CompanyService.getCoList()
      .then((response) => {
        const coCdList = response.data.map((item) => item.coCd);
        const coNmList = response.data.map((item) => item.coNm);
        const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정
        this.setState({
          cardCount: cardCount, // state에 값을 저장
          coCdList: coCdList,
          coNmList: coNmList
        })
      })
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        // alert("중복된 회사 또는 모두 입력해주세요");
      });
  }


  handleCompany = (e) => {
    // console.log(e.target.id);
    this.setState({
      [e.target.name]: e.target.value
    })
    // console.log(this.state);
  }

  addCardButton = () => {
    const newCardCount = this.state.cardCount + 1;
    const newCoCdList = [...this.state.coCdList, '0000'];
    // const newCoNmList = [...this.state.coNmList, `coNm${newCardCount}`];

    // 상태를 업데이트하여 카드를 추가하고 컴포넌트를 다시 렌더링
    this.setState({
      cardCount: newCardCount,
      coCdList: newCoCdList,
      // coNmList: newCoNmList,
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
  } //여기에 모든 state값 초기화 하면 됨 !!!!!

  insertCo = () => {
    const {coNm, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1 } = this.state;
    CompanyService.insertCo(coNm, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1)

      .then((response) => {
        console.log(response.data);
        window.confirm('회사등록 완료!');
        const coCdList = response.data.map((item) => item.coCd);
        const coNmList = response.data.map((item) => item.coNm);
        const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정

        this.setState({
          cardCount: cardCount, // state에 값을 저장
          coCdList: coCdList,
          coNmList: coNmList,
          coCd: '',
          coNm: '',
          jongmok: '',
          businessType: '',
          coNb: '',
          ceoNm: '',
          coZip: '',
          coAddr: '',
          coAddr1: ''
        });
        // window.location.reload();
        // window.location.href="/acctmgmt/ozt/co";
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
    // this.setState({ openAddr: true });
    this.addrRef.current.handleUp();
    //  this.setState({ coZip: this.addrRef.current.value.coZip });
    //  this.setState({ coAddr: this.addrRef.current.value.coAddr });

    // console.log(this.addrRef.current.value.coZip, this.addrRef.current.value.coAddr);
  }

  closeAddrDialog = () => {
    this.addrRef.current.handleDown();
  }

  cardClick = (coCd) => {
    console.log(coCd);
    // this.setState({ coCd: coCdList[index] });
    // console.log(index)
    {coCd!='0000'?
    CompanyService.getCo(coCd)
    
      .then((response) => {
        const coCd = response.data[0].coCd;
        const coNm = response.data[0].coNm;
        const jongmok = response.data[0].jongmok;
        const businessType = response.data[0].businessType;
        const coNb = response.data[0].coNb;
        const ceoNm = response.data[0].ceoNm;
        const coZip = response.data[0].coZip;
        const coAddr = response.data[0].coAddr;
        const coAddr1 = response.data[0].coAddr1;
  
        this.setState({
          coCd: coCd,
          coNm: coNm,
          jongmok: jongmok,
          businessType: businessType,
          coNb: coNb,
          ceoNm: ceoNm,
          coZip: coZip,
          coAddr: coAddr,
          coAddr1: coAddr1})
        })
          .catch((error) => {
            // 오류 발생 시의 처리
            console.error(error);
            // alert("중복된 회사 또는 모두 입력해주세요");
        })
        :
        this.setState({
          coCd: '',
          coNm: '',
          jongmok: '',
          businessType: '',
          coNb: '',
          ceoNm: '',
          coZip: '',
          coAddr: '',
          coAddr1: ''
  })}}

  helpClick = () => {
    this.dialogRef.current.handleUp();
  };


  closeDialog = () => {
    this.dialogRef.current.handleDown();
  }

  setCoZipAddr = (data) => {
    this.setState({ coZip: data.coZip });
    this.setState({ coAddr: data.coAddr });
  }

  handleGisu = () => {
    this.setState({ open: true });
  }

  // updateCo =() => {
  //   const {coCd, coNm, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1 } = this.state;
  //   //console.log(coCd, coNm, jongmok, businessType, coNb, ceoNm, coZip, coAddr, coAddr1 )
  //   const co = {
  //     coCd: coCd,
  //     coNm: coNm,
  //     jongmok: jongmok,
  //     businessType: businessType,
  //     coNb: coNb,
  //     ceoNm: ceoNm,
  //     coZip: coZip,
  //     coAddr: coAddr,
  //     coAddr1: coAddr1
  //   };

  //   CompanyService.updateCo(co)
  //   .then((response) => {
  //     console.log(response.data);
  //     window.confirm('업데이트 완료!');
  //     const coCdList = response.data.map((item) => item.coCd);
  //     const coNmList = response.data.map((item) => item.coNm);
  //     const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정
  //     this.setState({
  //       cardCount: cardCount, // state에 값을 저장
  //       coCdList: coCdList,
  //       coNmList: coNmList,
  //       coCd: '',
  //       coNm: '',
  //       jongmok: '',
  //       businessType: '',
  //       coNb: '',
  //       ceoNm: '',
  //       coZip: '',
  //       coAddr: '',
  //       coAddr1: ''
  //     })})
 
  //   .catch((error) => {
  //     // 오류 발생 시의 처리
  //     console.error(error);
  //     alert("업데이트 실패..");
  //   });
  // }

  deleteCo = () => {  //-> 이거 index 값 건드리는게 아닌듯....ㅠ 삭제 시 index가 달라지는데 그 적은 숫자를 그대로 가지고있네 ㄷㄷ
    const { coCd } = this.state;
    // this.setState({ coCd });
    // console.log(coCd)
    // this.setState({ index: coCd })
    CompanyService.deleteCo(coCd)
      .then((response) => {
        console.log(response.data);
        window.confirm('회사삭제 완료!');
        const coCdList = response.data.map((item) => item.coCd);
        const coNmList = response.data.map((item) => item.coNm);
        const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정
        this.setState({
          cardCount: cardCount, // state에 값을 저장
          coCdList: coCdList,
          coNmList: coNmList,
          coCd: '',
          coNm: '',
          jongmok: '',
          businessType: '',
          coNb: '',
          ceoNm: '',
          coZip: '',
          coAddr: '',
          coAddr1: ''
        })
        })
        // window.location.href="/acctmgmt/ozt/co";
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        alert("삭제 실패..");
      });
  }

  // handleSearch = (e) => {
  //   this.setState({ searchWord: e.target.value });
  // }


  // removeRow = () => {
  //   this.setState((prevState) => ({ nbRows: Math.max(0, prevState.nbRows - 1) }));
  // };

  // addRow = () => {
  //   this.setState((prevState) => ({ nbRows: Math.min(100, prevState.nbRows + 1) }));
  // };

  render() {
    const { open, coCd, coNm, jongmok, businessType, ceoNm, coNb, coZip, coAddr, coAddr1, openAddr } = this.state;
    const { searchWord, searchResult } = this.state;
    const { nbRows, data } = this.state;
    const { cardCount, coCdList, coNmList } = this.state;

    const currentDate = new Date();
    //월을 0부터 시작하므로, 0부터 11까지의 값을 반환
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate()}`;

    const cards = coCdList.map((coCd, index) => ( //여기서의 index는 0부터의 index를 뜻하며, 카드추가버튼의 index는 cardCount와 연관
      <Card key={coCd} sx={{ mt: 1, mb: 1, border: '1px solid #000', position: 'relative' }}>
        <CardActionArea onClick={() => this.cardClick(coCd)}>
          <CardContent sx={{ height: 90 }}>
            <Typography sx={{ fontSize: 15 }} gutterBottom style={{ position: 'absolute', top: '7px' }}>
              {coCdList[index]}
            </Typography>
            <Typography sx={{ fontSize: 15 }} style={{ position: 'absolute', right: "9px", bottom: '4px' }} >
              {formattedDate}
            </Typography>
            {/* <Typography sx={{ fontSize: 15 }} style={{ position: 'absolute', right: "8px", top:'0px' }}>
              {index + 1}
            </Typography> */}
            <Typography sx={{ fontSize: 25 }} variant='h3' style={{ position: 'absolute', bottom: '8px' }}>
              {coNmList[index]}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ));


    return (
      <container>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ListIcon fontSize="large" />
          </Grid>
          <Grid item>
            <span>회사관리</span>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />

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
                  {coCd?
                  <Button  variant="outlined" onClick={this.updateCo}>수정</Button>
                    :
                  <Button  variant="outlined" onClick={this.insertCo}>저장</Button>
                  }
                </Grid>

                <Grid item xs={1} >
                  <Button variant="outlined" onClick={this.deleteCo}>삭제</Button>
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
                      <DemoContainer components={['DatePicker']} >
                        <DatePicker />
                        <Button size="small" sx={{ direction: "row", justifyContent: "center", alignItems: "center" }} variant="outlined" onClick={this.handleGisu}>
                          기수등록
                        </Button>
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>

                  <Dialog open={open} PaperProps={{ sx: { width: 500, height: 600 } }}>
                    <DialogTitle sx={{ backgroundColor: '#7895CB', color: 'white', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 60 }}>
                      회계기수 등록
                      <IconButton size='small' sx={{ ml: 36 }} onClick={() => this.setState({ open: false })}>
                        <CloseIcon fontSize='medium' sx={{ color: 'white' }} />
                      </IconButton>
                      <Divider sx={{ border: '1px solid #EAEAEA' }} />
                    </DialogTitle>
                    <DialogContent >

                      <Box sx={{ mt: 1, width: '100%' }}>

                        <Box style={{ height: 350, width: '100%' }} >
                          <DataGrid rows={data.rows} columns={data.columns}
                            showColumnVerticalBorder={true}
                            showCellVerticalBorder={true} // 각 셀마다 영역주기
                            hideFooter
                            />
                        </Box>
                      </Box>

                    </DialogContent>
                    <Divider />
                    <DialogActions>
                      <Button variant="outlined"
                        sx={{
                          backgroundColor: '#4A55A2', color: 'white',
                          "&:hover": {
                            backgroundColor: '#4A55A2'
                          }
                        }}>확인</Button>

                      <Button variant="outlined" onClick={() => this.setState({ open: false })} >취소</Button>
                    </DialogActions>
                  </Dialog>

                  <Grid item xs={5}>
                  </Grid>
                  {/* <Grid item xs={1}>
                    <InputLabel sx={{ display: 'flex', justifyContent: 'center', fontSize: 20, mr: 2, mt: 1 }}>~</InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid> */}

                </Grid>
              </Grid>
            </Grid>
            {/* </Box> */}
          </Box >
        </Grid >
        <AddressComponent setCoZipAddr={this.setCoZipAddr} ref={this.addrRef} />
        <DialogComponent ref={this.dialogRef} />
      </container>
    );
  }}


export default CoMgmtComponent;