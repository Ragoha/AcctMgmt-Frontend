import { Route, Routes } from "react-router-dom";
import TimeUserComponent from "../component/user/TimeUserComponent";
import ListUserComponent from "../component/user/ListUserComponent";
import LoginComponent from "../component/user/LoginComponent";
import MainComponent from "../component/user/MainComponent";

export default function UserRouter() {
  return (
    <Routes>
      <Route path="/time" element={<TimeUserComponent />} />
      <Route path="/list" element={<ListUserComponent />} />
      {/* <Route path="/Login" element={<LoginComponent />} /> */}
      <Route path="/main" element={<MainComponent />} />
    </Routes>
  );
}