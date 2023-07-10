import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import UserRouter from "./UserRouter";
import BudgetRouter from "./BudgetRouter";

class Routers extends Component {
  render() {
    return (
      <BrowserRouter>
        <UserRouter />
        <BudgetRouter />
      </BrowserRouter>
    );
  }
}

export default Routers;
