import React, { Component } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputLabel,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

class DivDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedRow: { divCd: "", divNm: "" },
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
            width: 270,
            headerAlign: "center",
          },
        ],
        rows: [
          {id:1, divCd: 1, divNm: "John" },
          {id:2, divCd: 2, divNm: "Jane" },
          {id:3, divCd: 3, divNm: "Bob" },
          // Add more rows here...
        ],
      },
    };
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

  handleClickConfirm = async () => {
    console.log(this.state.selectedRow);
    this.handleDown();
    await this.props.setDivTextField(this.state.selectedRow);
  }

  componentDidMount() {
    
  }

  render() {
    const { open, data } = this.state;

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
          사업장검색
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
            }}
          >
            <Box mb={2}></Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
                mb: 1,
              }}
            >
              <InputLabel sx={{ fontWeight: "bold", mr: 1 }}>검색</InputLabel>
              <TextField
                id="searchWord"
                variant="outlined"
                size="small"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    console.log(`Pressed keyCode ${e.key}`);
                  }
                }}
              ></TextField>
              <Button
                variant="outlined"
                style={{ padding: "0px", minWidth: "5px", position: "absolute", right: "33px" }}
                onClick={() => {
                  console.log("검색");
                }}
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
                rows={this.props.divRows}
                columns={data.columns}
                showColumnVerticalBorder={true}
                showCellVerticalBorder={true} // 각 셀마다 영역주기
                onRowClick={this.handleClickRow}
                components={{
                  // 페이징과 "rows per page" 텍스트를 숨기는 컴포넌트 오버라이딩
                  Pagination: () => null,
                  Footer: () => null,
                }}
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
        </DialogActions>
      </Dialog>
    );
  }
}
export default DivDialogComponent;
