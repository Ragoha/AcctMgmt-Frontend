import React, { Component } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, InputLabel, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Search } from '@mui/icons-material';
const columns = [
{
    field: "groupcd",
    headerName : "코드",
    width:100,
    headerAlign:"center",
    align:"left"
},
{
    field: "bgtNm",
    headerName : "그룹명",
    width:100,
    headerAlign:"center",
    align:"left"
},
{
    field: "bgtCD",
    headerName : "코드",
    width:100,
    headerAlign:"center",
    align:"left"
},

]
class BgtCDEzSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    /* 기본 기능 */
    handleUp = () => {
        this.setState({ open: true });
    }
    handleDown = () => {
        this.setState({ open: false });
    }
    /* 기본 기능 end */


    render() {
        const { open } = this.state;
        return (
            //버튼 클릭 시 open의 값이 boolean형으로 dialog창 띄움
            <Dialog open={true} PaperProps={{ sx: { maxWidth: 1200, width: 1200, height: 840 } }}>
                <DialogTitle
                    sx={{
                        backgroundColor: "#7895CB",
                        color: "white",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: 60,
                    }}
                >
                    그룹코드 간편 검색
                    <IconButton
                        size="small"
                        onClick={() =>
                            this.setState({ open: false, userList: [], searchResult: [] })
                        }
                    >
                        <CloseIcon fontSize="medium" sx={{ color: "white" }} />
                    </IconButton>
                </DialogTitle>
                <Divider />

                {/* 상단 header  */}
                <Grid
                    container
                    direction="row"
                    spacing={2}
                    sx={{
                        maxWidth: "1168px",
                        border: "3px solid #EAEAEA",
                        display: "flex",
                        // justifyContent: "space-between",
                        ml: 2,
                        mt: 1,
                        mr: 2,
                        mb: 2,
                        pb: 2,
                    }}
                >
                    <InputLabel
                    sx={{ fontWeight: "bold", mr: 1 }}
                    >검색어 </InputLabel>
                    <TextField
                    variant="outlined"
                    size="small"
                    ></TextField>
                    <Button
                    variant="outlined"
                    style={{
                      padding: "0px",
                      minWidth: "5px",
                      position: "absolute",
                      right: "25px",
                    }}
                    ><SearchIcon  fontSize="medium"/></Button>
                </Grid>
                {/* header end  */}
                {/* body start */}

                <DataGrid 
                
                >
                </DataGrid>
                {/* body end  */}
                <DialogActions>
                    <Button
                        variant="outlined"
                        sx={{
                            backgroundColor: "#4A55A2",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "#4A55A2",
                            },
                        }}
                        onClick={() => {
                            this.handleDown();
                            this.props.clickDialogConfirmButton();
                        }}
                    >확인</Button>
                    <Button variant="outlined"
                        onClick={this.handleDown}
                    >취소</Button>
                </DialogActions>
            </Dialog>
        );
    }
}
export default BgtCDEzSearch;