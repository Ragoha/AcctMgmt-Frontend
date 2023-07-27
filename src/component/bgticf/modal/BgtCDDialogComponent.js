import React, { Component } from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputLabel,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BgtICFService from "../../../service/BgtICFService";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const columns = [
  {
    field: "bgtGrCd",
    headerName: "기수",
    width: 50,
    headerAlign: "center",
  },
  {
    field: "bgtGrNm1",
    headerName: "예산그룹",
    width: 180,
    headerAlign: "center",
  },
  {
    field: "bgtGrNm2",
    headerName: "예산과목코드",
    width: 180,
    headerAlign: "center",
  },
  {
    field: "bgtGrNm3",
    headerName: "예산과목명",
    width: 180,
    headerAlign: "center",
  },
  {
    field: "bgtGrNm4",
    headerName: "상위예산과목",
    width: 300,
    headerAlign: "center",
  },
];

const rows = [
  { id: 1, bgtGrCd: "1", bgtGrNm: "John" },
  { id: 2, bgtGrCd: "2", bgtGrNm: "John" },
  { id: 3, bgtGrCd: "3", bgtGrNm: "John" },
];

class BgtCDDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today : new Date(),
      open: false,
      selectedRow: { bgtGrCd: "", bgtGrNm: "" },
      bgtGrRows: [],
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
    this.setState({ selectedRow: params.row }, () => {
      console.log(this.state.selectedRow);
    });
    // console.log(this.state);
  };

  setDivRows = async (rows) => {
    await this.setState({ divRows: rows });
  };

  handleInputChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    console.log(this.state);
  };

  handlePressEnter = (e) => {
    if (e.key === "Enter") {
      this.handleSearchBgtGr();
    }
  };

  handleInitBgtGrRows = () => {
    BgtICFService.findBgtGrCdAndBgtGrNmByCoCd(1);
  };

  handleSearchBgtGr = () => {
    BgtICFService.findBgtGrCdAndBgtGrNmByKeyword(this.state.keyword).then(
      async (response) => {
        const bgtGrRows = response.map((row) => ({
          id: row.bgtGrCd,
          bgtGrCd: row.bgtGrCd,
          bgtGrNm: row.bgtGrNm,
        }));
        await this.setState({ bgtGrRows: bgtGrRows });
        console.log(this.state);
      }
    );
  };

  handleClickConfirm = async () => {
    console.log(this.state.selectedRow);
    this.handleDown();
    await this.props.handleSetBgtGrTextField(this.state.selectedRow);
  };

  componentDidMount() {
    BgtICFService.findBgtGrCdAndBgtGrNmByCoCd(1).then(async (response) => {
      const bgtGrRows = response.map((row) => ({
        id: row.bgtGrCd,
        bgtGrCd: row.bgtGrCd,
        bgtGrNm: row.bgtGrNm,
      }));
      await this.setState({ bgtGrRows: bgtGrRows });
    });
  }

  render() {
    const { open, columns, rows, today } = this.state;

    return (
      <Dialog
        open={true}
        PaperProps={{ sx: { maxWidth: 1500, width: 1500, height: 900 } }}
      >
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
          예산과목검색
          <IconButton
            size="small"
            onClick={() =>
              this.setState({ open: false, userList: [], searchResult: [] })
            }
          >
            <CloseIcon fontSize="medium" sx={{ color: "white" }} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ margin: 0, padding: 0 }}>
          <Grid container>
            <Grid></Grid>
            <Grid></Grid>
          </Grid>
          <Grid
            container
            direction="row"
            spacing={2}
            sx={{
              maxWidth: "1468px",
              border: "3px solid #EAEAEA",
              display: "flex",
              justifyContent: "space-between",
              margin: 2,
              pb: 2,
            }}
          >
            <Grid item xs={4}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <InputLabel sx={{ fontWeight: "bold", mr: 1 }}>
                  과목표시
                </InputLabel>
                <TextField
                  id="keyword"
                  name="keyword"
                  value={this.state.keyword}
                  onChange={this.handleInputChange}
                  variant="outlined"
                  size="small"
                  onKeyDown={this.handlePressEnter}
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
                    onClick={this.handleSearchBgtGr}
                  />
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <InputLabel sx={{ fontWeight: "bold", mr: 1 }}>
                  예산그룹
                </InputLabel>
                <TextField
                  id="keyword"
                  name="keyword"
                  value={this.state.keyword}
                  onChange={this.handleInputChange}
                  variant="outlined"
                  size="small"
                  onKeyDown={this.handlePressEnter}
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
                    onClick={this.handleSearchBgtGr}
                  />
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <InputLabel sx={{ fontWeight: "bold", mr: 1 }}>
                  검색어
                </InputLabel>
                <TextField
                  id="keyword"
                  name="keyword"
                  value={this.state.keyword}
                  onChange={this.handleInputChange}
                  variant="outlined"
                  size="small"
                  onKeyDown={this.handlePressEnter}
                ></TextField>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ pl: "100px" }}
              >
                <InputLabel sx={{ fontWeight: "bold", mr: "8px" }}>
                  범위
                </InputLabel>
                <FormControlLabel
                  control={<Checkbox defaultChecked sx={{ mr: "-10px" }} />}
                  label="기준일"
                  sx={{ mr: "8px" }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="YYYY-MM-DD"
                    slotProps={{
                      textField: {
                        size: "small",
                        sx: { width: "166px", mr: "8px" },
                        inputProps: {
                          sx: { height: "auto" },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
                <FormControlLabel
                  control={<Checkbox sx={{ mr: "-10px" }} />}
                  label="전체"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ height: "619px", maxWidth: "1468px", ml: 2, mr: 2 }}
          >
            <DataGrid
              checkGridSelection
              columns={columns}
              rows={this.state.bgtGrRows}
              showColumnVerticalBorder={true}
              showCellVerticalBorder={true}
              onRowClick={this.handleClickRow}
              hideFooter
              sx={{ borderTop: "3px solid black" }}
            />
          </Grid>
        </DialogContent>
        <DialogActions sx={{ margin: 0, padding: 0 }}>
          <Grid>
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
          </Grid>
        </DialogActions>
      </Dialog>
    );
  }
}
export default BgtCDDialogComponent;
