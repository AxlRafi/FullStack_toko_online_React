import React, { useState, useEffect } from "react";
import axios from "axios";

const SalesList = () => {
  const [sales, setSales] = useState([]);
  useEffect(() => {
    getSales();
  }, []);

  const getSales = async () => {
    const response = await axios.get("http://localhost:5000/sales");
    setSales(response.data);
  };

  // Calculate the total sum
  const calculateTotal = () => {
    return sales.reduce((total, sales) => total + sales.sum, 0);
  };

  return (
    <div>
      <h1 className="title">Sales</h1>
      <h2 className="subtitle">List of Sales</h2>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sales, index) => (
            <tr key={sales.uuid}>
              <td>{index + 1}</td>
              <td>{sales.product_name}</td>
              <td>{sales.qty}</td>
              <td>{sales.price}</td>
              <td>{sales.sum}</td>
              <td></td>
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
    </div>
  );
};

export default SalesList;
