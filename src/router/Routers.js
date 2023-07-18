import { BrowserRouter } from "react-router-dom";
import IndexRouter from "./IndexRouter";
import MainRouter from "./MainRouter";

export default function Routers() {
  return (
    <BrowserRouter>
      <IndexRouter />
      <MainRouter />
    </BrowserRouter>
  )
}