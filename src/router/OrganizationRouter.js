import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import BudgetComponent from "../component/budget/BudgetComponent"; 

budget
class OrganizationRouter extends Component {
  render() {
    return (
      <Routes>
        <Route path="/ozt/*" element={<BudgetComponent />}>
          {/* <Route path="co" element={<CompanyComponent />} /> */}
          {/* <Route path="div" element={<DivisionComponent />} /> */}
          {/* <Route path="dept" element={<DeptpartmentComponent />} /> */}
          {/* <Route path="pjt" element={<ProjectComponent />} /> */}
        </Route>
      </Routes>
    );
  
  }
}

export default OrganizationRouter;