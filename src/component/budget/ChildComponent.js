import React from "react";
import { RecoilRoot } from "recoil";
import ChildComponent from "./ChildComponent";

class ParentComponent extends React.Component {
  render() {
    return (
      <RecoilRoot>
        <h1>Parent Component</h1>
        <ChildComponent />
      </RecoilRoot>
    );
  }
}

export default ParentComponent;
