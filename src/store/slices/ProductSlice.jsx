import { createSlice } from "@reduxjs/toolkit";

const initialState={
    productAuctionData:[{}
    ],
    searchedProduct:[{}], 
    categories:[{}]

}

const ProductSlice= createSlice({
name: "ProductSlice",
initialState:initialState,
reducers:{
    AddProduct: (state, action) =>{
       
        state.productAuctionData=action.payload; //login status in microreducer

        console.log("userrr logged in data reducererr", action.payload)
    }, //micro reducer
   
    EditProduct(state, action){
     
        // console.log("slicee",action.payload)
        // console.log("slicee id",action.payload.index)
      
         // Extract index and new data from action.payload
      const { index, newData } = action.payload;
    //   console.log("slicee newData",newData);
      // Check if the index is within the array bounds
      if (index >= 0 && index < state.productAuctionData.length) {
        // Directly update the item at the given index with the new data
        state.productAuctionData[index] = newData;
      } else {
      
        console.error('Index out of bounds');
      }

        }, DeleteProduct(state, action){

            // return state.filter((item, index) => index !== action.payload.index);
        }, SearchProduct(state, action){
          state.searchedProduct=action.payload

        },
        Customcategories:(state, action)=>{
          state.categories=action.payload



        }
   
},
});



export default ProductSlice.reducer;
export const {AddProduct, EditProduct, DeleteProduct, SearchProduct,Customcategories}=ProductSlice.actions;