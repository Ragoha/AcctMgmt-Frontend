import { createSlice } from "@reduxjs/toolkit";

class User {
  constructor() {
    this.userSlice = createSlice({
      name: "userInfo",
      initialState: {
        coCd: "", //회사코드
        coNm: "", //회사이름
        empId: "", //아이디
        empEmail: "", //이메일
        empName: "", //이름
        empSx: "", //성별
        empAuth: "", //권한
        empCd: "", //사원코드
        divCd: "", //사업장코드
        deptOd: "", //부서코드
      },
      reducers: {
        SET_USER: (state, action) => {
          state.coCd = action.payload.coCd;
          state.coNm = action.payload.coNm;
          state.empId = action.payload.empId;
          state.empEmail = action.payload.empEmail;
          state.divCd = action.payload.divCd;
          state.deptOd = action.payload.deptOd;
          state.empName = action.payload.empName;
          state.empSx = action.payload.empSxt;
          state.empAuth = action.payload.empAuth;
          state.empCd = action.payload.empCd;
        },
        DEL_USER: (state) => {
          state.coCd = null;
          state.coNm = null;
          state.empId = null;
          state.empEmail = null;
          state.divCd = null;
          state.deptOd = null;
          state.empName = null;
          state.empSx = null;
          state.empAuth = null;
          state.empCd = null;
        },
      },
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
