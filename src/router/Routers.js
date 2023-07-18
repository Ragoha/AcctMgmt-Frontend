import { BrowserRouter } from "react-router-dom";
import UserRouter from "./UserRouter";
import LoginRouter from "./LoginRouter";
import SignUpRouter from "./SignUpRouter";
import BudgetRouter from "./BudgetRouter";
import CompanyRouter from "./CompanyRouter";
import DeptRouter from "./DeptRouter";

export default function Routers() {
  return (
    <BrowserRouter>
      <CompanyRouter />
      <DeptRouter />
      <LoginRouter />
      <BudgetRouter />
      <UserRouter />
      <SignUpRouter />
    </BrowserRouter>
  );
}