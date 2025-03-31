import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }


    return response.json() as Promise<Product[]>;
});

export const fetchProductById = createAsyncThunk<Product, number>(
    "products/fetchProductById",
    async (id) => {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        return response.json();
    }
);