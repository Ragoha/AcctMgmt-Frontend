import { createSlice } from '@reduxjs/toolkit';

class BgtCDStore{
    constructor(){
        //createSlice 를 이용하여 간단하게 redux 액션 생성자와 전체 슬라이스에 대한 reducer를 선언하여 사용할 수 있다.
        this.BgtCDStore=createSlice({
            name:'BgtCDStore',
            initialState:{
                groupcd : 'GROUP3',
                detailInfo_ctlFg:null,
                detailInfo_bgajustFg:null,
                detailInfo_bottomFg:null,
                detailInfo_bizFg:null,
                detailInfo_bgtCd:'GROUP3',
            },
            reducers:{
                SET_GROUPCD:(state, action)=>{
                    state.groupcd='GROUP3';
                },
                // groupcd :'GROUP3' ,
                SET_DETAILINFO: (state, action)=>{
                   state.groupcd=action.payload
                    //state.detailInfo_ctlFg="hiiiiiiiiii";
                    // state.detailInfo_bgajustFg=action.payload.bgajustFg;
                    // state.detailInfo_bottomFg=action.payload.bottomFg;
                    // state.detailInfo_bizFg=action.payload.bizFg;
                    // state.detailInfo_bgtCd=action.payload.bgtCd;
                },

            }
        });
    }
    getActions(){
        return this.BgtCDStore.actions;
    }
    getReducer(){
        return this.BgtCDStore.reducer;
    }
}
const BgtCDStoreManager = new BgtCDStore();
export const {SET_DETAILINFO , SET_GROUPCD} = BgtCDStoreManager.getActions();
export default BgtCDStoreManager.getReducer();