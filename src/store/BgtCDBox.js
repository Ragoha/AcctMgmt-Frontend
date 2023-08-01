import { createSlice } from '@reduxjs/toolkit';

class BgtCDBox{
    constructor(){
        //createSlice 를 이용하여 간단하게 redux 액션 생성자와 전체 슬라이스에 대한 reducer를 선언하여 사용할 수 있다.
        this.bgtCDdata=createSlice({
            name:'boxData',

            initialState:{
                kimChiBox : 'Reaper',
                kimChiBox2: 'gunslinger',
                youSuc:true,
                dbShow:null,
            },
            reducers:{
                set_kimChiBox: (state, action)=>{
                    state.kimChiBox='ohKimchi';
                    state.kimChiBox2='lolol';
                 
                },

                kimChiNullBox:(state, action)=>{
                    state.kimChiBox='Blade';
                    state.youSuc=false;
                    state.dbShow=action.payload;
                }

            }
        });
    }
    getActions(){
        return this.bgtCDdata.actions;
    }
    getReducer(){
        return this.bgtCDdata.reducer;
    }
}
const BoxManager = new BgtCDBox();
export const{set_kimChiBox, kimChiNullBox} = BoxManager.getActions();
export default BoxManager.getReducer();