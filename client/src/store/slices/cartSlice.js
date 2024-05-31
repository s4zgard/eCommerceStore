import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const rounder = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((p) => p._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((p) => {
          if (p._id === existItem._id) {
            return existItem;
          }
          return p;
        });
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Items Price
      state.itemsPrice = rounder(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // Shipping Price
      state.shippingPrice = rounder(state.itemsPrice > 100 ? 0 : 10);

      // Tax Price
      state.taxPrice = rounder(Number((0.15 * state.itemsPrice).toFixed(2)));

      // Total Price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
