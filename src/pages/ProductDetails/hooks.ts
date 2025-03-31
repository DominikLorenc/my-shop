import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/rtk";
import { fetchProductById, getProductById } from "../../state/productSlice";
import { updateQuantity } from "../../state/cartSlice";

export const useProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const product = useAppSelector((state) => getProductById(state, Number(id)));
    const loading = useAppSelector((state) => state.products.loading);
    const error = useAppSelector((state) => state.products.error);

    const [amount, setAmount] = useState<string>("1");
    const [errorQuantity, setErrorQuantity] = useState<string>("");

    useEffect(() => {
        if (!product && id) {
            dispatch(fetchProductById(Number(id)));
        }
    }, [id, product, dispatch]);

    const validateQuantity = (value: number) => {
        if (value < 1) {
            setErrorQuantity("Quantity must be at least 1");
            return "1";
        }

        if (product && value > product.availableQuantity) {
            setErrorQuantity("Quantity exceeds available stock");
            return String(product.availableQuantity);
        }

        setErrorQuantity("");
        return String(value);
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();

        if (value === "") {
            setAmount("");
            return;
        }

        if (/^\d+$/.test(value)) {
            setAmount(value);
        }
    };

    const handleOnBlur = () => {
        setAmount((prev) => validateQuantity(Number(prev) || 1));
    };

    const handleIncrement = () => {
        setAmount((prev) => validateQuantity(Number(prev) + 1));
    };

    const handleDecrement = () => {
        setAmount((prev) => validateQuantity(Number(prev) - 1));
    };



    const handleAddToCart = () => {

        if (!product || Number(amount) > product.availableQuantity) return;

        dispatch(updateQuantity({ product, quantity: Number(amount) }));
    };

    return {
        product,
        loading,
        error,
        amount,
        errorQuantity,
        handleOnChange,
        handleOnBlur,
        handleIncrement,
        handleDecrement,
        handleAddToCart,
    };
};
