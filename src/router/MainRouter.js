import { Component } from "react";
import { Route, Routes } from "react-router-dom";


import CoMgmtComponent from "../component/mgmt/CoMgmtComponent";
import DeptMgmtComponent from "../component/mgmt/DeptMgmtComponent";
import MainComponent from "../component/common/MainComponent";
import ConfigComponent from "../component/user/ConfigComponent";
import PjtComponent from "../component/user/PjtComponent";
import BgtCD from "../component/bgtcd/BgtCD";
import BgtICFComponent from "../component/bgticf/BgtICFComponent";

class MainRouter extends Component {
  render() {
    return (
      <Routes>
        <Route path="acctmgmt/*" element={<MainComponent />}>
          <Route path="ozt/co" element={<CoMgmtComponent />} />
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