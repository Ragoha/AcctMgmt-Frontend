import { Route, Routes } from "react-router-dom";
import DeptMgmtComponent from "../component/user/DeptMgmtComponent";

export default function UserRouter() {
  return (
    <Routes>
      <Route path="/dept" element={<DeptMgmtComponent />} />
    </Routes>
  );
}