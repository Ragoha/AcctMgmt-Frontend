import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Count from "../component/Count";
import CounterContainer from "../component/CounterContainer";

import CoMgmtComponent from "../component/mgmt/CoMgmtComponent";
import DeptMgmtComponent from "../component/mgmt/DeptMgmtComponent";
import MainComponent from "../component/common/MainComponent";
import ConfigComponent from "../component/user/ConfigComponent";

import PjtComponent from "../component/user/PjtComponent";

import BgtCD from "../component/bgtcd/BgtCD";
import BudgetInitCarryForwordComponent from "../component/budget/BudgetInitCarryForwordComponent";


class MainRouter extends Component {
  render() {
    return (
      <Routes>
        <Route path="acctmgmt/*" element={<MainComponent />}>
          <Route path="ozt/co" element={<CoMgmtComponent />} />
          <Route path="ozt/dept" element={<DeptMgmtComponent />} />
          <Route path="bgt/t1" element={<Count />} />
          <Route path="bgt/bgtcd" element={<BgtCD/>} />
          <Route path="bgt/bgticf" element={<BudgetInitCarryForwordComponent />}/>
          <Route path="syscfg" element={<ConfigComponent />} />
          <Route path="pjt" element={<PjtComponent/>} />
        </Route>
        <Route path="/t2" element={<CounterContainer />} />
      </Routes>
    );
  
  }
}

export default MainRouter;