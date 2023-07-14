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
import { Divider } from "@mui/material";

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
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <Divider />
        <ListItemButton onClick={this.handleOrganizationClick}>
          <ListItemIcon>
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText primary="조직관리" />
          {openOrganization ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openOrganization} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{
                pl: this.props.drawerOpen ? 6.7 : 2,
                transition: "padding-left 300ms",
              }}
            >
              <ListItemIcon>
                <ApartmentOutlined />
              </ListItemIcon>
              <ListItemText primary="회사등록" />
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: this.props.drawerOpen ? 6.7 : 2,
                transition: "padding-left 300ms",
              }}
            >
              <ListItemIcon>
                <DomainDisabledIcon />
              </ListItemIcon>
              <ListItemText primary="사업장등록" />
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: this.props.drawerOpen ? 6.7 : 2,
                transition: "padding-left 300ms",
              }}
            >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="부서등록" />
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: this.props.drawerOpen ? 6.7 : 2,
                transition: "padding-left 300ms",
              }}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="프로젝트등록" />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        <ListItemButton onClick={this.handleBudgetClick}>
          <ListItemIcon>
            <PointOfSaleIcon />
          </ListItemIcon>
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
              <ListItemIcon>
                <PlaylistAddIcon />
              </ListItemIcon>
              <ListItemText primary="예산과목등록" />
            </ListItemButton>
            <ListItemButton
              sx={{
                pl: this.props.drawerOpen ? 6.7 : 2,
                transition: "padding-left 300ms",
              }}
            >
              <ListItemIcon>
                <PostAddIcon />
              </ListItemIcon>
              <ListItemText primary="예산초기이월등록" />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="시스템환경설정" />
        </ListItemButton>
        <Divider />
      </List>
    );
  }
}

export default MainListItems;
