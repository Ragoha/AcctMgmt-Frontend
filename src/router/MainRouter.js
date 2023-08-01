import { Component } from "react";
import { Route, Routes } from "react-router-dom";


import BgtCD from "../component/bgtcd/BgtCD";
import BgtICFComponent from "../component/bgticf/BgtICFComponent";
import MainComponent from "../component/common/MainComponent";
import CoMgmtComponent from "../component/co/CoMgmtComponent";
import DivMgmtComponent from "../component/div/DivMgmtComponent";
import DeptMgmtComponent from "../component/dept/DeptMgmtComponent";
import ConfigComponent from "../component/user/ConfigComponent";
import PjtComponent from "../component/user/PjtComponent";

class MainRouter extends Component {
  render() {
    return (
      <Routes>
        <Route path="acctmgmt/*" element={<MainComponent />}>
          <Route path="ozt/co" element={<CoMgmtComponent />} />
          <Route path="ozt/div" element={<DivMgmtComponent />} />
          <Route path="ozt/dept" element={<DeptMgmtComponent />} />
          <Route path="bgt/bgtcd" element={<BgtCD />} />
          <Route path="bgt/bgticf" element={<BgtICFComponent />} />
          <Route path="syscfg" element={<ConfigComponent />} />
          <Route path="pjt" element={<PjtComponent />} />
        </Route>
      </Routes>
    );
  
  }
}

export default MainRouter;