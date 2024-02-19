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
        },
        addBill(state,action){
            state.billList.push(action.payload);
        }
    }
})

const billReducer=billStore.reducer

const {setBillList,addBill}=billStore.actions

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

const addBillList=(data)=>{
    return async(dispatch)=>{
        await axios.post('http://localhost:8888/ka',data);
        // console.log(res,res.data);
        dispatch(addBill(data));
}
}

export {setBillList,getBillList,addBillList}

export default billReducer