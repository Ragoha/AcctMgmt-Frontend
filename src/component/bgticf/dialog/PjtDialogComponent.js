import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Button, Checkbox, FormControlLabel, Grid, IconButton, TextField } from "@mui/material";
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

class PjtDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedRow: { pjtCd: "", pjtNm: "" },
      pjtRows: [],
      keyword: "",
      data: {
        columns: [
          {
            field: "pjtCd",
            headerName: "프로젝트코드",
            width: 180,
            headerAlign: "center",
          },
          {
            field: "pjtNm",
            headerName: "프로젝트명",
            width: 270,
            headerAlign: "center",
          },
        ],
      },
      use: "",
      useText: "전체",
    };
  }

  initPjtDialog = () => {
    this.setState({ keyword: "", divRows: [] });
    BgtICFService.findPjtByCoCdAndKeyword({
      coCd: this.props.user.coCd,
      accessToken: this.props.accessToken,
    }).then(async (response) => {
      const pjtRows = response.map((row) => ({
        id: row.pjtCd,
        pjtCd: row.pjtCd,
        pjtNm: row.pjtNm,
      }));
      await this.setState({ pjtRows: pjtRows });
    });

    this.handleUp();
  };

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
  };

  setDivRows = async (rows) => {
    await this.setState({ divRows: rows });
  };

  handleClickConfirm = () => {
    console.log(this.state.selectedRow);
    this.handleDown();
    this.props.SetPjtTextField(this.state.selectedRow);
  };

  handleInputChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    console.log(this.state);
  };

  handleClickSearchIcon = () => {
    BgtICFService.findPjtByCoCdAndKeyword({
      coCd: this.props.user.coCd,
      keyword: this.state.keyword,
      accessToken: this.props.accessToken,
    }).then(async (response) => {
      console.log(response);
      const pjtRows = response.map((row) => ({
        id: row.pjtCd,
        pjtCd: row.pjtCd,
        pjtNm: row.pjtNm,
      }));
      await this.setState({ pjtRows: pjtRows });
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
          프로젝트 검색
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
                <Autocomplete
                  disableClearable
                  disablePortal
                  options={[
                    { label: "전체", value: "전체" },
                    { label: "완료", value: "완료" },
                    { label: "진행중", value: "진행중" },
                    { label: "미사용", value: "미사용" },
                  ]}
                  // getOptionLabel={(option) => option.label}
                  value={this.state.useText}
                  onChange={this.handleChangeUseText}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: 105 }} />
                  )}
                  sx={{
                    width: 105,
                    "& .MuiInputBase-root": {
                      height: 40,
                      paddingLeft: 1,
                      paddingTop: 0,
                      paddingRight: 0,
                      paddingBottom: 0,
                    },
                    marginRight: 2,
                  }}
                />
                <CustomSearchButton variant="outlined" sx={{ right: "-10px" }}>
                  <SearchIcon onClick={this.handleClickSearchIcon} />
                </CustomSearchButton>
              </Grid>
            </Grid>
          </CustomShortFormGridContainer>
          <CustomShortDataGridContainer container>
            <CustomDataGrid
              rows={this.state.pjtRows}
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
  PjtDialogComponent
);
