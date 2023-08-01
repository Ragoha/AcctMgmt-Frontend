import React from 'react';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

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
  testConsole=()=>{
    console.log('메뉴아이템을 눌렀을때 작동하는가 ?')
  }
  // 기본제공 기능 end //
  render() {
    return (
      <div>
        <Button
          ref={this.funtionList}
          id="composition-button"
          aria-controls={this.state.open ? 'composition-menu' : undefined}
          aria-expanded={this.state.open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          기능모음
        </Button>
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
                    onClick={this.testConsole}
                  >
                    <MenuItem onClick={this.handleClose}>간편 검색</MenuItem>
                    <MenuItem onClick={this.handleClose}>에산그룹 등록</MenuItem>
                    <MenuItem onClick={this.handleClose}>예산과목 복사</MenuItem>
                    <MenuItem onClick={this.handleClose}>과목분류명 등록</MenuItem>
                    <MenuItem onClick={this.handleClose}>회계계정과목 복사</MenuItem>
                    <MenuItem onClick={this.handleClose}>예산과목엑셀 업로드</MenuItem>
                    <MenuItem onClick={this.handleClose}>예산과목 일괄설정</MenuItem>
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