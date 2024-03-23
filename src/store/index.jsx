import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import ProductSlice from "./slices/ProductSlice";
import BrowseAuction from "../pages/BrowseAuction/BrowseAuction";
import BrowseSlice from "./slices/BrowseSlice";


const store=configureStore({

    reducer: {
        users: userSlice,
        productAuction: ProductSlice,
        viewAuction: BrowseSlice
    },
});

export default store;