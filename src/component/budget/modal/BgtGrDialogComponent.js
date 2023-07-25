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
import BgtICFService from "../../../service/BgtICFService";

const columns = [
  {
    field: "bgtGrCd",
    headerName: "예산그룹코드",
    width: 180,
    headerAlign: "center",
  },
  {
    field: "bgtGrNm",
    headerName: "예산그룹명",
    width: 270,
    headerAlign: "center",
  },
];
      
const rows = [
  { id: 1, bgtGrCd: "1", bgtGrNm: "John" },
  { id: 2, bgtGrCd: "2", bgtGrNm: "John" },
  { id: 3, bgtGrCd: "3", bgtGrNm: "John" },
];

class BgtGrDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedRow: { bgtGrCd: "", bgtGrNm: "" },
      divRows: [],
      keyword: "",
      rows: rows,
      columns: columns,
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
  };

  setDivRows = async (rows) => {
    await this.setState({ divRows: rows });
  };

  handleClickConfirm = async () => {
    console.log(this.state.selectedRow);
    this.handleDown();
    // await this.props.setDivTextField(this.state.selectedRow);
  };

  handleInputChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    console.log(this.state);
  };

  handleInitBgtGrRows = () => {
    BgtICFService.findBgtGrCdAndBgtGrNmByCoCd(1);
  }


  render() {
    const { open, columns, rows } = this.state;

    return (
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
          예산그룹검색
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
                id="keyword"
                name="keyword"
                value={this.state.keyword}
                onChange={this.handleInputChange}
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
                style={{
                  padding: "0px",
                  minWidth: "5px",
                  position: "absolute",
                  right: "33px",
                }}
                onClick={() => {
                  console.log("검색");
                }}
              >
                <SearchIcon
                  fontSize="medium"
                  onClick={() => {
                    BgtICFService.findDivCdAndDivNmByKeyword(
                      this.state.keyword
                    ).then(async (response) => {
                      const divRows = response.map((row) => ({
                        id: row.divCd,
                        divCd: row.divCd,
                        divNm: row.divNm,
                      }));
                      await this.setState({ divRows: divRows });
                      console.log(this.state);
                    });
                  }}
                />
              </Button>
            </Box>
            <Box mb={1}></Box>
          </Box>
          <Box mb={2}></Box>
          <Divider sx={{ border: "1px solid #EAEAEA" }} />
          <Box sx={{ mt: 1, width: "100%" }}>
            <Box style={{ height: 350, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
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
export default BgtGrDialogComponent;
