import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";



export const store = configureStore({
  reducer: {
    products: productReducer,
    cart : cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export type RootState = ReturnType<typeof store.getState>

