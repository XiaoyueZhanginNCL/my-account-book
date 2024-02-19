import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Bill list

const billStore=createSlice({
    name:'bill',
    initialState:{
        billList:[]
    },
    reducers:{
        setBillList(state,action){
            state.billList=action.payload;
        }
    }
})

const billReducer=billStore.reducer

const {setBillList}=billStore.actions
const getBillList=()=>{
    return async(dispatch)=>{
        try {
            const res = await axios.get('http://localhost:8888/ka');
            dispatch(setBillList(res.data));
        } catch (error) {
            console.error("Error fetching bill list:", error);
        
    }
}
}

export {setBillList,getBillList}

export default billReducer