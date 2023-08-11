import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from "@mui/icons-material/Assignment";
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Card, CardActionArea, CardContent, InputAdornment, InputLabel, TextField, Typography, Checkbox, ButtonGroup, Divider } from '@mui/material';
import Grid from '@mui/material/Grid'; // 변경된 import
import dayjs from 'dayjs';
import { Component, createRef } from 'react';
import { connect } from 'react-redux';
import PjtService from '../../service/PjtService';
import { CustomGridContainer, CustomHeaderGridContainer, CustomHeaderInputLabel, CustomInputLabel, CustomTextField, CustomWideTextField } from '../common/style/CommonStyle';
import PjtDialogComponent from './dialog/PjtDialogComponent';
import PgrDialogComponent from './dialog/PgrDialogComponent';
import { MenuItem, Select } from '@mui/material';
import Swal from 'sweetalert2';
import { Scrollbars } from 'react-custom-scrollbars';
import Alert from '@mui/material/Alert';
import './styles.css'; // 스타일시트 불러오기
import ListDisplay from '../bgticf/test';

class PjtComponent extends Component {
  constructor(props) {
    super(props);
    this.pjtDialogRef = createRef();
    this.pgrDialogRef = createRef();
    this.cardListRef = createRef();
    this.state = {
      open: false,
      focused: null,
      cards: [],
      cardCount: 0,
      pjtCdList: [],
      pjtNmList: [],
      progFgList: [],
      PjtdialTextField: '',
      PgrdialTextField: '',
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
      startDt: new Date(),
      note: "",
      progFgOptions: ['0.완료', '1.진행중', '9.미사용'],
      searchProgFgOptions: ['전체', '완료', '진행중', '미사용'],
      isPjtCdEditable: false, // 추가 버튼을 클릭하면 프로젝트코드 텍스트 필드 활성화 여부
      selectedCards: [], // 선택된 카드의 인덱스를 저장하는 배열
      selectedCount: 0,  // 선택된 카드 수
      selectAllChecked: false,//체크박스 전체 영향
      successAlert: false,//성공 알럿
      selectedProgFg: "전체",
    }
  }
  //드롭리스트 부분 프로젝트구분에서
  handleProgFgChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      progFg: value,
      isChanged: prevState[name] !== value,
    }));
  };

  handleProgFgChange2 = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      selectedProgFg: value,
      isChanged: prevState[name] !== value,
    }));
  };


  handleDateRangeChange = (newValue) => {
    this.setState({ dateRange: newValue });
  };
  componentDidMount() {
    console.log("너 이녀석 뭘 갖고오고 있는게냐", this.pjtDialogRef);
    const userInfo = this.props.userInfo;
    const { coCd } = userInfo;
    PjtService.getPjtList(coCd) //카드리스트 전체조회 함수
      .then((response) => {
        console.log("abc", response.data);
        const pjtCdList = response.data.map((item) => item.pjtCd); //프로젝트코드 리스트
        const pjtNmList = response.data.map((item) => item.pjtNm); //프로젝트 이름 리스트
        const pjtPrList = response.data.map((item) => item.prDt); //프로젝트 이름 리스트
        const pjtToList = response.data.map((item) => item.toDt); //프로젝트 이름 리스트
        const progFgList = response.data.map((item) => item.progFg); //
        const cardCount = response.data.length; // 받아온 데이터의 개수로 cardCount 설정 (총회사 띄우는거) 
        const pjtCd = response.data[0].pjtCd; //가장 먼저 저장된 pjtCd 코드 저장해서 이걸 통해서 리스트 순서를 정함
        const pgrCd = response.data[0].pgrCd;
        const pgrNm = response.data[0].pgrNm;
        const pjtNm = response.data[0].pjtNm;
        const prDt = dayjs(response.data[0].prDt).format('YYYY-MM-DD');
        const toDt = dayjs(response.data[0].toDt).format('YYYY-MM-DD');
        const progFg = response.data[0].progFg;
        const apjtNm = response.data[0].apjtNm;
        const startDt = dayjs(response.data[0].startDt).format('YYYY-MM-DD');
        const note = response.data[0].note;
        console.log("프젝네임 어디갔누?", pjtNmList);
        console.log("프젝코드는 어디갔누?", pjtCdList);
        this.setState({
          cardCount: cardCount, // state에 값을 저장
          pjtCdList: pjtCdList,
          pjtNmList: pjtNmList,
          pjtPrList: pjtPrList,
          pjtToList: pjtToList,
          progFgList: progFgList,
          focused: pjtCdList[0],
          pjtCd: pjtCd,
          pgrCd: pgrCd,
          pgrNm: pgrNm,
          pjtNm: pjtNm,
          prDt: prDt,
          toDt: toDt,
          progFg: progFg,
          apjtNm: apjtNm,
          startDt: startDt,
          note: note,
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
  handleFix = () => {
    const userInfo = this.props.userInfo;
    const { coCd } = userInfo;
    // isChanged가 true인 경우만 수정 사항이 있다고 간주하고 저장 로직을 실행
    if (this.state.isChanged) {
      // 저장 로직 실행
      const {
        pjtCd,
        pgrCd,
        pgrNm,
        pjtNm,
        prDt,
        toDt,
        progFg,
        apjtNm,
        startDt,
        note,
      } = this.state;
      const Pjt = {
        coCd: coCd,
        pgrCd: pgrCd,
        pgrNm: pgrNm,
        pjtCd: pjtCd,
        pjtNm: pjtNm,
        prDt: prDt,
        toDt: toDt,
        progFg: progFg,
        apjtNm: apjtNm,
        startDt: startDt,
        note: note,
      };
      console.log("넌 뭔값이야?", Pjt);
      PjtService.updatePjt(coCd, Pjt)
        .then((response) => {
          // 수정 완료 시 변경 감지 변수(isChanged)를 초기화하고 알림창 띄우기
          alert("수정되었습니다.");
          this.componentDidMount();
          this.setState({ isChanged: false });
        })
        .catch((error) => {
          // 오류 발생 시의 처리
          console.error(error);
          alert("수정에 실패하였습니다.");
        });

      // 수정 완료 시 변경 감지 변수(isChanged)를 초기화하고 알림창 띄우기
    } else {
      // 수정된 내용이 없는 경우 알림창 띄우기
      alert("수정된 내용이 없습니다.");
    }
  };

  handleSave = () => {
    const userInfo = this.props.userInfo;
    const { coCd } = userInfo;
    if (this.state.isChanged) {
      const {
        pjtCd, pgrCd, pgrNm, pjtNm, prDt, toDt, progFg,
        apjtNm, startDt, note,
      } = this.state;
      const Pjt = {
        coCd, pgrCd, pgrNm, pjtCd, pjtNm, prDt, toDt,
        progFg, apjtNm, startDt, note,
      };
      const impValues = { pjtCd, pjtNm, progFg };
      if (Object.values(impValues).some((value) => value === "")) {
        alert("필수 값을 입력해주세요.");
        return;
      }
      console.log("넌 뭔값이야?", Pjt);
      PjtService.insertPjt(coCd, Pjt)
        .then((response) => {
          alert("저장되었습니다.");
          this.setState({ isChanged: false });
          this.componentDidMount();
        })
        .catch((error) => {
          console.error(error);
          alert("저장에 실패하였습니다.");
        });
    } else {
      alert("저장할 내용이 없습니다.");
    }
  };


  handleDel = (e) => {
    const userInfo = this.props.userInfo;
    const { coCd } = userInfo;
    const {
      pjtCd,
    } = this.state;
    const Pjt = {
      coCd: coCd,
      pjtCd: pjtCd,
    };
    Swal.fire({
      title: '삭제처리',
      text: '삭제되었습니다',
      icon: 'success',
      color: '#716add',
      background: '#FCFCFC', // 원하는 배경색으로 설정
      customClass: {
        container: 'custom-swal-container',
        popup: 'custom-swal-popup',
      },
    });

    PjtService.deletePjt(Pjt)
      .then((response) => {
        this.setState({
          isPjtCdEditable: false
        })
        this.componentDidMount();
        this.setState({ successAlert: true }, () => {
          setTimeout(() => {
            this.setState({ successAlert: false });
          }, 2000);
        });
      })
      .catch((error) => {
        console.error(error);
      });

  }


  //체크박스들 삭제 처리
  handleDeleteSelected = () => {
    const userInfo = this.props.userInfo;
    const { coCd } = userInfo;
    const { selectedCards, pjtCdList } = this.state;

    if (selectedCards.length === 0) {
      return;
    }

    // 선택된 카드들의 정보를 가져와서 삭제 쿼리 실행
    selectedCards.forEach((index) => {
      const pjtToDelete = pjtCdList[index];
      const Pjt = {
        coCd: coCd,
        pjtCd: pjtToDelete,
      };
      PjtService.deletePjt(Pjt)
      // 여기서 PjtService.deletePjt(Pjt)를 호출하여 삭제 쿼리 실행
      // 삭제 후에는 필요한 상태 업데이트를 진행해야 합니다.
    });
    alert("삭제되었습니다.");
    // 선택된 카드들 삭제 후 상태 업데이트
    this.setState((prevState) => ({
      selectedCards: [],
      selectedCount: 0,
      selectAllChecked: false,
      pjtCdList: prevState.pjtCdList.filter((pjtCd, index) => !selectedCards.includes(index)),
      // 필요한 경우 다른 상태도 업데이트하세요.

    }));
    this.componentDidMount();
  };


  handlePjt = (e) => {
    const { name, value } = e.target;
    // 입력된 값과 이전 값이 다르면 isChanged를 true로 설정
    if (this.state[name] !== value) {
      this.setState({ [name]: value, isChanged: true });
    } else {
      this.setState({ [name]: value }); // 이전 값과 같은 경우 isChanged를 유지
    }
  };
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
        isPjtCdEditable: true, // 프로젝트코드 텍스트 필드 활성화
        cardCount: newCardCount,
        pjtCdList: newPjtCdList,
        // coNmList: newCoNmList,
        focused: '000',
        pjtCd: "",
        pgrCd: "",
        pgrNm: "",
        pjtNm: "",
        prDt: "",
        toDt: "",
        progFg: "1.진행중",
        apjtNm: "",
        startDt: "",
        note: "",
      },
        () => {
          // 새로 추가된 카드로 스크롤 이동
          if (this.cardListRef.current) {
            this.cardListRef.current.scrollTop = this.cardListRef.current.scrollHeight;
          }
        }
      );
    }
  };//여기에 모든 state값 초기화 하면 됨 !!!!!
  // 저장 버튼 누르면 텍스트 필드 갑 읽어와서 저장 해주는 친구들

  //카드를 클릭하면 우측에 데이터 랜더링 함수
  cardClick = (pjtCd) => {
    const userInfo = this.props.userInfo;
    const { coCd } = userInfo;
    console.log(pjtCd);

    if (this.state.isChanged) {
      alert('변경된 내용이 저장되지 않았습니다.');
    } else {
      this.setState({ focused: pjtCd });

      if (pjtCd === '000') {
        this.setState({
          isPjtCdEditable: true,
          pjtCd: "", pgrCd: 0, pgrNm: "", pjtNm: "",
          prDt: "", toDt: "", progFg: "", apjtNm: "",
          startDt: "", note: ""
        });
      } else {
        PjtService.getSelPjtList(pjtCd, coCd)
          .then((response) => {
            const data = response.data[0];
            const prDt = dayjs(data.prDt).format('YYYY-MM-DD');
            const toDt = dayjs(data.toDt).format('YYYY-MM-DD');
            const startDt = dayjs(data.startDt).format('YYYY-MM-DD');
            console.log("하나 잘 갖고오니?", response.data);

            this.setState({
              isPjtCdEditable: false,
              pjtCd: data.pjtCd, pgrCd: data.pgrCd, pgrNm: data.pgrNm,
              pjtNm: data.pjtNm, prDt: prDt, toDt: toDt,
              progFg: data.progFg, apjtNm: data.apjtNm,
              startDt: data.startDt, note: data.note
            });
          })
          .catch((error) => {
            console.error(error);
            // alert("중복된 회사 또는 모두 입력해주세요");
          });
      }
    }
  }



  //헬퍼코드
  pjthelpClick = () => {
    this.pjtDialogRef.current.handleUp();
  };
  pgrhelpClick = () => {
    this.pgrDialogRef.current.handleUp();
  };
  // 다이얼로그 닫을 때 사용
  closeDialog = () => {
    this.pjtDialogRef.current.handleDown();
    this.pgrDialogRef.current.handleDown();
  }
  // 검색한 다음 텍스트필드 값 변경해주는거 검색한 내용으로
  handleSetPjtTextField = async (data) => {
    await this.setState({
      PjtdialTextField: data.pjtCd + ". " + data.pjtNm,
      pjtCd: data.pjtCd,  //밑에 pjtCd 넘겨주기
    });
  };

  handleSetPgrTextField = async (data) => {
    await this.setState({
      PgrdialTextField: data.pgrCd + ". " + data.pgrNm,
      pgrCd: data.pgrCd  //밑에 pjtCd 넘겨주기
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
  handleCardSelect = (index) => {
    const { selectedCards } = this.state;
    if (selectedCards.includes(index)) {
      // 카드 선택 해제
      this.setState((prevState) => ({
        selectedCards: selectedCards.filter((i) => i !== index),
        selectedCount: prevState.selectedCount - 1,
        selectAllChecked: false, // 개별 체크 해제 시 전체 선택 체크 해제
      }));
    } else {
      // 카드 선택
      this.setState((prevState) => ({
        selectedCards: [...selectedCards, index],
        selectedCount: prevState.selectedCount + 1,
      }));
    }
  };


  handleSelectAllChange = () => {
    const { selectAllChecked, pjtCdList } = this.state;
    if (selectAllChecked) {
      this.setState({
        selectAllChecked: false,
        selectedCards: [],
        selectedCount: 0,
      });
    } else {
      // 모든 카드 선택
      this.setState({
        selectedCount: pjtCdList.length,
        selectAllChecked: true,
        selectedCards: Array.from({ length: pjtCdList.length }, (_, index) => index),
      });
    }
  };

  render() {

    const { pjtCd, progFg, pgrNm, pgrCd, pjtNm, prDt, toDt, apjtNm, startDt, note, pjtRole, isPjtCdEditable } = this.state;
    const { successAlert, showAlert } = this.state;

    const { cardCount, pjtCdList, pjtNmList, pjtPrList, pjtToList, progFgList, selectedProgFg, progFgOptions, searchProgFgOptions } = this.state;
    const { value } = this.state;
    // const currentDate = prDtFormatted;
    const formattedPjtPrList = pjtPrList ? pjtPrList.map(date => dayjs(date).isValid() ? dayjs(date).format('YYYY-MM-DD') : "") : [];
    const formattedpjtToList = pjtToList ? pjtToList.map(date => dayjs(date).isValid() ? dayjs(date).format('YYYY-MM-DD') : "") : [];

    //여기서의 index는 0부터의 index를 뜻하며, 카드추가버튼의 index는 cardCount와 연관


    const cards = pjtCdList.map((pjtCd, index) => (
      <Card
        key={pjtCd}
        ref={this.cardRef}
        focused={this.state.focused === pjtCd}
        sx={{
          width: '100%',
          height: 70,
          position: 'relative',
          border: this.state.focused === pjtCd ? '1px solid rgba(49, 98, 240, 0.9)' : '1px solid #D5D5D5',
          backgroundColor: this.state.focused === pjtCd ? 'rgba(160, 210, 255, 0.2)' : 'white',
        }}>
        <CardActionArea onClick={() => this.cardClick(pjtCd)}>
          <CardContent sx={{ height: 90 }}>
            <Typography sx={{ fontSize: 14 }} gutterBottom style={{ position: 'relative', top: '-3px', left: "-15px" }}>
              <Checkbox
                checked={this.state.selectAllChecked || this.state.selectedCards.includes(index)}
                onChange={() => this.handleCardSelect(index)}
              />
            </Typography>
            <Typography sx={{ fontSize: 14 }} gutterBottom style={{ position: 'relative', top: '-49px', left: "25px" }}>
              {pjtCdList[index]}.{pjtNmList[index]}
            </Typography>
            {/* 날짜 찍는 곳 */}
            <Typography sx={{ fontSize: 10 }} style={{ position: 'relative', left: "25px", bottom: "50px" }} >
              {formattedPjtPrList[index]} ~ {formattedpjtToList[index]} /&nbsp;{progFgList[index]}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ));

    return (
      <>
        <CustomHeaderGridContainer
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item container direction="row" alignItems="center" xs={8}>
            <AssignmentIcon sx={{ fontSize: 31 }} />
            <CustomHeaderInputLabel>프로젝트 등록</CustomHeaderInputLabel>
          </Grid>
          <Grid item container justifyContent="flex-end" xs={4}>
            <ButtonGroup>
              <Button variant="outlined">프로젝트그룹추가</Button>
              {isPjtCdEditable ? (<Button variant="outlined" onClick={this.handleSave}>저장 </Button>
              ) : (
                <Button variant="outlined" onClick={this.handleFix}> 수정</Button>
              )}
              <Button variant="outlined" onClick={this.handleDel}> 삭제 </Button>
            </ButtonGroup>
          </Grid>
        </CustomHeaderGridContainer>

        {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
        <CustomGridContainer
          container
          justifyContent="left"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={4}>
            <Grid container direction="row" alignItems="center">
              <CustomInputLabel sx={{ ml: 4 }}>프로젝트</CustomInputLabel>
              <CustomTextField
                name="PjtTextField"
                value={this.state.PjtdialTextField}
                placeholder="프로젝트코드 "
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <HelpCenterOutlinedIcon onClick={this.pjthelpClick} /></InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Grid container direction="row">
              <CustomInputLabel sx={{ pt: 1 }}>프로젝트구분</CustomInputLabel>
              <Select
                sx={{
                  width: "255px",
                  height: "40px",
                }}
                name="selectedProgFg"
                value={this.state.selectedProgFg}
                onChange={this.handleProgFgChange2}
              >
                {searchProgFgOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Grid container direction="row">
              <CustomInputLabel>프로젝트분류</CustomInputLabel>
              <CustomTextField
                sx={{ mt: -1 }}
                name="PgrTextField"
                value={this.state.PgrdialTextField}
                placeholder="프로젝트그룹코드 "
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <HelpCenterOutlinedIcon onClick={this.pgrhelpClick} /></InputAdornment>
                  ),
                }}
              ></CustomTextField>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Grid container direction="row">
              <CustomInputLabel>프로젝트기간</CustomInputLabel>
              <CustomTextField
                type="date"
                name="dateRange"
                value={this.state.dateRange || ""}
                onChange={this.handlePjt}
                sx={{
                  mt: -1,
                  "& input": {
                    height: "9px",
                  },
                }}
              ></CustomTextField>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <ListDisplay />
          </Grid>
        </CustomGridContainer>
        {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
        <Grid sx={{ position: "relative", display: "flex", width: "100%" }}>
          <Grid
            container
            bgcolor={"#F1F1F1"}
            sx={{
              width: "25%",
              height: 540,
              border: "1px solid #FAFAF5",
            }}
          >
            <Grid
              item
              sx={{
                // pb: 1,
                // mt: 2,
                // mb: 1,
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                width: "100%",
                height: 22,
                backgroundColor: "#F1F1F1",
                borderBottom: "1px solid #F6F6F6",
              }}
            >
              <Checkbox
                checked={this.state.selectAllChecked}
                onChange={this.handleSelectAllChange}
              />
              <InputLabel
                sx={{
                  pt: 0.5,
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >프로젝트:</InputLabel>
              <InputLabel
                sx={{ ml: 0.5, color: "#0054FF", fontWeight: "bold", fontSize: "13px", pt: 0.5, }}
              >
                {cardCount}
              </InputLabel>
              <InputLabel
                sx={{
                  fontWeight: "bold",
                  marginRight: "0.5rem", // 간격 조정
                  fontSize: "13px",
                  pt: 0.5,
                }}
              >
                건
              </InputLabel>
              <Divider
                sx={{
                  height: "100%", // 수평 줄의 높이를 조정
                  backgroundColor: "red",
                }}
              />
            </Grid>
            <Grid
              item
              ref={this.cardListRef}
              sx={{
                borderTop: "1px solid #CFCFCF",
                pr: 2, // 우측 여백 추가
                pl: 2,
                width: "95%",
                height: "calc(100% - 5%)",
                overflowY: "auto",
                scrollbarWidth: "thin", // 스크롤바 얇게 설정 (일부 브라우저에서만 동작할 수 있음)
                scrollbarColor: "dark", // 스크롤바 색상 설정 (일부 브라우저에서만 동작할 수 있음)
                "&::-webkit-scrollbar": {
                  width: "6px", // 스크롤바 너비 설정 (웹킷 브라우저 - Chrome, Safari 등)
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "darkgray", // 스크롤바 색상 설정 (웹킷 브라우저 - Chrome, Safari 등)
                  borderRadius: "3px", // 스크롤바 모서리 둥글기 설정 (웹킷 브라우저 - Chrome, Safari 등)
                },
              }}
            >
              {/* 각 카드를 래핑하는 Grid 컨테이너를 추가하여 아래쪽에 스페이싱을 넣습니다 */}
              {cards.map((card, index) => (
                <Grid key={index} item xs={12} sx={{ mb: 1, mt: 1 }}>
                  {card}
                </Grid>
              ))}
            </Grid>


            <Grid
              container
              sx={{ position: "relative", bottom: "px", width: "100%" }}
            >
              <Button
                variant="extended"
                onClick={this.addCardButton}
                sx={{
                  border: "1px solid #D5D5D5",
                  width: "100%",
                  height: "80px",
                  backgroundColor: "white",
                  color: "#5D5D5D",
                  display: "flex",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <AddIcon sx={{ color: "blue" }} />
                추가
              </Button>
            </Grid>
          </Grid>
          {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: "100%",
              maxHeight: 40,
              // borderBottom: "2px solid #000",
              ml: 1,
            }}
          >
            <Grid item>
              <InputLabel
                sx={{
                  ml: 2,
                  mr: 2,
                  mb: 1,
                  textAlign: "left",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 18,
                  borderBottom: "2px solid #000",
                }}
              >
                기본등록사항
              </InputLabel>
            </Grid>

            <Grid container width={"100%"} border={"1px solid #e0e0e0"}>
              <Grid
                item
                xs={2}
                sx={{
                  height: 50,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel >
                  프로젝트코드
                </CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{

                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                }}
              >
                <CustomWideTextField
                  disabled={!this.state.isPjtCdEditable}
                  size="small"
                  sx={{
                    ml: 2,
                    width: "93%",
                    backgroundColor: this.state.isPjtCdEditable ? '#FFEAEA' : 'white', // 배경색 설정
                  }}
                  name="pjtCd"
                  onChange={this.handlePjt}
                  value={pjtCd || ""}
                />
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  height: 50,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel >
                  프로젝트구분
                </CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                }}
                onChange={this.handlePjt}
              >
                <Select
                  sx={{
                    ml: 2,
                    mt: 0.3,
                    width: "405px",
                    height: "40px",
                    backgroundColor: "#FFEAEA",
                  }}
                  name="selectedProgFg"
                  value={this.state.progFg}
                  onChange={this.handleProgFgChange}
                >
                  {progFgOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  height: 50,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel >
                  프로젝트명
                </CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                }}
              >
                <CustomWideTextField
                  size="small"
                  sx={{ ml: 2, backgroundColor: "#FFEAEA", width: "93%" }}
                  name="pjtNm"
                  onChange={this.handlePjt}
                  value={pjtNm || ""}
                />
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  height: 50,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel >
                  프로젝트약칭
                </CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                }}
              >
                <CustomWideTextField
                  size="small"
                  sx={{ ml: 2, width: "93%" }}
                  name="apjtNm"
                  onChange={this.handlePjt}
                  value={pjtNm || ""}
                />
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  height: 50,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel>
                  프로젝트분류
                </CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                }}
              >
                <CustomWideTextField
                  name="pgrCd"
                  onChange={this.handlePjt}
                  value={pgrCd || ""}
                  placeholder="프로젝트그룹코드"
                />
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  height: 50,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel >
                  사용권한설정
                </CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                }}
              >
                <CustomWideTextField
                  size="small"
                  sx={{ ml: 2, width: "93%" }}
                  name="pjtRole"
                  onChange={this.handlePjt}
                  value={pjtRole || ""}
                />
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  height: 50,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel >
                  프로젝트기간
                </CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                }}
              >
                <Grid item xs={5} >
                  <CustomWideTextField
                    type="date"
                    name="prDt"
                    value={dayjs(prDt).format("YYYY-MM-DD")}
                    onChange={this.handlePjt}
                  ></CustomWideTextField>
                </Grid>
                <Grid item xs={1} sx={{ pl: 4.1 }}>
                  ~
                </Grid>
                <Grid item xs={5} sx={{ ml: 0.7 }}>
                  <CustomWideTextField
                    type="date"
                    name="toDt"
                    value={dayjs(toDt).format("YYYY-MM-DD")}
                    onChange={this.handlePjt}
                  ></CustomWideTextField>
                </Grid>
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  height: 50,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel >
                  프로젝트시작일
                </CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                  width: "100%",
                }}
              >
                <CustomWideTextField
                  type="date"
                  name="startDt"
                  value={dayjs(startDt).format("YYYY-MM-DD")}
                  onChange={this.handlePjt}
                  sx={{
                    ml: 2,
                    width: "100%",
                    mr: 2,
                    "& input": {
                      height: "9px",
                    },
                  }}
                ></CustomWideTextField>
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  height: 50,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                  backgroundColor: "#FCFCFC",
                }}
              >
                <CustomInputLabel >비고</CustomInputLabel>
              </Grid>
              <Grid
                item
                xs={10}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #D8D8D8",
                  borderRight: "1px solid #EAEAEA",
                }}
              >
                <CustomWideTextField
                  size="small"
                  sx={{ ml: 2, width: "80%" }}
                  name="note"
                  value={note || ''}
                  onChange={this.handlePjt}
                  placeholder="프로젝트 관련 비고 입력"
                />
              </Grid>
            </Grid>
          </Grid>
          {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
        </Grid > {/*  전체화면 닫는 곳*/}
        <Grid
          container
          sx={{
            position: 'fixed', // 네비게이션 바를 고정 위치로 설정합니다.
            bottom: 0, // 아래쪽에 위치합니다.
            zIndex: 100, // 다른 요소 위에 나타나도록 z-index를 설정합니다.
            width: '100%',
            padding: '10px 0',
            borderTop: '1px solid #ccc',
            backgroundColor: 'white',
            transition: 'bottom 0.3s', // 슬라이드 효과를 위한 transition을 추가합니다.
          }}
          justifyContent="space-between"
        >
          <Grid item xs={5}>
            {this.state.selectedCount > 0 && (
              <InputLabel>
                선택됨:<span style={{ color: 'red', fontWeight: 'bold' }}>&nbsp;{this.state.selectedCount}</span>
                건
              </InputLabel>
            )}
          </Grid>
          <Grid item xs={6} align="right" style={{ position: 'relative', right: "300px" }}>
            {this.state.selectedCount > 0 && (
              <Button
                variant="outlined"
                onClick={this.handleDeleteSelected}
              >
                삭제
              </Button>
            )}
          </Grid>
        </Grid>
        <PjtDialogComponent handleSetPjtTextField={this.handleSetPjtTextField} ref={this.pjtDialogRef} />
        <PgrDialogComponent handleSetPgrTextField={this.handleSetPgrTextField} ref={this.pgrDialogRef} />
        {/* <div>
          <div className={`alert-container ${successAlert ? 'show' : ''}`}>
            <Alert variant="filled" severity="success">
              삭제되었습니다
            </Alert>
          </div>
        </div> */}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
  userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
});

export default connect(mapStateToProps)(PjtComponent);