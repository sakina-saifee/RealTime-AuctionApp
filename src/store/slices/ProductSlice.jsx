import { createSlice } from "@reduxjs/toolkit";

const initialState={
    productAuctionData:{},

}

const ProductSlice= createSlice({
name: "ProductSlice",
initialState:initialState,
reducers:{
    AddProduct: (state, action) =>{
        // state.isLoggedin=true;
        state.productAuctionData=action.payload; //login status in microreducer

        console.log("userrr logged in data reducererr", action.payload)
    }, //micro reducer
    logout: (state, action)=>{
        state.isLoggedin=false;
        state.user=null; //logout status in microreducer

        console.log("userrr logout", action.payload)
    }
   
},
});



export default ProductSlice.reducer;
export const {AddProduct}=ProductSlice.actions;