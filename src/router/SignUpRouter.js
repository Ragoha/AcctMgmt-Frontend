import { Route, Routes } from "react-router-dom";
import SignUpComponent from "../component/user/SignUpComponent.js";

export default function SignUpRouter() {
  return (
    <Routes>
      <Route path="/sign" element={<SignUpComponent />} />
    </Routes>
  );
}