import * as MainActions from "../action/MainAction";

const initialStates = {
  header: "",
};

const reducers = (state = initialStates, action) => {
  const { type } = action;
  switch (type) {
    case MainActions.SET_MAIN_HEADER: {
      return {
        ...state,
        header: state.header,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducers;
