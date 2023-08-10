import SearchIcon from '@mui/icons-material/Search';
import { Button, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { Component } from 'react';
import PjtService from '../../../service/PjtService';

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
  CustomDataGrid,
  CustomInputLabel,
  CustomSearchButton,
  CustomTextField,
} from "../../common/style/CommonStyle";

const columns = [
    { field: 'check', headerName: '', width: 10, headerAlign: 'center' },
    { field: 'pgrCd', headerName: '프로젝트그룹코드', width: 180, headerAlign: 'center' },
    { field: 'pgrNm', headerName: '프로젝트그룹명', width: 286, headerAlign: 'center' }
]

class PgrDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,

            selectedRow: { pgrCd: "", pgrNm: "" }, //클릭된 열의 cd와 이름 
            codialRows: [],          //열 배열넣기
            keyword: "",
            rows: [],
            columns: columns
        }
    }

    handleUp = () => {
        this.setState({ open: true });
    }

    handleDown = () => {
        this.setState({ open: false });
    }

    //텍스트필드변화
    handleInputChange = async (e) => {
        const { name, value } = e.target;
        await this.setState({ [name]: value });
        console.log(this.state);
    }
    //엔터키 입력처리
    handlePressEnter = (e) => {
        if (e.key === "Enter") {
            this.handleSearchPgrDial();
        }
    }
    //검색
    handleSearchPgrDial = () => {
        PjtService.getPgrBy(this.state.keyword)
            .then(
                async (response) => {
                    const codialRows = response.map((row) => ({
                        id: row.pgrCd,
                        pgrCd: row.pgrCd,
                        pgrNm: row.pgrNm,
                    }));
                    await this.setState({ codialRows: codialRows });
                    console.log(this.state);
                }
            );
    };

    handleClickConfirm = async () => {
        console.log(this.state.selectedRow);
        this.handleDown();
        await this.props.handleSetCodialTextField(this.state.selectedRow);
    }

    //열 클릭처리
    handleClickRow = (params) => {
        this.setState({ selectedRow: params.row }, () => {
            console.log(this.state.selectedRow);
        });
    }

    render() {
        const { open, columns } = this.state;

        return (
          //버튼 클릭 시 open의 값이 boolean형으로 dialog창 띄움
          <CustomShortDialog open={open}>
            <CustomDialogTitle>
              프로젝트그룹코드
              <IconButton
                size="small"
                onClick={() => this.setState({ open: false })}
              >
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
                    <CustomInputLabel>그룹검색어</CustomInputLabel>
                    <CustomTextField
                      id="keyword"
                      name="keyword"
                      value={this.state.keyword}
                      onChange={this.handleInputChange}
                      variant="outlined"
                      onKeyDown={this.handlePressEnter}
                    />
                    <CustomSearchButton
                      variant="outlined"
                      sx={{ right: "-30px" }}
                    >
                      <SearchIcon onClick={this.handleSearchPgrDial} />
                    </CustomSearchButton>
                  </Grid>
                </Grid>
              </CustomShortFormGridContainer>
              <CustomShortDataGridContainer container>
                <CustomDataGrid
                  columns={columns}
                  rows={this.state.codialRows}
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
                <Button
                  variant="outlined"
                  onClick={() => this.setState({ open: false })}
                >
                  취소
                </Button>
              </CustomButtonGridContainer>
            </CustomDialogActions>
          </CustomShortDialog>
        );
    }
}
export default PgrDialogComponent;