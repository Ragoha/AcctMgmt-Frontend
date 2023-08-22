import { AccountCircle } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import React, { Component } from "react";
import Scrollbars from "react-custom-scrollbars";
import { Outlet, useNavigate } from "react-router-dom";
import MainListItems from "./MainListItems";
import UserInfo from "./UserInfo";
import { CustomTextField } from "./style/CommonStyle";
import Image4 from "./back2.jpg";
import SearchComponent from "./SearchComponent";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    // duration: theme.transitions.duration.leavingScreen,
    duration: 300,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth - 1}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      // duration: theme.transitions.duration.enteringScreen,
      duration: 300,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: 300,
      // duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: 300,
        // duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      drawerOpen: true,
      isOnOff: false,
    };
  }

  toggleDrawer = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
      drawerOpen: !prevState.drawerOpen,
    }));
  };

  handleUserInfoClick = () => {
    this.setState((prevState) => ({
      isOnOff: !prevState.isOnOff,
    }));
  };

  handleUserInfoClose = () => {
    this.setState({
      isOnOff: false,
    });
  };
  render() {
    const { open } = this.state;
    const isOnOff = this.state.isOnOff; // 이 부분 추가

    return (
      <ThemeProvider theme={defaultTheme}>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <CssBaseline />

          {/* Header */}
          <AppBar
            position="fixed"
            open={open}
            sx={{
              background: "#4A55A2",
              right: "1px",
              mr: "-1px",
            }}
          >
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={this.toggleDrawer}
                sx={{
                  marginRight: "18px",
                  ...(open && {
                    display: "none",
                  }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                DOUZONE
                {/* <img src="/img/logo.png"></img> */}
              </Typography>
              <IconButton
                color="inherit"
                onClick={
                  isOnOff ? this.handleUserInfoClose : this.handleUserInfoClick
                }
                sx={{
                  position: "relative", // IconButton에 위치 설정 추가
                  right: "30px",
                }}
              >
                <Badge color="secondary">
                  <AccountCircle />
                </Badge>
              </IconButton>
              {isOnOff && (
                <div style={{ mt: "10px" }}>
                  <UserInfo />
                </div>
              )}
              <SearchComponent/>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            open={open}
            PaperProps={{
              style: {
                position: "fixed",
              },
            }}
          >
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
                background: "#7895CB",
              }}
            >
              <IconButton onClick={this.toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <Scrollbars style={{ height: "100vh" }}>
              <List component="nav">
                <MainListItems drawerOpen={this.state.drawerOpen} />
              </List>
            </Scrollbars>
          </Drawer>

          {/* Main */}
          <Box
            sx={{
              pt: 10,
              pl: open ? 32 : 9,
              pr: 2,
              transition: "padding 0.4s",
              // width: "100%",
              // height: "937px",
              // backgroundImage: `url(${Image4})`,
              // backgroundSize: "cover",
              // backgroundRepeat: "no-repeat",
              // backgroundPosition: "center",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}

// ... (중략)

function withNavigation(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

export default withNavigation(MainComponent);
