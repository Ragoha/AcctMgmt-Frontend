import { BrowserRouter } from "react-router-dom";
import UserRouter from "./UserRouter";
import LoginRouter from "./LoginRouter";
import SignUpRouter from "./SignUpRouter";
import BudgetRouter from "./BudgetRouter";

export default function Routers() {
  return (
    <BrowserRouter>
      <BudgetRouter/>
      <UserRouter/>
      <LoginRouter/>
      <SignUpRouter />
    </BrowserRouter>
  )
}