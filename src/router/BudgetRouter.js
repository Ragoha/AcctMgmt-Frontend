import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import BudgetComponent from "../component/budget/BudgetComponent"; 
import AsideComponent from "../component/common/AsideComponent";
import HeaderComponent from "../component/common/HeaderComponent";
import BudgetInitCarryOverRegComponent from "../component/budget/BudgetInitCarryOverRegComponent";
import ParentComponent from "../component/budget/ParentComponent";
import ChildComponent from "../component/budget/ChildComponent";


class BudgetRouter extends Component {
  render() {
    return (
      <Routes>
        <Route path="/btg/*" element={<BudgetComponent />}>
          <Route path="aside" element={<ParentComponent />} />
          <Route path="header" element={<ChildComponent />} />
          <Route path="icor" element={<BudgetInitCarryOverRegComponent/> }/>
        </Route>
      </Routes>
    );
  
  }
}

export default BudgetRouter;