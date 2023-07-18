import { Route, Routes } from "react-router-dom";
import CoMgmtComponent from "../component/user/CoMgmtComponent";

export default function UserRouter() {
  return (
    <Routes>
      <Route path="/company" element={<CoMgmtComponent />} />
    </Routes>
  );
}