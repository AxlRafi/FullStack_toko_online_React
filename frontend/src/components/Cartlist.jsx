import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CartList = () => {
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    getCarts();
  }, []);

  const getCarts = async () => {
    const response = await axios.get("http://localhost:5000/carts");
    setCarts(response.data);
  };

  const deleteCart = async (Id) => {
    await axios.delete(`http://localhost:5000/carts/${Id}`);
    getCarts();
  };

  const calculateTotal = () => {
    return carts.reduce((total, cart) => total + cart.qty * cart.price, 0);
  };

  const addSale = async (product_name, qty, price) => {
    try {
      await axios.post("http://localhost:5000/sales", {
        product_name: product_name,
        qty: qty,
        price: price,
        sum: qty * price,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const processSale = async () => {
    carts.map(
      (cart, index) => (
        addSale(cart.product_name, cart.qty, cart.price), deleteCart(cart.uuid)
      )
    );
  };
  return (
    <div>
      <h1 className="title">Carts</h1>
      <h2 className="subtitle">List of Carts</h2>
      <Link to="/carts/addlist" className="button is-primary mb-2">
        Add Item
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Sum</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {carts.map((cart, index) => (
            <tr key={cart.uuid}>
              <td>{index + 1}</td>
              <td>{cart.product_name}</td>
              <td>{cart.qty}</td>
              <td>{cart.price}</td>
              <td>{cart.qty * cart.price}</td>
              <td>{cart.user.name}</td>
              <td>
                <Link
                  to={`/carts/edit/${cart.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteCart(cart.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total</td>
            <td>{calculateTotal()}</td>
            <td colSpan="2"></td>
          </tr>
        </tfoot>
      </table>
      <button
        onClick={() => processSale()}
        className="button is-small is-primary mb-1"
      >
        Process Sales
      </button>
    </div>
  );
};

export default CartList;
