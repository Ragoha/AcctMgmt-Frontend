import { Route, Routes } from "react-router-dom";
import TimeUserComponent from "../component/user/TimeUserComponent";
import ListUserComponent from "../component/user/ListUserComponent";
import { Component } from "react";


class UserRouter extends Component{
  render(){
    return (
      <Routes>
        <Route path="/user/time" element={<TimeUserComponent />} />
        <Route path="/user/list" element={<ListUserComponent />} />
      </Routes>
    );
  }
}

export default UserRouter;