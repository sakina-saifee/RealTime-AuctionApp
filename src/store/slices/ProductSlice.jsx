import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoggedin:false,
    user:null,
}

const ProductSlice= createSlice({
name: "ProductSlice",
initialState:initialState,
reducers:{
    AddProduct: (state, action) =>{
        state.isLoggedin=true;
        state.user=action.payload; //login status in microreducer

        console.log("userrr logged in data", action.payload)
    }, //micro reducer
    logout: (state, action)=>{
        state.isLoggedin=false;
        state.user=null; //logout status in microreducer

        console.log("userrr logout", action.payload)
    }
   
},
});



export default ProductSlice.reducer;
export const {login, logout}=ProductSlice.actions;