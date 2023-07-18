import { Route, Routes } from "react-router-dom";
import ConfigComponent from "../component/user/ConfigComponent";

export default function UserRouter() {
  return (
    <Routes>
      <Route path="/config" element={<ConfigComponent />} />
    </Routes>
  );
}