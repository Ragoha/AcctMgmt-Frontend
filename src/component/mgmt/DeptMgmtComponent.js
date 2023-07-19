import React, { Component } from 'react';
import { Box, Button, TextField, Card, CardContent, Typography, CardActionArea, Container, IconButton, InputLabel, Divider, colors } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Unstable_Grid2';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Autocomplete from '@mui/material/Autocomplete';
import UserService from '../../service/UserService';


class DeptMgmtComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,

        }
    }
    

    render() {
        const { open, userList, cardCount } = this.state;
       
        const topCompany = [
            {label: 'Samsung', year: 1987 },
            {label: 'Douzone', year: 1994 },
            {label: 'LG', year: 1980 },
            {label: 'SKT', year: 2000 },
        ];

        return (
            <>
                <Grid sx={{ width: '100%', minHeight: 700, backgroundColor: 'white' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Grid container sx={{ justifyContent: "flex-start", width: '25%', minHeight: 700, backgroundColor: '#EAEAEA' }}>
                            <Grid item xs={12} >
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={topCompany}
                                    sx={{ width: '100%' , backgroundColor:'white'}}
                                    renderInput={(params) => <TextField {...params} label="회사를 선택하세요" />}
                                />
                                {/* <TextField label="회사를 선택하세요"></TextField> */}
                                <Paper
                                    component="form" //이거 필요한가.. 음.. 
                                    sx={{ width: '100%', mt: 1, border: '1px solid #000' }}
                                >
                                    <InputBase
                                        sx={{ width: '83%', ml: 1 }}
                                        placeholder="사업장/부서명을 입력하세요"
                                    // inputProps={{ 'aria-label': 'search' }}
                                    />
                                    <IconButton type="button">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                                {/* aria-label="search" */}
                                <Grid container spacing={2} sx={{ height: '88.5%' }}>
                                    <Grid item sx={{ width: '90%', height: '5%', mt: 2, ml: 2, backgroundColor: 'white' }}>
                                        <InputLabel sx={{ textAlign: 'center' }}>조직도</InputLabel>

                                        <TreeView
                                            aria-label="Company Organization"
                                            defaultCollapseIcon={<ExpandMoreIcon />} //이 부분 margin넣으면 조직도랑 같이 움직임 고쳐야함!!
                                            defaultExpandIcon={<ChevronRightIcon />}
                                            sx={{ height: 500, overflowY: 'auto', mt: 3 }} //flexGrow: 1은 TreeView 컴포넌트가 자동으로 확장될 수? 어디에 필요한거지..
                                        >
                                            <TreeItem nodeId="1" label="회사1">
                                                <TreeItem nodeId="2" label="사업장1" />
                                            </TreeItem>
                                            <TreeItem nodeId="5" label="회사2">
                                                <TreeItem nodeId="10" label="사업장1" />
                                                <TreeItem nodeId="6" label="사업장2">
                                                    <TreeItem nodeId="8" label="임시부서" />
                                                </TreeItem>
                                            </TreeItem>
                                        </TreeView>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>


                        {/* <Box sx={{ width: '25%', minHeight:700 , backgroundColor: '#EAEAEA'}}>
            </Box> */}
                        {/* <Box sx={{ width: '75%', minHeight: 700 , ml: 2, backgroundColor: '#EAEAEA'}}> */}


                        <Grid container sx={{ ml: 1, width: '75%', minHeight: 700, backgroundColor: '#EAEAEA' }}>
                            <Grid item sx={{ width: '100%', height: '30px', backgroundColor: '#EAEAEA' }}>
                            </Grid>
                            <Grid container sx={{ width: '100%', backgroundColor: 'white' }}>
                                <Grid container sx={{ width: '100%', height: '50%', backgroundColor: '#EAEAEA' }}>
                                </Grid>
                                <Grid item xs={2}>
                                    <InputLabel sx={{ mr: 2, mt: 1, textAlign: 'center', color: 'black' }}>기본정보</InputLabel>
                                </Grid>

                                <Grid item xs={7}></Grid>

                                <Grid item xs={1} >
                                    <Button variant="contained">추가</Button>
                                </Grid>

                                <Grid item xs={1} >
                                    <Button variant="outlined">수정</Button>
                                </Grid>

                                <Grid item xs={1} >
                                    <Button variant="outlined">삭제</Button>
                                </Grid>

                            </Grid>

                            <Grid container sx={{ width: '100%', height: 'calc(100% - 200px)' }}>
                                <Grid container spacing={2}
                                    direction="colummn"
                                    justifyContent="space-evenly"
                                    alignItems="center" sx={{ width: '100%', height: '50px' }}>


                                    <Grid item xs={6} >
                                        <Grid container direction="row"
                                            justifyContent="center"
                                            alignItems="center" sx={{ border: '1px solid #000' }}>
                                            <InputLabel sx={{ textAlign: 'center', color: 'black', marginRight: "10px" }} >회사</InputLabel><TextField placeholder='필수입력값' sx={{ backgroundColor: '#FFA7A7' }}></TextField>
                                        </Grid>
                                    </Grid>
                                    {/* <Grid item xs={2} >
                    <InputLabel sx={{ textAlign: 'center', color: 'black' }} >회사코드</InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField placeholder='필수입력값' sx={{ backgroundColor: '#FFA7A7' }}></TextField>
                  </Grid> */}
                                    <Grid item xs={6}></Grid>

                                    <Grid item xs={2}>
                                        <InputLabel sx={{ display: 'flex', justifyContent: 'center', color: 'black' }}>사업장</InputLabel>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField></TextField>
                                    </Grid>

                                    <Grid item xs={6}></Grid>

                                    <Grid item xs={2}>
                                        <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>부서코드</InputLabel>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField ></TextField>
                                    </Grid>
                                    <Grid item xs={6}></Grid>


                                    <Grid item xs={2}>
                                        <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>부서명</InputLabel>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField></TextField>
                                    </Grid>
                                    <Grid item xs={6}></Grid>

                                    <Grid item xs={2}>
                                        <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>회사주소</InputLabel>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField sx={{
                                            width: '150px' // 원하는 가로 크기를 지정 '기본크기는 약 222px'
                                        }}></TextField> <Button sx={{ ml: 2, mt: 1 }} variant="outlined">우편번호</Button>
                                    </Grid>

                                    <Grid item xs={6}></Grid>

                                    <Grid item xs={2}>
                                        <InputLabel></InputLabel>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField sx={{
                                            width: '400px'
                                        }}></TextField>
                                    </Grid>
                                    <Grid item xs={6}></Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                        {/* </Box> */}
                    </Box>
                </Grid>
            </>
        );
    }
}

export default DeptMgmtComponent;