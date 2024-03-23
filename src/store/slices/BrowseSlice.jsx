import { createSlice } from "@reduxjs/toolkit";

const initialState={
    auctionData:[{}
    ],
 

}

const BrowseSlice= createSlice({
name: "BrowseSlice",
initialState:initialState,
reducers:{
 DisplayAllAuction: (state, action) =>{
       
        state.auctionData=action.payload; //login status in microreducer

        console.log("all browse auction data", action.payload)
    }, //micro reducer
   
  
   
},
});



export default BrowseSlice.reducer;
export const {DisplayAllAuction}=BrowseSlice.actions;