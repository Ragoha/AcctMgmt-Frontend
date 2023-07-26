import { createSlice } from '@reduxjs/toolkit';

class User {
    constructor() {
        this.userSlice = createSlice({
            name: 'userInfo',
            initialState: {
                coCd:'',
                empId: '',
                empEmail: '',
            },
            reducers: {
                SET_USER: (state, action) => {
                    state.coCd = action.payload.coCd;
                    state.empId = action.payload.empId;
                    state.empEmail = action.payload.empEmail;
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
export const { SET_USER } = userManager.getActions();
export default userManager.getReducer();