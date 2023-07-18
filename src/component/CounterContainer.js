import { connect, useDispatch, useSelector } from "react-redux";
import Counter from "./Counter";
import { decrease, increase } from "../modules/counter";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);

  const dispatch = useDispatch();

  return (
    <>
      <Counter
        number={number}
        onIncrease={() => dispatch(increase())}
        onDecrease={() => dispatch(decrease())}
      />

      <Link to={"/bgt/header"}>
        <Button>asdf</Button>
      </Link>
    </>
  );
};




export default connect(
  (state) => ({
    number: state.counter.number,
  }),
    {
      increase,
      decrease,
    },

)(CounterContainer);