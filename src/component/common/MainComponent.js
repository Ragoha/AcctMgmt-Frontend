import React, { Component } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MainListItems from "./MainListItems";
import { AccountCircle } from "@mui/icons-material";
import { Outlet, Route, Routes } from "react-router";
import Scrollbars from "react-custom-scrollbars";
import { DELETE_TOKEN , SET_TOKEN } from '../../store/Auth';
import { connect } from 'react-redux';
import axios from "axios";

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
    width: `calc(100% - ${drawerWidth}px)`,
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
    };
  }


  logout = () => {
    const ACCTMGMT_API_BASE_URL = "http://localhost:8080/acctmgmt";
    const accessToken = this.props.accessToken; // Redux Store에서 토큰 가져오기
    console.log("불러온 엑세스 토큰 : " + accessToken);
    this.props.delAccessToken(accessToken);
    console.log("삭제 후 엑세스 토큰 : " + accessToken);
    // axios.post(ACCTMGMT_API_BASE_URL + '/logouta', {
    // });  
  };

  toggleDrawer = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
      drawerOpen: !prevState.drawerOpen,
    }));
  };

  render() {
    const { open } = this.state;

    return (
      <ThemeProvider theme={defaultTheme}>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <CssBaseline />

          {/* Header */}
          <AppBar position="fixed" open={open}>
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
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <AccountCircle />
                </Badge>
                <div style={{ marginLeft: '15px' }}>
                  <a onClick={this.logout}>LogOut</a>
                </div>
              </IconButton>
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
          <Scrollbars style={{ height: "100vh" }}>
            <Box sx={{ pt: 10, pb: 2, pl: open ? 32 : 9, pr: 2, transition: "padding 0.4s" }}>
              <Outlet />
            </Box>
          </Scrollbars>
        </Box>
      </ThemeProvider>
    );
  }
}

// ... (중략)

const mapStateToProps = (state) => ({
  accessToken: state.auth && state.auth.accessToken,
});

const mapDispatchToProps = (dispatch) => {
  return {
    delAccessToken: (accessToken) => dispatch(DELETE_TOKEN(accessToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
