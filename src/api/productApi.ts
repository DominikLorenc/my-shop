import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

export const fetchProducts = createAsyncThunk<Product[], void>(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("https://fakestoreapi.com/products");

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
        }
    }
);

export const fetchProductById = createAsyncThunk<Product, number>(
    "products/fetchProductById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);

            if (!response.ok) {
                throw new Error("Failed to fetch product");
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
        }
    }
);