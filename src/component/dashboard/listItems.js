import React, { Component } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import InboxIcon from "@mui/icons-material/Inbox";
import BusinessIcon from "@mui/icons-material/Business";
import DomainDisabledIcon from "@mui/icons-material/DomainDisabled";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
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

  render() {
    const { openOrganization, openBudget } = this.state;

    return (
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <Divider />
        <ListItemButton>
          <Tooltip title={this.props.drawerOpen ? "" : "Home"}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Home" />
        </ListItemButton>
        <Divider />

        <ListItemButton onClick={this.handleOrganizationClick}>
          <Tooltip title={this.props.drawerOpen ? "" : "조직관리"}>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="조직관리" />
          {openOrganization ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openOrganization} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to={"/btg/aside"}>
              <ListItemButton
                sx={{
                  pl: this.props.drawerOpen ? 6.7 : 2,
                  transition: "padding-left 300ms",
                }}
              >
                <Tooltip title={this.props.drawerOpen ? "" : "사업장등록"}>
                  <ListItemIcon>
                    <ApartmentOutlined />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText primary="회사등록" />
              </ListItemButton>
            </Link>
            <Link to={"/btg/header"}>
              <ListItemButton
                sx={{
                  pl: this.props.drawerOpen ? 6.7 : 2,
                  transition: "padding-left 300ms",
                }}
              >
                <Tooltip title={this.props.drawerOpen ? "" : "사업장등록"}>
                  <ListItemIcon>
                    <DomainDisabledIcon />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText primary="사업장등록" />
              </ListItemButton>
            </Link>
            <ListItemButton
              sx={{
                pl: this.props.drawerOpen ? 6.7 : 2,
                transition: "padding-left 300ms",
              }}
            >
              <Tooltip title={this.props.drawerOpen ? "" : "부서등록"}>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="부서등록" />
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: this.props.drawerOpen ? 6.7 : 2,
                transition: "padding-left 300ms",
              }}
            >
              <Tooltip title={this.props.drawerOpen ? "" : "프로젝트등록"}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="프로젝트등록" />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        <ListItemButton onClick={this.handleBudgetClick}>
          <Tooltip title={this.props.drawerOpen ? "" : "예산관리"}>
            <ListItemIcon>
              <PointOfSaleIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="예산관리" />
          {openBudget ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openBudget} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                pl: this.props.drawerOpen ? 6.7 : 2,
                transition: "padding-left 300ms",
              }}
            >
              <Tooltip title={this.props.drawerOpen ? "" : "예산과목등록"}>
                <ListItemIcon>
                  <PostAddIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="예산과목등록" />
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: this.props.drawerOpen ? 6.7 : 2,
                transition: "padding-left 300ms",
              }}
            >
              <Tooltip title={this.props.drawerOpen ? "" : "예산초기이월등록"}>
                <ListItemIcon>
                  <PlaylistAddIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="예산초기이월등록" />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        <ListItemButton>
          <Tooltip title={this.props.drawerOpen ? "" : "시스템환경설정"}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="시스템환경설정" />
        </ListItemButton>
        <Divider />
      </List>
    );
  }
}

export default MainListItems;
