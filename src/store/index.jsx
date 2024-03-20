import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import ProductSlice from "./slices/ProductSlice";


const store=configureStore({

    reducer: {
        users: userSlice,
        productAuction: ProductSlice,
    },
});

export default store;