import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import BgtICFService from "../../../service/BgtICFService";
import {
  CustomButtonGridContainer,
  CustomCloseIcon,
  CustomConfirmButton,
  CustomDialogActions,
  CustomDialogContent,
  CustomDialogTitle,
  CustomShortDataGridContainer,
  CustomShortDialog,
  CustomShortFormGridContainer,
} from "../../common/style/CommonDialogStyle";
import {
  CustomAutoComplete,
  CustomDataGrid,
  CustomInputLabel,
  CustomSearchButton,
  CustomTextField,
} from "../../common/style/CommonStyle";
import DeptService from "../../../service/DeptService";

class DeptDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedRow: { deptCd: "", deptNm: "" },
      deptRows: [],
      keyword: "",
      data: {
        columns: [
          {
            field: "deptCd",
            headerName: "부서코드",
            width: 180,
            headerAlign: "center",
          },
          {
            field: "deptNm",
            headerName: "부서명",
            width: 270,
            headerAlign: "center",
          },
        ],
      },
      use: "",
      useText: "전체",
    };
  }

  initDeptDialog = (keyword) => {
    this.setState({ keyword: "", divRows: [] });
    this.handleClickSearchIcon();

    this.handleUp();
  };



  handleUp = () => {
    this.setState({ open: true });
  };

  handleDown = () => {
    this.setState({ open: false, keyword: "", divRows: [] });
  };

  handleClickRow = (params) => {
    console.log(params);
    this.setState({ selectedRow: params.row }, () => {
      console.log(this.state.selectedRow);
    });
    // console.log(this.state);
  };

  setDivRows = async (rows) => {
    await this.setState({ divRows: rows });
  };

  handleClickConfirm = () => {
    console.log(this.state.selectedRow);
    this.handleDown();
    this.props.SetMgtTextField({
      mgtCd: this.state.selectedRow.deptCd,
      mgtNm: this.state.selectedRow.deptNm,
    });
  };

  handleInputChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    console.log(this.state);
  };

  handleClickSearchIcon = () => {
    BgtICFService.findDeptByCoCdAndKeyword({
      coCd: this.props.user.coCd,
      keyword: this.state.keyword,
      accessToken: this.props.accessToken,
    }).then(async (response) => {
      console.log(response);
      const deptRows = response.map((row) => ({
        id: row.deptCd,
        deptCd: row.deptCd,
        deptNm: row.deptNm,
      }));
      await this.setState({ deptRows: deptRows });
      console.log(this.state);
    });
  };

  handleChangeUseText = (event, newValue) => {
    console.log(newValue);
    this.setState({ use: newValue.value, useText: newValue.label });
  };

  render() {
    const { open, data } = this.state;

    return (
      <CustomShortDialog open={open}>
        <CustomDialogTitle>
          부서 검색
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
                // sx={{
                //   "> .MuiAutocomplete-popper": {
                //     maxHeight: "200px !important",
                //   },
                // }}
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
                  sx={{
                    mr: 1,
                    width: "205px !important",
                  }}
                />
                <CustomSearchButton variant="outlined" sx={{ right: "-70px" }}>
                  <SearchIcon onClick={this.handleClickSearchIcon} />
                </CustomSearchButton>
              </Grid>
            </Grid>
          </CustomShortFormGridContainer>
          <CustomShortDataGridContainer container>
            <CustomDataGrid
              rows={this.state.deptRows}
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

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  DeptDialogComponent
);
