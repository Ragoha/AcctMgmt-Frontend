import { Route, Routes } from "react-router-dom";
import LoginComponent from "../component/user/LoginComponent";

export default function IndexRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/sign" element={<IndexRouter />} />
    </Routes>
  );
}