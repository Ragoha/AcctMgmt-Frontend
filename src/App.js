import { Component } from "react";
import Routers from "./router/Routers";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import storeInstance from './store/store'; // store를 가져옵니다.


// Redux & Redux-Thunk test
import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Scrollbars from "react-custom-scrollbars";

// import { Provider } from "react-redux";
// import reducers from "./reducer";

// const store = createStore(reducers);

// const store = createStore(rootReducer, composeWithDevTools());

class App extends Component {

  render() {
    return (
      <Provider store={storeInstance.store}>
        <PersistGate loading={null} persistor={storeInstance.getPersistor()}>
          <Scrollbars style={{ height: "100vh" }}>
            <div className="App">
              <Routers />
            </div>
          </Scrollbars>
        </PersistGate>
      </Provider>
    );
  }
}


export default App;
