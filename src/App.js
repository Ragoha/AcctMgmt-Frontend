import { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import Routers from "./router/Routers";
import storeInstance from './store/store'; // store를 가져옵니다.


// Redux & Redux-Thunk test

// import { Provider } from "react-redux";
// import reducers from "./reducer";

// const store = createStore(reducers);

// const store = createStore(rootReducer, composeWithDevTools());

class App extends Component {

  render() {
    return (
      <Provider store={storeInstance.store}>
        <PersistGate loading={null} persistor={storeInstance.getPersistor()}>
            <div className="App">
              <Routers />
            </div>
        </PersistGate>
      </Provider>
    );
  }
}


export default App;
