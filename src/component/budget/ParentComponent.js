import React from "react";
import { atom, RecoilState, RecoilRoot } from "recoil";

const dataState = atom({
  key: "dataState",
  default: "",
});

class ChildComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSendData = () => {
    const { input } = this.state;
    const { set } = this.props;
    set(dataState, input);
  };

  render() {
    const { input } = this.state;

    return (
      <div>
        <h2>Child Component</h2>
        <input type="text" value={input} onChange={this.handleChange} />
        <button onClick={this.handleSendData}>Send Data to Parent</button>
      </div>
    );
  }
}

class ParentWrapper extends React.Component {
  render() {
    return (
      <RecoilRoot>
        <h1>Parent Component</h1>
        <ChildWrapper />
      </RecoilRoot>
    );
  }
}

class ChildWrapper extends React.Component {
  render() {
    return <ChildComponent set={RecoilState.prototype.set} />;
  }
}

export default ParentWrapper;
