import { createSlice } from '@reduxjs/toolkit';

export const TOKEN_TIME_OUT = 600 * 1000; //10분

class Auth {
    constructor() {
        //createSlice 를 이용하여 간단하게 redux 액션 생성자와 전체 슬라이스에 대한 reducer를 선언하여 사용할 수 있다.
        this.tokenSlice = createSlice({
            name: 'authToken',
            initialState: {
                //현재 로그인 여부를 간단히 확인하기 위해 선언
                authenticated: false,
                accessToken: null,
                //Access Token 정보를 저장한다.
                expireTime: null
            },
            reducers: {
                //Access Token 정보를 저장한다
                SET_TOKEN: (state, action) => {
                    state.authenticated = true;
                    state.accessToken = action.payload;
                    state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
                },
                //값을 모두 초기화함으로써 Access Token에 대한 정보도 삭제한다.
                DELETE_TOKEN: (state) => {
                    state.authenticated = false;
                    state.accessToken = null;
                    state.expireTime = null
                },
            }
        });
    }

    getActions() {
        return this.tokenSlice.actions;
    }

    getReducer() {
        return this.tokenSlice.reducer;
    }
}

const tokenManager = new Auth();
export const { SET_TOKEN, DELETE_TOKEN } = tokenManager.getActions();
export default tokenManager.getReducer();
