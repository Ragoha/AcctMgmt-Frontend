import { createSlice } from '@reduxjs/toolkit';

class Config {
    constructor() {
        this.configSlice = createSlice({
            name: 'config',
            initialState: {
                configData: [], // 초기 상태에 빈 배열로 시작합니다.
            },
            reducers: {
                SET_CONFIG: (state, action) => {
                    const newData = action.payload;
                    // configData 배열에서 동일한 id를 가진 항목을 찾습니다.
                    const index = state.configData.findIndex(item => item.sysCd === newData.sysCd);
                    if (index !== -1) {
                        // 동일한 id를 가진 항목이 있으면 해당 항목을 업데이트합니다.
                        state.configData[index] = newData;
                    } else {
                        // 항목이 없으면 배열에 추가합니다.
                        state.configData.push(newData);
                    }
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