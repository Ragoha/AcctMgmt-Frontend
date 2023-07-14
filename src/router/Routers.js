import { BrowserRouter } from "react-router-dom";
import UserRouter from "./UserRouter";


export default function Routers() {
  return (
    <BrowserRouter>
      <UserRouter/>
    </BrowserRouter>
  )
}