import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import store from "./store";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ShippingPage from "./pages/ShippingPage";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import PaymentPage from "./pages/PaymentPage";
import PlaceorderPage from "./pages/PlaceorderPage";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersListPage from "./pages/admin/OrdersListPage";
import ProductsListPage from "./pages/admin/ProductsListPage";
import UsersListPage from "./pages/admin/UsersListPage";
import ProductEditPage from "./pages/admin/ProductEditPage";
import UserEditPage from "./pages/admin/UserEditPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/page/:pageNumber" element={<HomePage />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/sign-in" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/products" element={<ProductsListPage />} />
        <Route
          path="/admin/products/:pageNumber"
          element={<ProductsListPage />}
        />
        <Route
          path="/admin/product/edit/:productId"
          element={<ProductEditPage />}
        />
        <Route path="/admin/user/edit/:userId" element={<UserEditPage />} />
        <Route path="/admin/users" element={<UsersListPage />} />
        <Route path="/admin/orders" element={<OrdersListPage />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<PlaceorderPage />} />
        <Route path="/order/:orderId" element={<OrderPage />} />
      </Route>

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Route>
  )
);

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <Provider store={store}>
    <PayPalScriptProvider deferLoading={true}>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
