import { createSlice } from '@reduxjs/toolkit';

class User {
    constructor() {
        this.userSlice = createSlice({
            name: 'userInfo',
            initialState: {
                coCd:'',
                empId: '',
                empEmail: '',
                divCd: '',
                deptOd: '',
            },
            reducers: {
                SET_USER: (state, action) => {
                    state.coCd = action.payload.coCd;
                    state.empId = action.payload.empId;
                    state.empEmail = action.payload.empEmail;
                    state.divCd = action.payload.divCd;
                    state.deptOd = action.payload.deptOd;
                },
                DEL_USER: (state) => {
                    state.coCd = null;
                    state.empId = null;
                    state.empEmail = null;
                    state.divCd = null;
                    state.deptOd = null;
                },
            }
        });
    }
    getActions() {
        return this.userSlice.actions;
    }

    getReducer() {
        return this.userSlice.reducer;
    }
}
const userManager = new User();
export const { SET_USER, DEL_USER } = userManager.getActions();
export default userManager.getReducer();