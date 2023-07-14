import { Route, Routes } from "react-router-dom";
import TimeUserComponent from "../component/user/TimeUserComponent";
import ListUserComponent from "../component/user/ListUserComponent";
import BoardDataComponent from "../component/user/BoardDataComponent";
import Budget_item_registration from "../component/Budget_item_registration/Budget_item_registration";

export default function UserRouter() {
  return (
    <Routes>
      <Route path="/time" element={<TimeUserComponent />} />
      <Route path="/list" element={<ListUserComponent />} />
      <Route path="/boardData" element={<BoardDataComponent/>}/>
      <Route path="/Budget_item_registration" element={<Budget_item_registration/>}/>
    </Routes>
  );
}