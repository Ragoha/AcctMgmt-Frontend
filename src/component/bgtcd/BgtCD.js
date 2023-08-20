import PostAddIcon from "@mui/icons-material/PostAdd";
import SearchIcon from '@mui/icons-material/Search';
import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BgtCDService from "../../service/BgtCDService";
import { SET_GROUPCD } from '../../store/BgtCDStore';
import { CustomGridContainer, CustomHeaderGridContainer, CustomHeaderInputLabel, CustomInputLabel, CustomSearchButton, CustomTextField } from "../common/style/CommonStyle";
import BgtCDDatagrid from "./BgtCDDatagrid";
import BgtCDDetailInfo from "./BgtCDDetailInfo";
import BgtCDDropDownBox from "./BgtCDDropDownBox";
import BgtCDAddSubDialog from "./modal/BgtCDAddSubDialog";
import BgtCDDevFgCustom from "./modal/BgtCDDevFgCustom";
import BgtCDSubSearch from "./modal/BgtCDSubSearch";
import BgtGrSearch from "./modal/BgtGrSearch";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Swal from 'sweetalert2';
import CustomSwal from "../common/CustomSwal";
import SnackBarComponent from "../common/SnackBarComponent";
class BgtCD extends Component {
  constructor(props) {
    super(props);
    this.BgtCDDevFgCustom = React.createRef();
    this.BgtCDAddSubDialog = React.createRef();
    this.BgtDataGrid = React.createRef();
    this.BgtCDDetailInfo = React.createRef();
    this.BgtCDGroupModal = React.createRef();
    this.BgtCDGroupReg = React.createRef();
    this.BgtCDDropDownBox = React.createRef();
    this.BgtCDSubSearch = React.createRef();
    this.BgtGrSearch = React.createRef();
    this.snackBarRef = React.createRef();
    this.state = {
      open: false,
      rows: [],
      bgtGrList: [],
      gisuList: [],
      defaultValue: '',
      bgtGrSearchText: '',
      toDt:dayjs(new Date()).format("YYYY-MM-DD"),
    }
  }

  componentDidMount() {
    this.initSubList();
    this.initGisuList();
    this.setInitRow();
    // this.getDataGridRows();
  }
  /*상단 조건 검색바 start*/
  handleClickSerachButton = () => { // 제일 우측 아이콘을 눌렀을때 검색!!!
    console.log('===handleClickSerachButton===')
    console.log(this.state); //gisuDefaultValue / bgtGrSearchText / bgtCdSearchText
    const { coCd } = this.props.userInfo;
    const gisu = this.state.gisuDefaultValue;
    console.log("최상단 조회 검색시 gisu : " + gisu)
    const keyword = this.state.bgtCdSearchText;
    const groupCd = this.state.bgtGrSearchText;
    if(groupCd ===undefined || groupCd ===null||groupCd===""||gisu ===null||gisu===undefined||gisu===""){
      if(groupCd ===undefined || groupCd ===null||groupCd===""){
        this.snackBarRef.current.handleUp("error", "예산그룹선택필수");
        return null;
      }else if(gisu ===null||gisu===undefined||gisu===""){
        this.snackBarRef.current.handleUp("error", "기수선택필수");
        return null;
      }
      
      
    }
    const { accessToken } = this.props;
    BgtCDService.getSearchData(coCd, gisu, keyword, groupCd, accessToken).then(
      (response) => {
        console.log("response?")
        console.dir(response)
        if (response.data != "") {
          this.setState({ rows: response.data })
        } else {
          this.setState({ rows: [{ dataPath: "수입", bgtCd: " " }, { dataPath: "수출", bgtCd: "  " }] })
        }
      }
    )
  }
  setInitRow() {
    const row = [{ dataPath: "수입", bgtCd: " " }, { dataPath: "수출", bgtCd: "  " }]
    this.setState({ rows: row })
  }
  /* 예산그룹검색쪽  */
  handleBgtGrSearchInputChange = async (event) => {
    console.log('handleBgtGrSearchInputChange')
    const { name, value } = event.target;
    console.log('name : ' + name);
    console.log('value : ' + value);
    this.setState({ [name]: "" });
    await this.setState({ [name]: value });
  }
  handleBgtGrSearchKeyDown = (params) => {
    console.log('bgtGrSearchText...')
    console.log(params)
    const { coCd } = this.props.userInfo;
    const { accessToken } = this.props;
    const keyword = this.state.bgtGrSearchText;
    console.log('keyword? : ' + keyword)
    const data = {
      coCd: coCd,
      keyword: keyword,
    }
    if (params.code === "Enter") {
      this.BgtGrSearch.current.initBgtGrSearch();
    }
  }
  /* 예산과목검색 */
  handleInputChange = async (event) => {
    console.log('handleInputChange')
    const { name, value } = event.target;
    console.log('name : ' + name);
    console.log('value : ' + value);
    this.setState({ [name]: "" });
    await this.setState({ [name]: value }, () => console.log('검색키워드 : ' + this.state.bgtCdSearchText));
  };
  handleKeyDown = (params) => {
    console.log('handleKeyDown에서...')
    console.log(params)
    const { coCd } = this.props.userInfo;
    const keyword = this.state.bgtCdSearchText;
    console.log('keyword? : ' + keyword)
    const data = {
      coCd: coCd,
      keyword: keyword,
    }
    if (params.code === "Enter") {
      this.BgtCDSubSearch.current.getBgtCdLikeSearchDataToRows(data);
    }
  }
  /*--기수 start --*/
  initGisuList = () => {
    const { coCd } = this.props.userInfo;
    const { accessToken } = this.props;
    BgtCDService.getinitGisuList(coCd, accessToken).then((response) => {
      console.log(response)
      const gisuList = [...response.map(item => item.gisu)]
      this.setState({ gisuDefaultValue: gisuList[0] });
      this.setState({ gisuList: gisuList })
    });
  }
  changeGisuValue = async (event, child) => {
    console.log(event)
    const index = child.props['dataindex'];
    await this.setState({ gisuDefaultValue: event.target.value, dataindex: index });
  }
  /*--기수 end --*/


  /*상단 조건 검색바 end  */
  setDetailInfo = (target) => {
    console.log(target)
    this.BgtCDDetailInfo.current.setDetailInfo(target);
  }

  /*데이터그리드 부분 start*/
  getDataGridRows(groupcd) { //groupcd를 받아서 최초의 데이터를 뿌리는 화면 
    const tmpRow = [{ dataPath: "수입", bgtCd: " " }, { dataPath: "수출", bgtCd: "  " }];
    this.setState({ rows: tmpRow })
    // { field: 'bgtCd', headerName: '예산코드', width: 140, headerAlign: 'center', },
    // { field: 'bgtNm', headerName: '예산과목명', width: 250, headerAlign: 'center', },  getRowId={(row) => row.bgtCd}
    const gisu = this.state.gisuDefaultValue;
    console.log('////////////////gisu?:' + gisu)
    console.log(groupcd);
    if (groupcd === undefined) {
      groupcd = "전체"
    }
    console.log('데이터체크')
    const { coCd } = this.props.userInfo;
    const { accessToken } = this.props;
    BgtCDService.getGridData(coCd, groupcd, gisu, accessToken)
      .then(rows => {
        this.setState({ rows });
      }).catch(error => {
        console.error("Error fetching data:", error);
      });
  }

  /*---로우 추가 관련된 메서드 start---*/
  //데이터 그리드에 추가하는 기능
  setClickedData = (dataPath, bgtCd, divFg) => {
    this.setState({ tDataPath: dataPath, tBgtCd: bgtCd, tDivFg: divFg })
  }
  handleRowAdd = () => {
    const { tDataPath, tBgtCd, tDivFg ,bgtGrSearchText,rows} = this.state;
    const { coCd } = this.props.userInfo;
    const { accessToken } = this.props;

    if(tBgtCd===undefined ||tBgtCd===null||tBgtCd===""){
      // CustomSwal.showCommonToast("warning", "예산 추가할 위치를 클릭해주세요"); //showCommonSwal showCommonToast showCommonSwalYn
      CustomSwal.showCommonSwal('warning', '신규 예산품목 추가 위치를 지정해주세요');
      return null;
    }

    if (tDataPath === "수입," || tDataPath === "수출,") {
      //최상단 즉 수입, 수출을 클릭했을때 자기 형제 코드가 있으면 형제 코드의 최댓값을 찾아서 그 밑에 넣을거고 없으면 최초 값으로 쓸거다 
      const data = {
        coCd: coCd,
        gisu: this.state.gisuDefaultValue,
        tDataPath: tDataPath,
        keyword: this.state.bgtCdSearchText
      }
      BgtCDService.checkTopData(data, accessToken) //dataPath ,bgtCd(자동생성) .. [divFg,   parentCd는 필요없음 ]
        .then(data => {
          const bgtCd = data.bgtCd;
          console.log("새로 추가될 로우 데이터 찎어봄 ")
          console.log("bgtCd : " + data.bgtCd + "/ divFg : " + data.divFg + "/dataPath: " + data.dataPath)
          const newRows1 = [
            ...this.state.rows,
            { dataPath: data.dataPath, bgtCd: bgtCd, bgtNm: "", isNew: true, divFg: data.divFg, parentCd: "" },
          ];
          this.setState({ rows: newRows1 }, () => console.log(this.state));
        })
      return null;
    }
    //rows들 중 내가 클릭한 로우를 부모로 갖는 row들 중 가장 마지막 row의 dataPath값을 갖고온 뒤 
    if (rows && rows.length) {
      const matchedRows = rows.filter(row => row.parentCd === tBgtCd);
      if (matchedRows.length) {
        console.log("일치하는 값이 있을때 ")
        const lastRowDataPath = matchedRows[matchedRows.length - 1].dataPath;
        const newDataPath = lastRowDataPath + " "; // " "을 추가합니다.
        this.setState({ tDataPath: newDataPath });
      } else {
        console.log('bgtCd와 일치하는 값이 없을때 ');
        // tBgtCd와 일치하는 parentCd를 갖는 row가 없을 때의 처리를 여기에 추가할 수 있습니다.
        BgtCDService.getDefNmFromBGTCD_TERM(coCd, tDivFg, accessToken).then(async (result) => {
          console.log(result)
          const bbb = tDataPath + "," + result;
          await this.setState({ tDataPath: bbb })
        })
      }
    }
    const bgtCd = this.BgtCDDetailInfo.current.getBgtCd();
    const data = { bgtCd: bgtCd, coCd: coCd, groupCd:bgtGrSearchText ,gisu : this.state.gisuDefaultValue }
    const dataPath = this.state.tDataPath;
    const a = (parseInt(tDivFg) + 1).toString();
    BgtCDService.getAddRowData(data, accessToken)
      .then(data => {
        const bgtCd = data.bgtCd;
        const newRows = [
          ...this.state.rows,
          { dataPath: this.state.tDataPath, bgtCd: bgtCd, bgtNm: "", isNew: true, divFg: a, parentCd: this.state.tBgtCd },
        ];
        this.setState({ rows: newRows });
        this.BgtCDDetailInfo.current.setDetailInfoAfterAddRow(data);
      })
  };
  updateDetailInfo = () => {
    const { accessToken } = this.props;
    const tBgtCd = this.state.tBgtCd
  if(tBgtCd===undefined ||tBgtCd===null||tBgtCd===""){
    this.snackBarRef.current.handleUp("error", "업데이트할 행을 클릭해주세요");
    return null;
  }else{
    let updateData;
    updateData = this.BgtCDDetailInfo.current.getDetailInfo();
    BgtCDService.updateDetailInfo(updateData, accessToken)
      .then(response => {
        this.snackBarRef.current.handleUp("success", "저장되었습니다.");
      }).catch(error => {
        console.error("Error fetching data:", error);
      });

  } 
  }

  //추가된 로우에 데이터를 입력하고 DB로 보내는 메서드
  insertAddRow = async (data) => {
    console.log('BgtCd의 insertAddRow입니다.')
    console.log(data)
    // console.log(this.state.bgtGrSearchText)//groupCd
    const { coCd } = this.props.userInfo;
    const { accessToken } = this.props;
    data.coCd = coCd;
    const detailInfo = this.BgtCDDetailInfo.current.selectData();
    console.log(this.state)
    data.groupCd = this.state.bgtGrSearchText; //bgtGrSearchText
    data.ctlFg = detailInfo.ctlFg;
    data.bgajustFg = detailInfo.bgajustFg;
    data.bizFg = detailInfo.bgajustFg;
    data.toDt = detailInfo.toDt;
    data.bottomFg = detailInfo.bottomFg;
    data.insertId = this.props.userInfo.empId;
    data.gisu = this.state.gisuDefaultValue;
    await BgtCDService.insertAddRow(data, accessToken);
    this.handleClickSerachButton();
  }
  setClickDataPath = (tDataPath) => {
    console.log('dataPath 저장 -setClickDataPath')
    this.setState({ tDataPath: tDataPath })
  }

  initSubList = () => {
    console.log('온거야 ?')
    this.setState({ bgtGrList: [] })
    const { coCd } = this.props.userInfo;
    const { accessToken } = this.props;
    BgtCDService.getBgtGrData(coCd, accessToken)
      .then((response) => {
        const bgtGrList = [...response.map(item => `${item.bgtGrCd}.${item.bgtGrNm}`)];
        this.setState({ bgtGrList: bgtGrList, defaultValue: bgtGrList[0] }, () => console.log(this.state.bgtGrList));
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  changeValue = (event) => { // 변경한 내용을 defaultValue로 설정해주는 함수.

    this.setState({ defaultValue: event.target.value }, () => console.log('바꾼뒤의 값? : ' + this.state.defaultValue));
    this.getDataGridRows(event.target.value);
  }
  /*---로우 추가 관련된 메서드 end---*/



  /*  데이터 그리드 부분 end */
  /* DetailInfo부분 */

  /* 모달창  */
  setText = (data) => {
    this.setState({ bgtCdSearchText: data })

  }
  setBgtGrCdText = (data) => {
    this.setState({ bgtGrSearchText: data })
  }
  /*BgtCDDevFgCustomOpen*/
  BgtCDDevFgCustomOpen = () => {
    this.BgtCDDevFgCustom.current.handleUp();
  }
  BgtCDAddSubDialogOpen = () => {
    this.BgtCDAddSubDialog.current.handleUp();
  }
  BgtCDGroupRegOpen = () => {
    this.BgtCDGroupReg.current.handleUp();
  }
  BgtGrSearchOpen = () => {
    this.BgtGrSearch.current.handleUp();
  }
  selectBgtCDDropDownBox = (openWhat) => {
    console.log('오픈왓 :' + openWhat) //BgtCDDevFgCustomOpen
    this[openWhat]();
  }
  handleClickBgtCdSerachIcon = () => {
    this.BgtCDSubSearch.current.initBgtCDDialog();
  }


  handleClickSubCodeSearchIcon = () => {
    this.BgtCDAddSubDialog.current.handleUp();
  };
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
    const { rows, ctlFg, bgajustFg, bottomFg, bizFg, prevBgtCd, bgtGrList, gisuList, gisuDefaultValue, defaultValue, toDt } = this.state;
    return (
      <>
        <CustomHeaderGridContainer
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Grid container>
              <PostAddIcon sx={{ fontSize: 31 }} />
              <CustomHeaderInputLabel>예산과목등록
                <CustomSearchButton></CustomSearchButton>
              </CustomHeaderInputLabel>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row">
              <Button
                onClick={this.handleRowAdd}
                variant="outlined"
                style={{
                  marginRight: "8px",
                  //border: "1px solid",
                }}
              >
                예산과목추가
              </Button>
              <BgtCDDropDownBox
                selectBgtCDDropDownBox={this.selectBgtCDDropDownBox}
              />
            </Grid>
          </Grid>
        </CustomHeaderGridContainer>
        <CustomGridContainer
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={3}>
            <Grid container direction="row" alignItems="center">
                <CustomInputLabel> 기수 </CustomInputLabel>
                <Select
                  sx={{ width: "100px" ,height: "40px"}}
                  value={gisuDefaultValue}
                  onChange={this.changeGisuValue}>
                  {gisuList.map((item, index) => (
                    <MenuItem key={index} value={item} dataindex={index}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled={true}
                    name="date"
                    format="YYYY-MM-DD"
                    value={dayjs(toDt)}
                    onChange={this.handleChangeDatePicker}
                    slotProps={{
                      textField: {
                        disabled:true,
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
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="row" alignItems="center">
              <CustomInputLabel>예산그룹</CustomInputLabel>
              <CustomTextField
                name="bgtGrSearchText"
                value={this.state.bgtGrSearchText}
                onChange={this.handleBgtGrSearchInputChange}
                onKeyPress={this.handleBgtGrSearchKeyDown}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon onClick={this.BgtGrSearchOpen} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="row" alignItems="center">
              <CustomInputLabel>예산과목검색</CustomInputLabel>
              <CustomTextField
                name="bgtCdSearchText"
                value={this.state.bgtCdSearchText}
                placeholder="예산과목코드.예산과목명"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyDown}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon onClick={this.handleClickBgtCdSerachIcon} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item>
                <CustomSearchButton
                  variant="outlined"
                  onClick={this.handleClickSerachButton}
                  sx={{ marginLeft: "auto" }}
                >
                  <SearchIcon />
                </CustomSearchButton>
              </Grid>
            </Grid>
          </Grid>
        </CustomGridContainer>
        <Grid container spacing={2} direction="row">
          <Grid item xs={7}>
            <BgtCDDatagrid
              ref={this.BgtDataGrid}
              rows={rows}
              setDetailInfo={this.setDetailInfo}
              insertAddRow={this.insertAddRow}
              getDataGridRows={this.getDataGridRows}
              setClickedData={this.setClickedData}
              setClickDataPath={this.setClickDataPath}
            />
          </Grid>
          <Grid item xs={5}>
            <BgtCDDetailInfo
              ref={this.BgtCDDetailInfo}
              prevBgtCd={prevBgtCd}
              ctlFg={ctlFg}
              bgajustFg={bgajustFg}
              bottomFg={bottomFg}
              bizFg={bizFg}
              updateDetailInfo={this.updateDetailInfo}
            />
            {/*자식컴포넌트에 state를 props로 전달 */}
          </Grid>
        </Grid>
        <BgtCDDevFgCustom ref={this.BgtCDDevFgCustom} />
        <BgtCDAddSubDialog initSubList={this.initSubList} ref={this.BgtCDAddSubDialog} />
        {/*그룹레벨설정 */}
        <BgtCDSubSearch setText={this.setText} ref={this.BgtCDSubSearch} />
        <BgtGrSearch setBgtGrCdText={this.setBgtGrCdText} ref={this.BgtGrSearch} />
        <SnackBarComponent ref={this.snackBarRef}/>
        
      </>
    );

  }
}
const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken, // accessToken이 존재하면 가져오고, 그렇지 않으면 undefined를 반환합니다.
  userInfo: state.user || {}, //  userInfo 정보 매핑해주기..
  //groupcd: state.BgtCDStore || {}

});

const mapDispatchToProps = (dispatch) => {
  return {
    SET_GROUPCD: (response) => dispatch(SET_GROUPCD(response)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BgtCD);