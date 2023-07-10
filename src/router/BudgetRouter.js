import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import BudgetComponent from "../component/budget/BudgetComponent";


class BudgetRouter extends Component {
  render() {
    return (
      <Routes>
        <Route path="/budget" element={<BudgetComponent />} />
      </Routes>
    );
  
  }
}

export default BudgetRouter;