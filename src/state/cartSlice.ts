import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import type { CartItem } from '../types/CartItem';
import type { Product } from '../types/Product';

interface CartState {
  items: CartItem[];
  showCart: boolean;
  cartError: string | null;
}

const initialState: CartState = {
  showCart: false,
  items: [],
  cartError: null,
};

const ERROR_MESSAGES = {
  exceededQuantity: "Exceeded available quantity",
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
    addToCart: (state, action: PayloadAction<Product | CartItem>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        if (state.items[index].amount >= action.payload.availableQuantity) {
          state.cartError = ERROR_MESSAGES.exceededQuantity
          return;
        }
        state.items[index].amount += 1;
      } else {
        state.items.push({ ...action.payload, amount: 1 });
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    clearCartError: (state) => {
      state.cartError = null;
    },
    decreaseAmount: (state, action: PayloadAction<number>) => {
      const cartItem = state.items.find((item) => item.id === action.payload);


      if (!cartItem) {
        return;
      }

      if (cartItem.amount <= 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        return;
      }

      state.items = state.items.map((item) =>
        item.id === action.payload ? { ...item, amount: cartItem.amount - 1 } : item
      );
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ product: Product | CartItem; quantity: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.product.id);



      if (item && item.amount + action.payload.quantity > action.payload.product.availableQuantity) {
        state.cartError = ERROR_MESSAGES.exceededQuantity;
        return;
      }

      state.cartError = null;

      if (!item) {
        const newItem = { ...action.payload.product, amount: action.payload.quantity };
        state.items.push(newItem);
      } else {
        item.amount += action.payload.quantity;
      }
    }
  },
});

export const { addToCart, clearCart, removeFromCart, decreaseAmount, toggleCart, updateQuantity, clearCartError } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectItemAmount = (state: RootState) =>
  state.cart.items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.amount;
  }, 0);
export const cartTotal = (state: RootState) =>
  state.cart.items.reduce((total, { price, amount }) => total + price * amount, 0);
export const isShowCart = (state: RootState) => state.cart.showCart;
export const cartError = (state: RootState) => state.cart.cartError;


export default cartSlice.reducer;
