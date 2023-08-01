import { createSlice } from '@reduxjs/toolkit';

class Config {
    constructor() {
        this.configSlice = createSlice({
            name: 'config',
            initialState: {
                //SysCfg(coCd=1000, moCd=bn, sysCd=1, sysNm=예산관리구분, sysYn=1, modifyId=yhy0704, modifyDt=Tue Aug 01 10:52:25 KST 2023, modifyIp=126.18.33.2)
                configData: [], // 초기 상태에 빈 배열로 시작합니다.
            },
            reducers: {
                SET_CONFIG: (state, action) => {
                    const dataList = action.payload;
                    state.configData = dataList;
                },
                DEL_CONFIG: (state) => {
                    state.configData = [];
                },
            }
        });
    }
    getActions() {
        return this.configSlice.actions;
    }

    getReducer() {
        return this.configSlice.reducer;
    }
}
const configManager = new Config();
export const { SET_CONFIG, DEL_CONFIG } = configManager.getActions();
export default configManager.getReducer();