import { Component } from "react";
import { connect, useSelector } from "react-redux";

// const number = useSelector((state) => state.counter.number);

class HeaderComponent extends Component {

  render() {
      const { number } = this.props;
    return (
      <>
        { number }헤더입니다.
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  number: state.counter.number,
});



export default connect(mapStateToProps)(HeaderComponent);
