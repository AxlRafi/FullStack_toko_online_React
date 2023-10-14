import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Carts from "./pages/Cart";
import CartList from "./pages/CartList";
import AddToCart from "./pages/AddCart";
import EditCart from "./pages/EditCart";
import Sales from "./pages/Sales";

//jangan lupa import cart sama sales
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/carts" element={<Carts />} />
          <Route path="/carts/addlist" element={<CartList />} />
          <Route path="/carts/add/:id" element={<AddToCart />} />
          <Route path="/carts/edit/:id" element={<EditCart />} />
          <Route path="/sales" element={<Sales />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
