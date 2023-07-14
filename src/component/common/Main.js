import React, { Component } from 'react';
import '../../css/MainComponent.css';
import { Box } from '@mui/material';

class Main extends Component {
  render() {
    return (
      <Box className="root">
        <Box className="menu">
          <ul className="menu-list">
            <li className="menu-item">메뉴 1</li>
            <li className="menu-item">메뉴 2</li>
            <li className="menu-item">메뉴 3</li>
          </ul>
        </Box>
        <Box className="content">
          {/* 메인-서브메뉴에 따른 내용을 추가하세요 */}
        </Box>
      </Box>
    );
  }
}

export default Main;
