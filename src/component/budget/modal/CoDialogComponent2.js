import { Box, Button, Divider, InputLabel, TextField } from "@mui/material";
import { Component } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";


class CoDialogComponent extends Component {


  constructor(props) {
      super(props);
    this.state = {
      data: {
        columns: [
          {
            field: "id",
            headerName: "회사코드",
            width: 180,
            headerAlign: "center",
            editable: false,
          },
          {
            field: "firstName",
            headerName: "회사명",
            width: 270,
            headerAlign: "center",
            editable: false,
          },
        ],
        rows: [
          { id: 1, firstName: "John" },
          { id: 2, firstName: "Jane" },
          { id: 3, firstName: "Bob" },
          // Add more rows here...
        ],
      },
    };
  }

  handleClickConfirm = () => {
    alert("asdf");
    this.props.divTF = "asdf";
  }

  render() {
    const { data } = this.state;

    return (
      <>
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
            <InputLabel sx={{ fontWeight: "bold", mr: 1 }}>검색어</InputLabel>
            <TextField
              id="searchWord"
              variant="outlined"
              size="small"
            ></TextField>
            <Button
              variant="outlined"
              style={{ padding: "0px", minWidth: "5px" }}
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
              components={{
                // 페이징과 "rows per page" 텍스트를 숨기는 컴포넌트 오버라이딩
                Pagination: () => null,
                Footer: () => null,
              }}
            />
          </Box>
        </Box>
      </>
    );
  }
}

export default CoDialogComponent;