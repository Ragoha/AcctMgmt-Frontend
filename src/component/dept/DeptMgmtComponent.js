import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { Box, Button, Divider, IconButton, InputLabel, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import React, { Component } from 'react';


class DeptMgmtComponent extends Component {
    constructor(props) {
        super(props);
        this.coDialogRef = React.createRef();
        this.addrRef = React.createRef();
        this.state = {
            open: false,

        }
    }


    render() {
        const { open, coCd, divCd, toNb, coNm, jongmok, businessType, ceoNm, coNb, coZip, coAddr, coAddr1, openAddr, gisu } = this.state;
        const { selectedRow } = this.state;
        const { data } = this.state;
        const { cardCount, coCdList, coNmList } = this.state;

        const topCompany = [
            { label: 'Samsung', year: 1987 },
            { label: 'Douzone', year: 1994 },
            { label: 'LG', year: 1980 },
            { label: 'SKT', year: 2000 },
        ];

        return (
            <>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <ListIcon fontSize="large" />
                    </Grid>
                    <Grid item>
                        <span>부서관리</span>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 1 }} />

                <Grid container
                    justifyContent="left"
                    sx={{ minHeight: 50, border: '1px solid #EAEAEA', mb: '10px' }}>
                    <InputLabel sx={{ fontWeight: 'bold', ml: 3 }}>회사</InputLabel>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={topCompany}
                        sx={{ width: '20%', backgroundColor: 'white' }}
                        renderInput={(params) => <TextField {...params} label="회사를 선택하세요" />}
                    />

                    <InputLabel sx={{ fontWeight: 'bold', ml: 3 }}>부서</InputLabel>
                    <Paper sx={{ width: '21%', mt: 1, ml: 1, mb: 1, border: '1px solid #000' }}>
                        <InputBase name='CodialTextField' value={this.state.CodialTextField} onChange={this.searchName} sx={{ width: '80%', ml: 1 }} placeholder="부서코드/부서명 검색하세요" />
                        <IconButton type="button" onClick={this.helpClick} >
                            <SearchIcon />
                        </IconButton>

                        <Button variant="outlined" style={{ padding: "0px", minWidth: "5px", position: 'absolute', top: '155px', right: "35px" }}>
                            <SearchIcon fontSize="medium" />
                        </Button>
                    </Paper>
                </Grid>

                <Grid sx={{ width: '100%', minHeight: 700 }}>
                    <Grid sx={{ display: 'flex' }}>
                        <Grid container sx={{ justifyContent: "flex-start", width: '25%', minHeight: 500, border: '1px solid #EAEAEA' }}>

                            <Grid sx={{ width: '100%', height: '88.5%' }}>
                                <Grid sx={{ height: '5%', mt: 2, ml: 2, backgroundColor: '#EAEAEA' }}>
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


                        <Grid container sx={{ ml: 1, width: '75%', height: 630, border: '1px solid #EAEAEA' }}>
                            <Grid container sx={{ width: '100%', maxHeight: 40, borderLeft: '1px solid #000', borderBottom: '1px solid #000' }}>
                                <Grid item xs={2}>
                                    <InputLabel sx={{ ml: 2, mr: 2, mt: 1, textAlign: 'center', color: 'black' }}>기본정보</InputLabel>
                                </Grid>

                                <Grid item xs={7}></Grid>

                                <Grid item xs={1} sx={{ml:108, mr:1}}>
                                    <Button variant="contained">추가</Button>
                                </Grid>

                                <Grid item xs={1} sx={{ mr:1}}>
                                    {coCd ?
                                        <Button variant="outlined" onClick={this.updateCo}>수정</Button>
                                        :
                                        <Button variant="outlined" onClick={this.insertCo}>저장</Button>
                                    }
                                </Grid>

                                <Grid item xs={1} >
                                    <Button variant="outlined" onClick={this.deleteCo}>삭제</Button>
                                </Grid>
                                {/* <Divider sx={{width: '60.8%', border: '1px solid #000', position:'absolute', top:'264px'}}/> */}
                            </Grid>

                            <Grid container sx={{ width: '100%', height: 'calc(100% - 65px)' }}>
                                <Grid container spacing={4}
                                    direction="colummn"
                                    justifyContent="space-evenly"
                                    alignItems="center" sx={{ width: '100%', height: '50px' }}>


                                    <Grid item xs={6} >
                                        <Grid container direction="row"
                                            justifyContent="center"
                                            alignItems="center" sx={{ borderBottom: '1px solid #EAEAEA', height: 50 }}>
                                            <InputLabel sx={{ textAlign: 'center', color: 'black', marginRight: "10px" }} >회사</InputLabel>
                                            <TextField size='small' sx={{ backgroundColor: '#FFA7A7' }} name='coCd' onChange={this.handleCompany} value={coCd || ''} InputProps={{ readOnly: true }}></TextField>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} >
                                        <Grid container direction="row"
                                            justifyContent="center"
                                            alignItems="center" sx={{ borderBottom: '1px solid #EAEAEA', height: 50 }}>
                                            <InputLabel sx={{ textAlign: 'center', color: 'black', marginRight: "10px" }}  >사업장코드</InputLabel>
                                            <TextField size='small' name='divCd' sx={{ mr: 3.7, backgroundColor: '#FFA7A7' }} onChange={this.handleCompany} value={divCd || ''}></TextField>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} >
                                        <Grid container direction="row"
                                            justifyContent="center"
                                            alignItems="center" sx={{ borderBottom: '1px solid #EAEAEA', height: 50 }}>
                                            <InputLabel sx={{ textAlign: 'center', color: 'black', marginRight: "10px" }}>부서코드</InputLabel>
                                            <TextField size='small' name='coNm' sx={{ backgroundColor: '#FFA7A7'}} onChange={this.handleCompany} value={coNm || ''}></TextField>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6} >
                                        <Grid container direction="row"
                                            justifyContent="center"
                                            alignItems="center" sx={{ borderBottom: '1px solid #EAEAEA', height: 50 }}>
                                            <InputLabel sx={{ textAlign: 'center', color: 'black', marginRight: "10px" }}  >부서명</InputLabel>
                                            <TextField size='small' name='ceoNm' onChange={this.handleCompany} value={ceoNm || ''}></TextField>
                                        </Grid>
                                    </Grid>


                                    <Grid item xs={6} >
                                        <Grid container direction="row"
                                            justifyContent="center"
                                            alignItems="center" sx={{ height: 15 }}>
                                            <InputLabel sx={{ textAlign: 'center', color: 'black', mr: 2.2, ml: 3 }}  >부서주소</InputLabel>
                                            <TextField id="coZip" size='small' name="coZip" onChange={this.handleCompany} value={coZip || ''} InputProps={{ readOnly: true }}
                                                sx={{
                                                    width: '150px', mr: 0.2 // 원하는 가로 크기를 지정 '기본크기는 약 222px'
                                                }}></TextField> <Button sx={{ direction: "row", justifyContent: "center", alignItems: "center", mt: 0.2, ml: 0.2 }} variant="outlined" onClick={this.addrButton}>우편번호</Button>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6}></Grid>

                                    <Grid item xs={12} >
                                        <Grid container direction="row"
                                            justifyContent="center"
                                            alignItems="center" sx={{ height: 15 }}>
                                            <InputLabel ></InputLabel>
                                            <TextField sx={{ width: '400px', mr: 21 }} id="coAddr" name="coAddr" size='small' onChange={this.handleCompany} value={coAddr || ''} InputProps={{ readOnly: true }}></TextField>
                                        </Grid>
                                    </Grid>

                                    {/* <Grid item xs={6}></Grid> */}

                                    <Grid item xs={12} >
                                        <Grid container direction="row"
                                            justifyContent="center"
                                            alignItems="center" sx={{ borderBottom: '1px solid #EAEAEA' }}>
                                            <InputLabel ></InputLabel>
                                            <TextField sx={{ width: '400px', mr: 21 }} name="coAddr1" size='small' onChange={this.handleCompany} value={coAddr1 || ''} ></TextField>
                                        </Grid>
                                    </Grid>

                                    {/* <Grid item xs={6}></Grid> */}

                                    {/* <Grid item xs={8} >
                  <Grid container direction="row"
                    justifyContent="center"
                    alignItems="center" sx={{ borderBottom: '1px solid #EAEAEA', mr: 5 }}>
                    <InputLabel sx={{ textAlign: 'center', color: 'black', mr: 3 }}  >회계기수</InputLabel>
                    <InputLabel name='gisu'>{gisu}</InputLabel>
                    <InputLabel sx={{ textAlign: 'right', mr: 1 }}>기</InputLabel>
                    <TextField name='dateRange' value={this.state.dateRange} size='small' InputProps={{ readOnly: true }}></TextField>
                    <Button size="medium" sx={{ direction: "row", justifyContent: "center", alignItems: "center", ml: 0.5, mt: 0.5 }} variant="outlined" onClick={this.handleGisu}>
                      기수등록
                    </Button>
                  </Grid>
                </Grid>

                <Dialog open={open} PaperProps={{ sx: { width: 500, height: 600 } }}>
                  <DialogTitle sx={{ backgroundColor: '#7895CB', color: 'white', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 60 }}>
                    회계기수 등록
                    <IconButton size='small' sx={{ ml: 36 }} onClick={() => this.setState({ open: false })}>
                      <CloseIcon fontSize='medium' sx={{ color: 'white' }} />
                    </IconButton>
                    <Divider sx={{ border: '1px solid #EAEAEA' }} />
                  </DialogTitle>
                  <DialogContent >

                    <Grid container direction="column" alignItems="flex-end">
                      <Button sx={{ mt: 1, mb: 1 }} variant="outlined" >삭제</Button>
                    </Grid>

                    <Divider sx={{ border: '1px solid #EAEAEA', mb: 3 }} />

                    <Grid style={{ height: 350, width: '100%' }} > */}
                                    {/* <DataGrid sx={{ borderTop: '2px solid #000' }}
                        rows={data.rows} columns={data.columns}
                        showColumnVerticalBorder={true}
                        showCellVerticalBorder={true} // 각 셀마다 영역주기
                        processRowUpdate={this.processRowUpdate} //-> 이거 해봐야함
                        onRowClick={this.handleClickRow}
                        hideFooter
                      /> */}
                                    {/* </Grid>

                  </DialogContent>
                  <Divider />
                  <DialogActions>
                    <Grid container sx={{ mr: 22 }}>
                      <Button variant="outlined" onClick={()=> this.insertDate(selectedRow)}
                        sx={{
                          backgroundColor: '#4A55A2', color: 'white', mr: 1,
                          "&:hover": {
                            backgroundColor: '#4A55A2'
                          }
                        }}>확인</Button>

                      <Button variant="outlined" onClick={() => this.setState({ open: false })} >취소</Button>
                    </Grid>
                  </DialogActions>
                </Dialog> */}

                                    <Grid item xs={4}>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <AddressComponent setCoZipAddr={this.setCoZipAddr} ref={this.addrRef} />
                <CoDialogComponent handleSetCodialTextField={this.handleSetCodialTextField} ref={this.coDialogRef} /> */}

            </>
        );
    }
}

export default DeptMgmtComponent;