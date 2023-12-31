import SearchIcon from "@mui/icons-material/Search"; // 검색 아이콘을 임포트합니다
import { Autocomplete, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Image2 from "./laptop.jpg";

class HomeComponent extends Component {
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
    // console.log(value.length);

    const menuList = this.state.menuList.map((menu) => {
      if (menu.title === value) {
        console.log(menu.link);
        this.props.navigate("/" + menu.link);
      }
    });
  };

  render() {
    const { menuList } = this.state;

    return (
      <div
        style={{
          marginTop: "-16px",
          marginRight: "-16px",
          marginLeft: "-16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)", // 뷰포트 높이만큼 화면을 차지하도록 설정
          backgroundImage: `url(${Image2})`,
          backgroundColor: "#212631",
          backgroundSize: "auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Stack sx={{ width: 500 }}>
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
                  endAdornment: (
                    <SearchIcon sx={{ fontSize: "30px" }} color="action" />
                  ),
                }}
                onChange={(e) => {
                  console.log(e.target.value.length);
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
                sx={{ fontSize: "32px" }}
                onBlur={() => {
                  this.setState({ searchState: false, inputValue: "" });
                }}
              />
            )}
            onChange={this.handleOptionSelect}
            openOnFocus={true}
            sx={{
              "& .MuiInputBase-root": {
                paddingLeft: "15px !important",
                paddingRight: "20px !important",
                borderRadius: "90px",
                bgcolor: "rgba(255, 255, 255, 1)",
                mt: -15,
              },
              "& .MuiInputBase-input": {
                fontSize: "20px",
              },
            }}
          />
        </Stack>
      </div>
    );
  }
}

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

export default withNavigation(HomeComponent);
