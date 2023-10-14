import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const FormEditCart = () => {
  const [product_name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getCartById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/carts/${id}`);
        setName(response.data.product_name);
        setQty(response.data.qty);
        setPrice(response.data.price);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getCartById();
  }, [id]);

  useEffect(() => {
    const getCartById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/carts/${id}`);
        setName(response.data.product_name);
        setQty(response.data.qty);
        setPrice(response.data.price);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getCartById();
  }, [id]);

  const updateCarts = async (e) => {
    e.preventDefault();
    if (qty > 30) {
      setMsg("Quantity cannot exceed 30");
      return;
    }
    try {
      await axios.patch(`http://localhost:5000/carts/${id}`, {
        product_name: product_name,
        qty: qty,
        price: price,
      });
      navigate("/carts");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">{product_name}</h1>
      <h2 className="subtitle">Maks 30</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateCarts}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Qty</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    placeholder="Qty"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button
                    type="submit"
                    className="button is-success"
                    to={"/carts"}
                  >
                    Change
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormEditCart;
