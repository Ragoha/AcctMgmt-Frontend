import { Component } from "react";
import UserService from "../../service/UserService";


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
        <button>시간</button>
        <input type="text" name="abc"></input>
      </div>
    );
  }
}

export default TimeUserComponent;