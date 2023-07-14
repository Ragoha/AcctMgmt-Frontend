import { Route, Routes } from "react-router-dom";
import TimeUserComponent from "../component/user/TimeUserComponent";
import BoardDataComponent from "../component/user/BoardDataComponent";
import Budget_item_registration from "../component/Budget_item_registration/Budget_item_registration";
import CoMgmtComponent from "../component/user/CoMgmtComponent";
import ListUserComponent from "../component/user/ListUserComponent";
import LoginComponent from "../component/user/LoginComponent";
import MainComponent from "../component/user/MainComponent";

export default function UserRouter() {
  return (
    <Routes>
      <Route path="/time" element={<TimeUserComponent />} />
      <Route path="/boardData" element={<BoardDataComponent/>}/>
      <Route path="/Budget_item_registration" element={<Budget_item_registration/>}/>
      <Route path="/company" element={<CoMgmtComponent />} />
      <Route path="/list" element={<ListUserComponent />} />
      {/* <Route path="/Login" element={<LoginComponent />} /> */}
      <Route path="/main" element={<MainComponent />} />
    </Routes>
  );
}