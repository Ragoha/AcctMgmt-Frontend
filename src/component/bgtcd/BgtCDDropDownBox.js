import React from 'react';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import { CustomBtnBgtcd } from '../common/style/CommonStyle';

class BgtCDDropDownBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.funtionList = React.createRef();
  }
  // 기본제공 기능 //
  handleToggle = () => {
    this.setState((prevOpen) => ({
      open: !prevOpen.open,
    }));
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  // 기본제공 기능 end //
  selectFun = (params) => {
    this.handleClose();
    // console.log(event)
    console.log(params.target.name)
    const name = params.target.outerText;
    if (name == "과목분류명등록") {
      this.props.selectBgtCDDropDownBox('BgtCDDevFgCustomOpen')
    }else if(name=="간편검색"){

    }else if(name=="예산과목복사"){
      
    }else if(name=="회계계정과목복사"){
      
    }else if(name=="예산과목엑셀업로드"){
      
    }else if(name=="예산과목일괄설정"){
      
    }
         
  }
  render() {
    return (
      <div>
        <CustomBtnBgtcd
          ref={this.funtionList}
          id="composition-button"
          aria-controls={this.state.open ? 'composition-menu' : undefined}
          aria-expanded={this.state.open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
          variant="primary"
          sx={{border: "1px solid"}}
        >
          기능모음
        <SettingsIcon sx={{ml:'8px'}}/>
        </CustomBtnBgtcd>
        <Popper
          open={this.state.open}
          anchorEl={this.funtionList.current}
          role={undefined}
          placement="bottom-start"
          transition
        //disablePortal // <--- 이 기능을 키면 글씨뺴고 다 투명해져서 꼴 봬기싫어짐
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'right bottom' : 'right top', //리스트 선택?시 등장 모양 
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList
                    autoFocusItem={this.state.open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onClick={this.handleClose} //공통으로 들어가야할 기능 
                  >
                    <MenuItem onClick={this.selectFun}
                    >간편검색</MenuItem>
                    <MenuItem onClick={this.selectFun}
                    >예산그룹등록</MenuItem>
                    <MenuItem onClick={this.selectFun}
                    >예산과목복사</MenuItem>
                    <MenuItem onClick={this.selectFun}
                    >과목분류명등록</MenuItem>
                    <MenuItem onClick={this.selectFun}
                    >회계계정과목복사</MenuItem>
                    <MenuItem onClick={this.selectFun}
                    >예산과목엑셀업로드</MenuItem>
                    <MenuItem onClick={this.selectFun}
                    >예산과목일괄설정</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

export default BgtCDDropDownBox;