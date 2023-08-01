import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  TextField
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { Component } from "react";
import { connect } from "react-redux";
import BgtICFService from "../../../service/BgtICFService";

class DivDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedRow: { divCd: "", divNm: "" },
      divRows: [],
      keyword:"",
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
            width: 286.4,
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

  initDivDialog = () => {
    this.setState({keyword : "", divRows: []})
    BgtICFService.findDivByCoCdAndKeyword({
      coCd: this.props.user.coCd,
      accessToken: this.props.accessToken,
    }).then(async (response) => {
      const divRows = response.map((row) => ({
        id: row.divCd,
        divCd: row.divCd,
        divNm: row.divNm,
      }));
      await this.setState({ divRows: divRows });
    });

    this.handleUp();
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

  setDivRows = async (rows) => {
    await this.setState({ divRows: rows });
  }

  handleClickConfirm = async () => {
    console.log(this.state.selectedRow);
    this.handleDown();
    await this.props.handleSetDivTextField(this.state.selectedRow);
  }

  handleInputChange = async (e) => {
    const { name, value } = e.target;
    await this.setState({ [name]: value });
    console.log(this.state);
  };

  handleClickSearchIcon = () => {
    BgtICFService.findDivByCoCdAndKeyword({
      coCd: this.props.user.coCd,
      keyword: this.state.keyword,
      accessToken: this.props.accessToken,
    }).then(async (response) => {
      const divRows = response.map((row) => ({
        id: row.divCd,
        divCd: row.divCd,
        divNm: row.divNm,
      }));
      await this.setState({ divRows: divRows });
      console.log(this.state);
    });
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
            padding: 2,
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
                  검색어
                </InputLabel>
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
                    right: "8px",
                  }}
                >
                  <SearchIcon
                    fontSize="medium"
                    onClick={this.handleClickSearchIcon}
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ height: "371px", maxWidth: "468px", ml: 2, mr: 2 }}
          >
            <DataGrid
              rows={this.state.divRows}
              columns={data.columns}
              showColumnVerticalBorder={true}
              showCellVerticalBorder={true} // 각 셀마다 영역주기
              onRowClick={this.handleClickRow}
              hideFooter
              sx={{ borderTop: "3px solid black" }}
            />
          </Grid>
        </DialogContent>
        <DialogActions sx={{ margin: 0, padding: 0 }}>
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

const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken,
  user: state.user || {},
});

export default connect(mapStateToProps, null, null, {forwardRef: true}) (DivDialogComponent);