import { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";


import BgtCD from "../component/bgtcd/BgtCD";
import BgtICFComponent from "../component/bgticf/BgtICFComponent";
import MainComponent from "../component/common/MainComponent";
import CoMgmtComponent from "../component/co/CoMgmtComponent";
import DivMgmtComponent from "../component/div/DivMgmtComponent";
import DeptMgmtComponent from "../component/dept/DeptMgmtComponent";
import ConfigComponent from "../component/syscfg/ConfigComponent";
import PjtComponent from "../component/pjt/PjtComponent";

class MainRouter extends Component {
  render() {
    const user = ""; // Assume you have a function to get user info

    return (
      <Routes>
        <Route path="acctmgmt/*" element={<MainComponent />}>
          {/* Only show routes if user has ROLE_ADMIN */}
          {/* {user.role === "ROLE_ADMIN" ? ( */}
            <>
              <Route path="ozt/co" element={<CoMgmtComponent />} />
              <Route path="ozt/div" element={<DivMgmtComponent />} />
              <Route path="ozt/dept" element={<DeptMgmtComponent />} />
              <Route path="bgt/bgtcd" element={<BgtCD />} />
              <Route path="bgt/bgticf" element={<BgtICFComponent />} />
              <Route path="syscfg" element={<ConfigComponent />} />
              <Route path="pjt" element={<PjtComponent />} />
            </>
          {/* ) : ( */}
            // Redirect to the "/" page if user doesn't have ROLE_ADMIN
            {/* <Route path="" element={<Navigate to="/" />} /> */}
          {/* )} */}
        </Route>
      </Routes>
    );
  }
}

export default MainRouter;
