import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import BudgetComponent from "../component/budget/BudgetComponent"; 
import HeaderComponent from "../component/common/HeaderComponent";
import Count from "../component/Count";
import AsideComponent from "../component/common/AsideComponent";
import CounterContainer from "../component/CounterContainer";
import BudgetInitCarryForwordComponent from "../component/budget/BudgetInitCarryForwordComponent";
import Budget_item_registration from "../component/Budget_item_registration/Budget_item_registration";

class BudgetRouter extends Component {
  render() {
    return (
      <Routes>
        <Route path="/bgt/*" element={<BudgetComponent />}>
          <Route path="Budget_item_registration" element={<Budget_item_registration />}/>
          {/* <Route path="aside" element={<AsideComponent />} /> */}
          <Route path="header" element={<HeaderComponent />} />
          <Route path="test" element={<Count />} />
          <Route path="icor" element={<BudgetInitCarryForwordComponent />} />
        </Route>
        <Route path="/t" element={<CounterContainer />} />
        {/*  */}
      </Routes>
    );
  
  }
}

export default BudgetRouter;