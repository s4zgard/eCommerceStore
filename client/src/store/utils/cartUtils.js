const rounder = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
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
  return state;
};
