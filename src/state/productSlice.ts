import { type PayloadAction, createSlice, } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";

import { RootState } from "../store/store";
import { fetchProductById, fetchProducts } from "../api/productApi";

interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
}


const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;

                //here I use fake data for available quantity of products. In real app, this would be a from backend
                state.items = action.payload.map((product) => ({ ...product, availableQuantity: Math.floor(Math.random() * 20) }));
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to load products";
            })

            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                const productExists = state.items.some((p) => p.id === action.payload.id);
                if (!productExists) {

                    //here I use fake data for available quantity of products. In real app, this would be a from backend
                    state.items.push({ ...action.payload, availableQuantity: Math.floor(Math.random() * 20) });
                }
            })
            .addCase(fetchProductById.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch product";
            });
    },
});

export const products = (state: RootState) => state.products

export const getProductById = (state: RootState, id: number) => state.products.items.find(product => product.id === id)

export { fetchProducts, fetchProductById };


export default productSlice.reducer;
