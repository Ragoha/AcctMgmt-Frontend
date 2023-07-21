import { Component } from "react";
import Routers from "./router/Routers";
import { Provider } from "react-redux";

// Redux & Redux-Thunk test
import CountComponent from './component/Count';
import { legacy_createStore as createStore } from "redux";
import rootReducer from "./modules";
import { composeWithDevTools } from "redux-devtools-extension";
import Scrollbars from "react-custom-scrollbars";

// import createStore from "./store";
// import reducers from "./reducer";

// const store = createStore(reducers);

const store = createStore(rootReducer, composeWithDevTools());

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Scrollbars style={{ height: "100vh" }}>
          <div className="App">
            <Routers />
          </div>
        </Scrollbars>
      </Provider>
    );
  }
}


export default App;
