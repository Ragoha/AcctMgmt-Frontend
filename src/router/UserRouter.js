import { Route, Routes } from "react-router-dom";
import TimeUserComponent from "../component/user/TimeUserComponent";
import CoMgmtComponent from "../component/user/CoMgmtComponent";

export default function UserRouter() {
  return (
    <Routes>
      <Route path="/time" element={<TimeUserComponent />} />
      <Route path="/company" element={<CoMgmtComponent />} />
    </Routes>
  );
}