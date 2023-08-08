import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import React, { Component } from 'react';
import PjtService from '../../../service/PjtService';

const columns = [
    { field: 'check', headerName: '', width: 10, headerAlign: 'center' },
    { field: 'pgrCd', headerName: '프로젝트그룹코드', width: 180, headerAlign: 'center' },
    { field: 'pgrNm', headerName: '프로젝트그룹명', width: 286, headerAlign: 'center' }
]

class PjtDialogComponent extends Component {
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
            <Dialog open={open} PaperProps={{ sx: { width: 500, height: 600 } }}>
                <DialogTitle
                    sx={{
                        backgroundColor: "#7895CB",
                        color: "white",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: 60,
                        padding: 2,
                    }}
                >
                    프로젝트그룹코드
                    <IconButton
                        size="small"
                        onClick={() =>
                            this.setState({ open: false })
                        }
                    >
                        <CloseIcon fontSize="medium" sx={{ color: "white" }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ margin: 0, padding: 0 }}>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{
                            maxWidth: "468px",
                            border: "3px solid #EAEAEA",
                            display: "flex",
                            ml: 2,
                            mt: 1,
                            mr: 2,
                            mb: 2,
                            pb: 2,
                        }}
                        position="relative"
                    >
                        <Grid item xs={12}>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <InputLabel sx={{ fontWeight: "bold", mr: 1 }}>
                                    그룹검색어
                                </InputLabel>
                                <TextField
                                    id="keyword"
                                    name="keyword"
                                    value={this.state.keyword}
                                    onChange={this.handleInputChange}
                                    variant="outlined"
                                    size="small"
                                    onKeyDown={this.handlePressEnter}
                                    sx={{
                                        '& input': {
                                            height: '9px',
                                        },
                                    }}
                                ></TextField>
                                <Button
                                    variant="outlined"
                                    style={{
                                        padding: "0px",
                                        minWidth: "5px",
                                        position: "relative",
                                        right: "-46px",
                                    }}
                                >
                                    <SearchIcon
                                        fontSize="medium"
                                        onClick={this.handleSearchPgrDial}
                                    />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        sx={{ height: "364px", maxWidth: "468px", ml: 2, mr: 2 }}
                    >
                        <DataGrid
                            columns={columns}
                            rows={this.state.codialRows}
                            showColumnVerticalBorder={true}
                            showCellVerticalBorder={true} // 각 셀마다 영역주기
                            onRowClick={this.handleClickRow}
                            hideFooter
                            sx={{ borderTop: "3px solid black" }}
                        />
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ margin: 0, padding: 0 }}>
                    <Button
                        variant="outlined"
                        sx={{
                            backgroundColor: "#4A55A2",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "#4A55A2",
                            },
                            mr: 1,
                        }}
                        onClick={this.handleClickConfirm}
                    >
                        확인
                    </Button>
                    <Grid
                        container
                        justifyContent="flex-end"
                        sx={{ maxWidth: "468px", ml: 2, mr: 2, mb: 2 }}
                    >
                        <Button
                            variant="outlined"
                            sx={{
                                backgroundColor: "#4A55A2",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "#4A55A2",
                                },
                                mr: 1,
                            }}
                            onClick={this.handleClickConfirm}
                        >
                            확인
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => this.setState({ open: false })}
                        >
                            취소
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        );
    }
}
export default PjtDialogComponent;