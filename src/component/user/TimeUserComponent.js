import { Component } from "react";
import UserService from "../../service/UserService";
import LifeCycleSample from "../LifeCycleSample";




class TimeUserComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: ''
    };
  }

  componentDidMount() {
    UserService.getTime()
      .then((time) => {
        this.setState({ time });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  render() {
    const { time } = this.state;

    return (
      <div>
        TestUserComponent<br/>
        {time && <div>{time}</div>}
      </div>
    );
  }
}

export default TimeUserComponent;