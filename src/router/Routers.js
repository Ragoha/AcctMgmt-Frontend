import { BrowserRouter } from "react-router-dom";
import UserRouter from "./UserRouter";
import LoginRouter from "./LoginRouter";
import SignUpRouter from "./SignUpRouter";
import ConfigRouter from "./ConfigRouter";

export default function Routers() {
  return (
    <BrowserRouter>
      <UserRouter/>
      <LoginRouter/>
      <SignUpRouter />
      <ConfigRouter />
    </BrowserRouter>
  )
}