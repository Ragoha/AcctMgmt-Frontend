import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './Auth';


export default configureStore({
  reducer: {
      authToken: tokenReducer,
  },
});

// class CustomStore {
//   constructor() {
//     this.store = configureStore({
//       reducer: {
//         authToken: tokenReducer,
//       },
//     });
//   }