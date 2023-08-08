import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Grid,
  IconButton
} from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import BgtICFService from "../../../service/BgtICFService";
import { CustomButtonGridContainer, CustomCloseIcon, CustomConfirmButton, CustomDialogActions, CustomDialogContent, CustomDialogTitle, CustomShortDataGridContainer, CustomShortDialog, CustomShortFormGridContainer } from "../../common/style/CommonDialogStyle";
import { CustomDataGrid, CustomInputLabel, CustomSearchButton, CustomTextField } from "../../common/style/CommonStyle";

class DivDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedRow: { divCd: "", divNm: "" },
      divRows: [],
      keyword:"",
      data: {
        columns: [
          {
            field: "divCd",
            headerName: "사업장코드",
            width: 180,
            headerAlign: "center",
          },
          {
            field: "divNm",
            headerName: "사업장명",
            width: 286,
            headerAlign: "center",
          },
        ],
      },
    };
  }

  initDivDialog = () => {
    this.setState({keyword : "", divRows: []})
    BgtICFService.findDivByCoCdAndKeyword({
      coCd: this.props.user.coCd,
      accessToken: this.props.accessToken,
    }).then(async (response) => {
      const divRows = response.map((row) => ({
        id: row.divCd,
        divCd: row.divCd,
        divNm: row.divNm,
      }));
      await this.setState({ divRows: divRows });
    });

    this.handleUp();
  }

  handleUp = () => {
    this.setState({ open: true });
  };

  handleDown = () => {
    this.setState({ open: false });
  };

  handleClickRow = (params) => {
    console.log(params);
    this.setState({ selectedRow: params.row }, () => {
      console.log(this.state.selectedRow);
    });
    // console.log(this.state);
  }

  setDivRows = async (rows) => {
    await this.setState({ divRows: rows });
  }

  handleClickConfirm = async () => {
    console.log(this.state.selectedRow);
    this.handleDown();
    await this.props.handleSetDivTextField(this.state.selectedRow);
  }

  handleInputChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    console.log(this.state);
  };

  handleClickSearchIcon = () => {
    BgtICFService.findDivByCoCdAndKeyword({
      coCd: this.props.user.coCd,
      keyword: this.state.keyword,
      accessToken: this.props.accessToken,
    }).then(async (response) => {
      const divRows = response.map((row) => ({
        id: row.divCd,
        divCd: row.divCd,
        divNm: row.divNm,
      }));
      await this.setState({ divRows: divRows });
      console.log(this.state);
    });
  }

  render() {
    const { open, data } = this.state;

    return (
      <CustomShortDialog open={open}>
        <CustomDialogTitle>
          사업장검색
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
            <Grid item>
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
                  value={this.state.keyword}
                  onChange={this.handleInputChange}
                  variant="outlined"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      console.log(`Pressed keyCode ${e.key}`);
                    }
                  }}
                ></CustomTextField>
                <CustomSearchButton variant="outlined" sx={{ right: "-50px" }}>
                  <SearchIcon onClick={this.handleClickSearchIcon} />
                </CustomSearchButton>
              </Grid>
            </Grid>
          </CustomShortFormGridContainer>
          <CustomShortDataGridContainer container>
            <CustomDataGrid
              rows={this.state.divRows}
              columns={data.columns}
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
  user: state.user || {},
});

export default connect(mapStateToProps, null, null, {forwardRef: true}) (DivDialogComponent);