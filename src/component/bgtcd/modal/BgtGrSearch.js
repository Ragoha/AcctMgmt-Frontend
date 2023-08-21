import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Grid,
  IconButton
} from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import { CustomButtonGridContainer, CustomCloseIcon, CustomConfirmButton, CustomDialogActions, CustomDialogContent, CustomDialogTitle, CustomShortDataGridContainer, CustomShortDialog, CustomShortFormGridContainer } from "../../common/style/CommonDialogStyle";
import { CustomDataGrid, CustomInputLabel, CustomSearchButton, CustomTextField } from "../../common/style/CommonStyle";
import BgtCDService from "../../../service/BgtCDService";

class BgtGrSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedRow: { bgtGrCd: "", bgtGrNm: "" },
      bgtGrRows: [],
      keyword: "",
      rows: [],
      columns : [
        { field: "bgtGrCd", headerName: "예산그룹코드", width: 180,  headerAlign: "center",  },
        { field: "bgtGrNm", headerName: "예산그룹명", width: 286, headerAlign: "center",  },
      ]
    };
  }
  componentDidMount(){
    this.initBgtGrSearch();
  }
  initBgtGrSearch=()=>{//처음 다이얼로그를 아무 조건 없이 검색버튼으로 눌렀을때 초기 세팅 
    const{coCd} = this.props.userInfo;
    const{accessToken} = this.props;
    const keyword= null;
    BgtCDService.getinitBgtGrSearch(coCd,keyword,accessToken).then(
      (response)=>this.setState({rows:response},()=>console.log(this.state.rows))
    )
    // this.handleUp();
  }
  /* */
  handleClickRow=(params)=>{
    const text = (params.row.bgtGrCd+"."+params.row.bgtGrNm)
    this.setState({keyword:text},()=>console.log(this.state.keyword))
  }
  handleClickConfirm=()=>{
    this.props.setBgtGrCdText(this.state.keyword);
    this.handleDown();
  }
  setTextFieldAndDataGrid=(bgtGrSearchText)=>{//bgtCd에서 Enter눌렀을때 해당 값을 keyword로 조회해올것
    const{coCd} = this.props.userInfo;
    const{accessToken} = this.props;
    const data ={
      coCd : coCd,
      keyword : bgtGrSearchText,
    }
    this.setState({keyword:bgtGrSearchText}) //여기는 텍스트 필드만 조회해올것, 아래는 데이터 그리드를 조회해서 변경할 것 .
    BgtCDService.getbgtGrSearchKeywordData(data,bgtGrSearchText).then(
      (response)=>{
        this.setState({rows:response})
      }
    )
  }
  handleInputChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    console.log(this.state);
  }
  handlePressEnter=(params)=>{
    const{coCd} = this.props.userInfo;
    const{accessToken} = this.props;
    const keyword = this.state.keyword;
    if (params.code === "Enter") {
      BgtCDService.getinitBgtGrSearch(coCd,keyword,accessToken).then(
        (response)=>this.setState({rows:response},()=>console.log(this.state.rows))
      )
    }
  }
  searchIconClick=()=>{
    const{coCd} = this.props.userInfo;
    const{accessToken} = this.props;
    const keyword = this.state.keyword;
      BgtCDService.getinitBgtGrSearch(coCd, keyword, accessToken).then(
        (response)=>{this.setState({rows:response})}
      )
  }
  /*default*/
  handleUp = () => {
    this.setState({ open: true });
  };

  handleDown = () => {
    this.setState({ open: false });
  };


  render() {
    const { open, columns,keyword} = this.state;

    return (
      <CustomShortDialog open={open}>
        <CustomDialogTitle>
          예산그룹조회
          <IconButton size="small" onClick={this.handleDown}>
            <CustomCloseIcon />
          </IconButton>
        </CustomDialogTitle>
        <CustomDialogContent>
          <CustomShortFormGridContainer
            container
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <CustomInputLabel>검색어</CustomInputLabel>
                <CustomTextField
                  id="keyword"
                  name="keyword"
                  value = {keyword}
                  onChange={this.handleInputChange}
                  variant="outlined"
                  onKeyPress={this.handlePressEnter}
                > </CustomTextField>
               
                <CustomSearchButton variant="outlined" sx={{ right: "-50px" }}>
                  <SearchIcon onClick={this.searchIconClick}/>
                </CustomSearchButton>
              </Grid>
            </Grid>
          </CustomShortFormGridContainer>
          <CustomShortDataGridContainer container>
            <CustomDataGrid
              columns={columns}
              rows={this.state.rows}
              getRowId={(row) => row.bgtGrCd}
              showColumnVerticalBorder={true}
              showCellVerticalBorder={true} // 각 셀마다 영역주기
              onRowClick={this.handleClickRow}
              hideFooter
            />
          </CustomShortDataGridContainer>
        </CustomDialogContent>
        <CustomDialogActions>
          <CustomButtonGridContainer container justifyContent="flex-end">
            <CustomConfirmButton
              variant="outlined"
              onClick={this.handleClickConfirm}
            >
              확인
            </CustomConfirmButton>
            <Button variant="outlined" onClick={this.handleDown}>
              취소
            </Button>
          </CustomButtonGridContainer>
        </CustomDialogActions>
      </CustomShortDialog>
    );
  }
}
const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken,
  userInfo: state.user || {},
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  BgtGrSearch
);
