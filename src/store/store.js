import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'; // Redux Persist 관련 import 추가
import storage from 'redux-persist/lib/storage/session'; // 로컬 스토리지를 사용할 경우

import AuthReducer from './Auth';
import UserReducer from './User';
import boxData from './BgtCDBox';

// root 리듀서 생성
const rootReducer = combineReducers({
    auth: AuthReducer,
    // 다른 리듀서들도 필요한 경우 추가합니다.
    user: UserReducer,
    boxData:boxData,

});

// Redux Persist 구성
const persistConfig = {
    key: 'root', // 스토리지에 저장될 키 값입니다.
    storage, // 로컬 스토리지를 사용합니다.
    // 다른 옵션들도 사용 가능합니다.
    // blacklist: ['auth'], // 저장하지 않을 리듀서를 지정할 수 있습니다.
    // whitelist: ['auth'], // 저장할 리듀서를 지정할 수 있습니다.
};

// Redux Persist가 적용된 루트 리듀서를 생성합니다.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux store 클래스
class Store {
    constructor() {
        // Redux store 생성
        this.store = createStore(persistedReducer, applyMiddleware(thunk));
        // Redux Persist를 적용하여 지속시키는 store를 생성합니다.
        this.persistor = persistStore(this.store);
    }

    // store를 반환하는 메소드
    getStore() {
        return this.store;
    }

    // persistor를 반환하는 메소드
    getPersistor() {
        return this.persistor;
    }
}

const storeInstance = new Store();
export default storeInstance;
