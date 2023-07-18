import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import BudgetComponent from "../component/budget/BudgetComponent"; 
import DeptMgmtComponent from "../component/mgmt/DeptMgmtComponent";

budget
class OrganizationRouter extends Component {
  render() {
    return (
      <Routes>
        <Route path="/acctmgmt/ozt/*" element={<BudgetComponent />}>
          {/* <Route path="co" element={<CompanyComponent />} /> */}
          {/* <Route path="div" element={<DivisionComponent />} /> */}
          <Route path="/dept" element={<DeptMgmtComponent />} />
          {/* <Route path="pjt" element={<ProjectComponent />} /> */}
        </Route>
      </Routes>
    );
  
  }
}

export default OrganizationRouter;