import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BgtCD from "../component/bgtcd/BgtCD";
import BgtICFComponent from "../component/bgticf/BgtICFComponent";
import MainComponent from "../component/common/MainComponent";
import CoMgmtComponent from "../component/co/CoMgmtComponent";
import DivMgmtComponent from "../component/div/DivMgmtComponent";
import DeptMgmtComponent from "../component/dept/DeptMgmtComponent";
import ConfigComponent from "../component/syscfg/ConfigComponent";
import PjtComponent from "../component/pjt/PjtComponent";
import { connect } from "react-redux";
import HomeComponent from "../component/common/HomeComponent";

class MainRouter extends Component {
  render() {
    const user = ""; // Assume you have a function to get user info

    const defaultRoutes = (
      <>
        <Route path="home" element={<HomeComponent />} />
        <Route path="co" element={<CoMgmtComponent />} />
        <Route path="div" element={<DivMgmtComponent />} />
        <Route path="dept" element={<DeptMgmtComponent />} />
        <Route path="bgtcd" element={<BgtCD />} />
        <Route path="bgticf" element={<BgtICFComponent />} />
        <Route path="syscfg" element={<ConfigComponent />} />
        <Route path="pjt" element={<PjtComponent />} />
      </>
    );

    return (
      <Routes>
        {this.props.user.empAuth === "ROLE_ADMIN" ? (
          <Route path="acctmgmt/*" element={<MainComponent />}>
            {defaultRoutes}
          </Route>
        ) : (
          // Redirect to the "/" page if user doesn't have ROLE_ADMIN
          <Route path="/*" element={<Navigate to="/" />} />
        )}
      </Routes>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user || {},
});

export default connect(mapStateToProps, null)(MainRouter);
