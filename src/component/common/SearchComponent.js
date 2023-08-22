import SearchIcon from "@mui/icons-material/Search"; // 검색 아이콘을 임포트합니다
import { Autocomplete, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: [
        { title: "[조직관리] 회사등록", link: "acctmgmt/co" },
        { title: "[조직관리] 사업장등록", link: "acctmgmt/div" },
        { title: "[조직관리] 부서등록", link: "acctmgmt/dept" },
        { title: "[조직관리] 프로젝트등록", link: "acctmgmt/co" },
        { title: "[예산관리] 예산과목등록", link: "acctmgmt/bgtcd" },
        { title: "[예산관리] 예산초기이월등록", link: "acctmgmt/bgticf" },
        { title: "[시스템] 시스템환경설정", link: "acctmgmt/syscfg" },
      ],
      searchState: false,
      inputValue: "",
    };
  }

  handleOptionSelect = (event, value) => {
    const menuList = this.state.menuList.map((menu) => {
      if (menu.title === value) {
        console.log(menu.link);
        this.setState({ inputValue: "", searchState: false });
        this.props.navigate("/" + menu.link);
      }
    });
  };

  render() {
    const { menuList } = this.state;

    return (
      <>
        <Stack spacing={2} sx={{ width: 250 }}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            open={this.state.searchState}
            value={this.state.inputValue}
            inputValue={this.state.inputValue}
            options={menuList.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  endAdornment: (
                    <SearchIcon sx={{ fontSize: "30px" }} color="action" />
                  ),
                }}
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    this.setState({
                      searchState: true,
                      inputValue: e.target.value,
                    });
                  } else {
                    this.setState({
                      searchState: false,
                      inputValue: e.target.value,
                    });
                  }
                }}
                onBlur={() => {
                  this.setState({inputValue: "", searchState:false})
                }}
                sx={{ fontSize: "14px"}}
              />
            )}
            onChange={this.handleOptionSelect}
            openOnFocus={true}
            sx={{
              "& .MuiInputBase-root": {
                paddingTop: "4px !important",
                paddingLeft: "15px !important",
                paddingRight: "20px !important",
                borderRadius: "90px",
                background: "white",
                height: "40px",
              },
              "& .MuiInputBase-input": {
                fontSize: "14px",
              },
            }}
            
          />
        </Stack>
      </>
    );
  }
}

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

export default withNavigation(SearchComponent);
