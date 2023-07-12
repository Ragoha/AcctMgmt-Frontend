import { Component } from "react";
import UserService from "../../service/UserService";

class GetUserComponent extends Component {
  
  constructor(props){
    super(props);
    this.state={
      user: []
    };
  }

componentDidMount() {
    UserService.getUser()
      .then((user) => {
        this.setState({ user });
    })
      .catch((error) => {
          console.error("Error:", error);
        });
    }

render(){
    const {user} = this.state;

return (
  <div>
          id: {user.id}, <br />
          pw: {user.pw}
  </div>
);}
}

export default GetUserComponent;
