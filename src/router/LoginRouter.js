import { Route, Routes } from "react-router-dom";
import LoginComponent from "../component/user/LoginComponent";

export default function UserRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginComponent />} />
    </Routes>
  );
}