import React, { Component } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import DomainDisabledIcon from "@mui/icons-material/DomainDisabled";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import GroupsIcon from '@mui/icons-material/Groups';
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import SettingsIcon from "@mui/icons-material/Settings";
import { ApartmentOutlined } from "@mui/icons-material";
import { Divider, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

class MainListItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openOrganization: true,
      openBudget: true,
      mainHeader: "",
    };
  }

  handleOrganizationClick = () => {
    this.setState((prevState) => ({
      openOrganization: !prevState.openOrganization,
    }));
  };

  handleBudgetClick = () => {
    this.setState((prevState) => ({
      openBudget: !prevState.openBudget,
    }));
  };

  setMainHeader = () => {
    this.setState();
  }

  render() {
    const { openOrganization, openBudget } = this.state;
    const { setStoreMainHeader } = this.props;

    return (
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <Divider />
        <ListItemButton>
          <ListItemIcon>
            <Tooltip
              title={this.props.drawerOpen ? "" : "Home"}
              placement="right"
            >
              <HomeIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <Divider />

        <ListItemButton onClick={this.handleOrganizationClick}>
          <ListItemIcon>
            <Tooltip
              title={this.props.drawerOpen ? "" : "조직관리"}
              placement="right"
            >
              <GroupsIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="조직관리" />
          {openOrganization ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openOrganization} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to={"ozt/co"}>
              <ListItemButton
                sx={{
                  pl: this.props.drawerOpen ? 6.7 : 2,
                  transition: "padding-left 300ms",
                }}
              >
                <ListItemIcon>
                  <Tooltip
                    title={this.props.drawerOpen ? "" : "회사등록"}
                    placement="right"
                  >
                    <ApartmentOutlined />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="회사등록" />
              </ListItemButton>
            </Link>
            <Link to={"ozt/div"}>
              <ListItemButton
                sx={{
                  pl: this.props.drawerOpen ? 6.7 : 2,
                  transition: "padding-left 300ms",
                }}
              >
                <ListItemIcon>
                  <Tooltip
                    title={this.props.drawerOpen ? "" : "사업장등록"}
                    placement="right"
                  >
                    <DomainDisabledIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="사업장등록" />
              </ListItemButton>
            </Link>
            <Link to={"ozt/dept"}>
              <ListItemButton
                sx={{
                  pl: this.props.drawerOpen ? 6.7 : 2,
                  transition: "padding-left 300ms",
                }}
              >
                <ListItemIcon>
                  <Tooltip
                    title={this.props.drawerOpen ? "" : "부서등록"}
                    placement="right"
                  >
                    <GroupIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="부서등록" />
              </ListItemButton>
            </Link>
            <ListItemButton
              sx={{
                pl: this.props.drawerOpen ? 6.7 : 2,
                transition: "padding-left 300ms",
              }}
            >
              <ListItemIcon>
                <Tooltip
                  title={this.props.drawerOpen ? "" : "프로젝트등록"}
                  placement="right"
                >
                  <AssignmentIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="프로젝트등록" />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        <ListItemButton onClick={this.handleBudgetClick}>
          <ListItemIcon>
            <Tooltip title={this.props.drawerOpen ? "" : "예산관리"} placement="right">
              <PointOfSaleIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="예산관리" />
          {openBudget ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openBudget} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to={"bgt/bgtcd"}>
              <ListItemButton
                sx={{
                  pl: this.props.drawerOpen ? 6.7 : 2,
                  transition: "padding-left 300ms",
                }}
              >
                <ListItemIcon>
                  <Tooltip title={this.props.drawerOpen ? "" : "예산과목등록"} placement="right">
                    <PostAddIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="예산과목등록" />
              </ListItemButton>
            </Link>
            <Link to={"bgt/bgticf"}>
              <ListItemButton
                sx={{
                  pl: this.props.drawerOpen ? 6.7 : 2,
                  transition: "padding-left 300ms",
                }}
              >
                <ListItemIcon>
                  <Tooltip
                    title={this.props.drawerOpen ? "" : "예산초기이월등록"}
                    placement="right">
                    <PlaylistAddIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="예산초기이월등록" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
        <Divider />
        <ListItemButton>
            <ListItemIcon>
            <Tooltip title={this.props.drawerOpen ? "" : "시스템환경설정"}
            placement="right">
                <SettingsIcon />
              </Tooltip>
            </ListItemIcon>
          <ListItemText primary="시스템환경설정" />
        </ListItemButton>
        <Divider />
      </List>
    );
  }
}

export default MainListItems;