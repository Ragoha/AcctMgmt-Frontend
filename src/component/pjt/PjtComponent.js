

import AddIcon from '@mui/icons-material/Add';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, CardActionArea, CardContent, InputAdornment, InputLabel, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid'; // 변경된 import
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import ListIcon from '@mui/icons-material/List';
import PjtService from '../../service/PjtService';
import { CustomGridContainer, CustomInputLabel, CustomTextField } from '../common/style/CommonStyle';
import { Component, createRef } from 'react';
import PjtDialogComponent from './dialog/PjtDialogComponent';

class PjtComponent extends Component {
  constructor(props) {
    super(props);
    this.pjtDialogRef = createRef();
    this.state = {
      open: false,
      focused: null,
      cards: [],
      cardCount: 0,
      pjtCdList: [],
      pjtNmList: [],
      progFgList: [],
      CodialTextField: '',
      isChanged: false, //수정중일때 변화 감지 변수 : 바뀐게 있다면 true로 바꿔서 alert창 띄우기&&수정이 완료되면 초기화
      dateRange: [null, null], // 날짜 범위를 배열로 저장합니다.
      coCd: 0,
      pgrCd: 0,
      pgrNm: "",
      pjtCd: "",
      pjtNm: "",
      prDt: new Date(),
      toDt: new Date(),
      progFg: "",
      apjtNm: "",
      stDt: new Date(),
      note: "",
    }
  }

  handleDateRangeChange = (newValue) => {
    this.setState({ dateRange: newValue });
  };
  componentDidMount() {
    const userInfo = this.props.userInfo;
    const { coCd } = userInfo;
    PjtService.getPjtList(coCd) //카드리스트 전체조회 함수
      .then((response) => {
        console.log("abc", response.data);
        const pjtCdList = response.data.map((item) => item.pjtCd); //프로젝트코드 리스트
        const pjtNmList = response.data.map((item) => item.pjtNm); //프로젝트 이름 리스트
        const progFgList = response.data.map((item) => item.progFg); //
        const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정 (총회사 띄우는거) 
        const pjtCd = response.data[0].pjtCd; //가장 먼저 저장된 pjtCd 코드 저장해서 이걸 통해서 리스트 순서를 정함
        console.log("프젝네임 어디갔누?", pjtNmList);
        console.log("프젝코드는 어디갔누?", pjtCdList);
        this.setState({
          cardCount: cardCount, // state에 값을 저장
          pjtCdList: pjtCdList,
          pjtNmList: pjtNmList,

          focused: '',
          pjtCd: pjtCd,
        })
      }) //db 에 아무것도 없을때 focused pjtCd 잡히는 것 에러 남 이거 잡아야함!
      .catch((error) => {
        // 오류 발생 시의 처리
        console.error(error);
        // alert("중복된 회사 또는 모두 입력해주세요");
      });
  }

  //추가, 수정, 텍스트 필드애들을 변화 감지해서 값 넣어주기
  //수정 시 값 변화를 인식
  handleCompany = (e) => {
    {
      this.setState({
        isChanged: true,
        [e.target.name]: e.target.value
      })
    }
  }
  //카드 리스트 생성
  addCardButton = () => {
    //0000을 갖고있는 카드가 생기면 생성되지 않도록 막은 조건
    if (this.state.pjtCdList.includes('000')) {
      alert("미등록 프로젝트가 존재합니다.");
    } else {
      const newCardCount = this.state.cardCount + 1;
      const newPjtCdList = [...this.state.pjtCdList, '000'];
      // 상태를 업데이트하여 카드를 추가하고 컴포넌트를 다시 렌더링
      this.setState({
        cardCount: newCardCount,
        pjtCdList: newPjtCdList,
        // coNmList: newCoNmList,
        focused: '000',
        pjtCd: '',
      })
    }
  }//여기에 모든 state값 초기화 하면 됨 !!!!!
  // 저장 버튼 누르면 텍스트 필드 갑 읽어와서 저장 해주는 친구들

  //카드를 클릭하면 우측에 데이터 랜더링 함수
  cardClick = (pjtCd) => {
    const userInfo = this.props.userInfo;
    const { coCd } = userInfo;
    console.log(pjtCd);
    // this.setState({ pjtCd: pjtCdList[index] });
    // console.log(index)
    if (this.state.isChanged) {
      alert('변경된 내용이 저장되지 않았습니다.'); //확인 취소 같이 나오는 어럴트
    } else {
      this.setState({ focused: pjtCd })
      {
        pjtCd == '000' ?
          this.setState({
            pjtCd: "",
            pgrCd: 0,
            pgrNm: "",
            pjtNm: "",
            prDt: "",
            toDt: "",
            progFg: "",
            apjtNm: "",
            stDt: "",
            note: "",
          }) :
          PjtService.getSelPjtList(pjtCd)
            .then((response) => {
              console.log("하나 잘 갖고오니?", response.data);
              const pjtCd = response.data[0].pjtCd;
              const pgrCd = response.data[0].pgrCd;
              const pgrNm = response.data[0].pgrNm;
              const pjtNm = response.data[0].pjtNm;
              const prDt = dayjs(response.data[0].prDt).format('YYYY-MM-DD');
              const toDt = dayjs(response.data[0].toDt).format('YYYY-MM-DD');
              const progFg = response.data[0].progFg;
              const apjtNm = response.data[0].apjtNm;
              const stDt = dayjs(response.data[0].stDt).format('YYYY-MM-DD');
              const note = response.data[0].note;

              this.setState({
                pjtCd: pjtCd,
                pgrCd: pgrCd,
                pgrNm: pgrNm,
                pjtNm: pjtNm,
                prDt: prDt,
                toDt: toDt,
                progFg: progFg,
                apjtNm: apjtNm,
                stDt: stDt,
                note: note,
              })
            })
            .catch((error) => {
              // 오류 발생 시의 처리
              console.error(error);
              // alert("중복된 회사 또는 모두 입력해주세요");
            })
      }
    }
  }


  //헬퍼코드
  helpClick = () => {
    this.pjtDialogRef.current.handleUp();
  };

  // 다이얼로그 닫을 때 사용
  closeDialog = () => {
    this.pjtDialogRef.current.handleDown();
  }
  // 검색한 다음 텍스트필드 값 변경해주는거 검색한 내용으로
  handleSetCodialTextField = async (data) => {
    await this.setState({
      CodialTextField: data.pjtCd + ". " + data.pjtNm,
      pjtCd: data.pjtCd  //밑에 pjtCd 넘겨주기
    });
  };
  // 검색한 내용들 나오는 곳
  searchClick = (pjtCd) => {
    // PjtService.getCompany(pjtCd)
    // .then((response) => {
    //   const pjtCdList = response.data.map((item) => item.pjtCd);
    //   const pjtNmList = response.data.map((item) => item.pjtNm); //? 이게되네 , 이건 돋보기 클릭 후, 해당하는 카드컴포넌트 보여주기
    //   const cardCount = response.data.length;

    //   const pjtCd = response.data[0].pjtCd;

    //   this.setState({
    //     cardCount: cardCount,//??????
    //     pjtCdList: pjtCdList,
    //     pjtNmList: pjtNmList,

    //     focused: pjtCd,
    //     pjtCd: pjtCd,
    //   })
    // })
    // .catch((error) => {
    //   // 오류 발생 시의 처리
    //   console.error(error);
    //   // alert("중복된 회사 또는 모두 입력해주세요");
    // })
  }


  //db로 삭제 요청

  render() {

    const { pjtCd, progFg, pgrNm, pgrCd, pjtNm, prDt, toDt, apjtNm, stDt, note, pjtRole } = this.state;

    const { cardCount, pjtCdList, pjtNmList } = this.state;
    const { value } = this.state;
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    //여기서의 index는 0부터의 index를 뜻하며, 카드추가버튼의 index는 cardCount와 연관

    const cards = pjtCdList.map((pjtCd, index) => (
      <Card
        key={pjtCd} focused={this.state.focused === pjtCd} sx={{ width: '100%', height: 70, position: 'relative', border: this.state.focused === pjtCd ? '2px solid #6798FD' : '1px solid #000', backgroundColor: this.state.focused === pjtCd ? '#E5FFFF' : 'white' }}>
        <CardActionArea onClick={() => this.cardClick(pjtCd)}>
          <CardContent sx={{ height: 90 }}>
            <Typography sx={{ fontSize: 8 }} gutterBottom style={{ position: 'relative', top: '-10px', left: "-10px" }}>
              {pjtCdList[index]}
            </Typography>
            {/* 날짜 찍는 곳 */}
            <Typography sx={{ fontSize: 10 }} style={{ position: 'relative', left: "90px" }} >
              {formattedDate}
            </Typography>
            <Typography sx={{ fontSize: 10 }} variant='h3' style={{ position: 'relative', bottom: "5px" }}>
              {pjtNmList[index]}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ));

    return (
      <>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ListIcon fontSize="large" />
          </Grid>
          <Grid item>
            <span>프로젝트 등록</span>
          </Grid>
        </Grid>
        <hr />

        {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
        <CustomGridContainer container direction="row"
          sx={{ pt: 2, pl: 2 }}
          justifyContent="left"
          alignItems="center">

          <CustomInputLabel >프로젝트</CustomInputLabel>
          <CustomTextField name='CodialTextField' value={this.state.CodialTextField} placeholder="프로젝트코드 "
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <HelpCenterOutlinedIcon onClick={this.helpClick} /></InputAdornment>
              ),
            }}
          ></CustomTextField>

          <CustomInputLabel >프로젝트구분</CustomInputLabel>
          <CustomTextField name='CodialTextField' value={this.state.CodialTextField} placeholder="전체 "
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon onClick={this.helpClick} /></InputAdornment>
              ),
            }}
          ></CustomTextField>

          <CustomInputLabel >프로젝트분류</CustomInputLabel>
          <CustomTextField name='CodialTextField' value={this.state.CodialTextField} placeholder="프로젝트그룹코드 "
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <HelpCenterOutlinedIcon onClick={this.helpClick} /></InputAdornment>
              ),
            }}
          ></CustomTextField>

          <CustomInputLabel >프로젝트기간</CustomInputLabel>
          <CustomTextField type="date" name='dateRange' value={this.state.dateRange || ''} onChange={this.handleCompany} sx={{
            '& input': {
              height: '9px',
            },
          }}></CustomTextField>
        </CustomGridContainer>
        {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}

        <Grid sx={{ position: 'relative', display: 'flex', width: '100%', }}>
          <Grid container
            bgcolor={'#f5f5f5'}
            sx={{ width: '22%', height: 580, border: '1px solid #EAEAEA' }}>
            <Grid item sx={{ mb: 1, display: 'flex', justifyContent: 'left', alignItems: "center", width: '100%', height: 22, backgroundColor: '#f5f5f5', borderBottom: '1px solid' }}>
              <InputLabel >프로젝트:</InputLabel><InputLabel sx={{ ml: 0.5, color: '#0054FF', fontWeight: 'bold' }}>{cardCount}</InputLabel>건
            </Grid>

            <Grid item sx={{ pl: 1.2, width: '95%', height: 'calc(100% - 5%)', overflowY: 'auto' }}>
              {/* 각 카드를 래핑하는 Grid 컨테이너를 추가하여 아래쪽에 스페이싱을 넣습니다 */}
              {cards.map((card, index) => (
                <Grid key={index} item xs={12} sx={{ mb: 1 }}>
                  {card}
                </Grid>
              ))}
            </Grid>

            <Grid container
              sx={{ position: 'relative', bottom: '60px', width: '100%' }} >
              <Button variant="extended" onClick={this.addCardButton}
                sx={{
                  border: '1px solid',
                  width: '100%',
                  height: '60px',
                  backgroundColor: '#F6F6F6',
                  color: 'black',
                  display: 'flex',
                  justifyContent: 'center',
                  "&:hover": {
                    backgroundColor: '#e0e0e0'
                  }
                }}
              >
                <AddIcon />
                추가
              </Button>
            </Grid>
          </Grid>
          {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
          <Grid container alignItems="center" justifyContent="space-between" sx={{ width: '100%', maxHeight: 40, borderBottom: '3px solid #000' }}>
            <Grid item>
              <InputLabel sx={{ ml: 2, mr: 2, mt: 1, textAlign: 'left', color: 'black', fontWeight: 'bold' }}>● 기본등록사항</InputLabel>
            </Grid>
            <Grid item alignItems={'right'}>
              {pjtCd ?
                <Button variant="outlined">수정</Button>
                :
                <Button variant="outlined">저장</Button>
              }
              <Button variant="outlined" >삭제</Button>
            </Grid>
            <Grid item xs={12} width={'100%'}>
              <InputLabel sx={{ ml: 3.8, mr: 2, mt: 2, textAlign: 'left', color: '#0054FF', fontWeight: 'bold' }}>기본정보</InputLabel>
              <hr />
            </Grid>

            <Grid container width={"100%"} border={'1px solid #e0e0e0'} >
              <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA', backgroundColor: '#FCFCFC' }}>
                <InputLabel sx={{ mr: 2, color: 'black' }}  >프로젝트코드</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA' }}>
                <TextField disabled size='small' sx={{ ml: 2, width: '93%' }} name='pjtCd' onChange={this.handleCompany} value={pjtCd || ''} />
              </Grid>

              <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA', backgroundColor: '#FCFCFC' }}>
                <InputLabel sx={{ mr: 2, color: 'black' }}  >프로젝트구분</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA' }}>
                <TextField size='small' sx={{ ml: 2, backgroundColor: '#FFEAEA', width: '93%' }} name='progFg' onChange={this.handleCompany} value={progFg || ''} InputProps={{ readOnly: true }} />
              </Grid>

              <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA', backgroundColor: '#FCFCFC' }}>
                <InputLabel sx={{ mr: 2, color: 'black' }}  >프로젝트명</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA' }}>
                <TextField size='small' sx={{ ml: 2, backgroundColor: '#FFEAEA', width: '93%' }} name='pjtNm' onChange={this.handleCompany} value={pjtNm || ''} InputProps={{ readOnly: true }} />
              </Grid>

              <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA', backgroundColor: '#FCFCFC' }}>
                <InputLabel sx={{ mr: 2, color: 'black' }}  >프로젝트약칭</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA' }}>
                <TextField size='small' sx={{ ml: 2, width: '93%' }} name='apjtNm' onChange={this.handleCompany} value={apjtNm || ''} />
              </Grid>

              <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA', backgroundColor: '#FCFCFC' }}>
                <InputLabel sx={{ mr: 2, color: 'black' }}  >프로젝트분류</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA' }}>
                <TextField size='small' sx={{ ml: 2, width: '93%' }} name='pgrCd' onChange={this.handleCompany} value={pgrCd || ''} placeholder='프로젝트그룹코드' />
              </Grid>

              <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA', backgroundColor: '#FCFCFC' }}>
                <InputLabel sx={{ mr: 2, color: 'black' }}  >사용권한설정</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA' }}>
                <TextField size='small' sx={{ ml: 2, width: '93%' }} name='pjtRole' onChange={this.handleCompany} value={pjtRole || ''} />
              </Grid>

              <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA', backgroundColor: '#FCFCFC' }}>
                <InputLabel sx={{ mr: 2, color: 'black' }}  >프로젝트기간</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA' }}>
                <Grid item xs={6} sx={{ ml: 2, width: '100%' }}>
                  <TextField type="date" name='prDt' value={this.state.dateRange || ''} onChange={this.handleCompany} sx={{
                    width: '100%', '& input': {
                      height: '9px',
                    },
                  }}></TextField>
                </Grid>
                <RemoveIcon />
                <Grid item xs={6} sx={{ borderRight: '1px solid #EAEAEA', width: '100%', mr: 2 }}>
                  <TextField type="date" name='toDt' value={this.state.dateRange || ''} onChange={this.handleCompany} sx={{
                    width: '100%', '& input': {
                      height: '9px',
                    },
                  }}></TextField>
                </Grid>
              </Grid>

              <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA', backgroundColor: '#FCFCFC' }}>
                <InputLabel sx={{ mr: 2, color: 'black' }}  >프로젝트시작일</InputLabel>
              </Grid>
              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA', width: '100%' }}>
                <TextField type="date" name='stDt' value={this.state.dateRange || ''} onChange={this.handleCompany} sx={{
                  ml: 2, width: '100%', mr: 2, '& input': {
                    height: '9px',
                  },
                }}></TextField>
              </Grid>


              <Grid item xs={2} sx={{ height: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA', backgroundColor: '#FCFCFC' }}>
                <InputLabel sx={{ mr: 2, color: 'black' }}  >비고</InputLabel>
              </Grid>
              <Grid item xs={10} sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #D8D8D8', borderRight: '1px solid #EAEAEA' }}>
                <TextField size='small' sx={{ ml: 2, width: '80%', }} name='note' onChange={this.handleCompany} placeholder='프로젝트 관련 비고 입력' />
              </Grid>


            </Grid>
          </Grid>
          {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
        </Grid > {/*  전체화면 닫는 곳*/}
        <PjtDialogComponent handleSetCodialTextField={this.handleSetCodialTextField} ref={this.pjtDialogRef} />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
  userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
});

export default connect(mapStateToProps)(PjtComponent);