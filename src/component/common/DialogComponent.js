import React, { Component } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputLabel, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';


class DialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,

            data: {
                columns: [
                    { field: 'id', headerName: '회사코드', width: 180, headerAlign: 'center' },
                    { field: 'firstName', headerName: '회사명', width: 270, headerAlign: 'center' }
                ],
                rows: [
                    { id: 1, firstName: 'John' },
                    { id: 2, firstName: 'Jane' },
                    { id: 3, firstName: 'Bob' },
                    // Add more rows here...
                ]
            }
        }
    }

    handleUp = () => {
        this.setState({open: true});
    }

    handleDown = () => {
        this.setState({open: false});
    }

    render() {
        const { open ,data } = this.state;

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
              }}
            >
              {this.props.DialogTitle}
              <IconButton
                size="small"
                onClick={() =>
                  this.setState({ open: false, userList: [], searchResult: [] })
                }
              >
                <CloseIcon fontSize="medium" sx={{ color: "white" }} />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box
                sx={{
                  border: "3px solid #EAEAEA",
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                  mb: 1,
                  position: 'relative'
                }}
              >
                <Box mb={2} sx={{ position: 'relative'}}></Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                    mb: 1,
                  }}
                >
                  <InputLabel sx={{ fontWeight: "bold", mr: 1 }}>
                    검색
                  </InputLabel>
                  <TextField
                    id="searchWord"
                    variant="outlined"
                    size="small"
                  ></TextField>
                  <Button
                    variant="outlined"
                    style={{ padding: "0px", minWidth: "5px", position: 'absolute', right: "5px" }}
                  >
                    <SearchIcon fontSize="medium" />
                  </Button>
                </Box>
                <Box mb={1}></Box>
              </Box>
              <Box mb={2}></Box>

              <Divider sx={{ border: "1px solid #EAEAEA" }} />
              <Box sx={{ mt: 1, width: "100%" }}>
                <Box style={{ height: 350, width: "100%" }}>
                  <DataGrid
                    rows={data.rows}
                    columns={data.columns}
                    showColumnVerticalBorder={true}
                    showCellVerticalBorder={true} // 각 셀마다 영역주기
                    hideFooter
                  />
                </Box>
              </Box>
            </DialogContent>
            <Divider />
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
              >
                확인
              </Button>

              <Button
                variant="outlined"
                onClick={() => this.setState({ open: false })}
              >
                취소
              </Button>
            </DialogActions>
          </Dialog>
        );
    }
}
export default DialogComponent;