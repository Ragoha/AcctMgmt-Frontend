import { BrowserRouter } from "react-router-dom";
import UserRouter from "./UserRouter";
import LoginRouter from "./LoginRouter";
import SignUpRouter from "./SignUpRouter";
import CompanyRouter from "./CompanyRouter";
import DeptRouter from "./DeptRouter";

export default function Routers() {
  return (
    <BrowserRouter>
      <UserRouter/>
      <CompanyRouter/>
      <DeptRouter/>
      <LoginRouter/>
      <SignUpRouter />
    </BrowserRouter>
  )
}