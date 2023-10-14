// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// const FormAddToCart = () => {
//   const [name, setName] = useState("");
//   const [qty, setQty] = useState("");
//   const [price, setPrice] = useState("");
//   const [msg, setMsg] = useState("");
//   const navigate = useNavigate();
//   const { id } = useParams();
//   useEffect(() => {
//     const getCartById = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/carts/${id}`);
//         setName(response.data.name);
//         setQty(response.data.qty);
//         setPrice(response.data.price);
//       } catch (error) {
//         if (error.response) {
//           setMsg(error.response.data.msg);
//         }
//       }
//     };
//     getCartById();
//   }, [id]);
//   const saveCart = async (e) => {
//     e.preventDefault();
//     if (qty > 30) {
//       setMsg("Quantity cannot exceed 30");
//       return;
//     }
//     try {
//       await axios.post(`http://localhost:5000/carts/${id}`, {
//         name: name,
//         qty: qty,
//         price: price,
//       });
//       navigate("/carts");
//     } catch (error) {
//       if (error.response) {
//         setMsg(error.response.data.msg);
//       }
//     }
//   };
//   return (
//     <div>
//       <h1 className="title">{name}</h1>
//       <h2 className="subtitle">Maks 30</h2>
//       <div className="card is-shadowless">
//         <div className="card-content">
//           <div className="content">
//             <form onSubmit={saveCart}>
//               <p className="has-text-centered">{msg}</p>
//               <div className="field">
//                 <label className="label">Qty</label>
//                 <div className="control">
//                   <input
//                     type="text"
//                     className="input"
//                     value={qty}
//                     onChange={(e) => setQty(e.target.value)}
//                     placeholder="Qty"
//                   />
//                 </div>
//               </div>

//               <div className="field">
//                 <div className="control">
//                   <button
//                     type="submit"
//                     className="button is-success"
//                     to={"/carts"}
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default FormAddToCart;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const FormAddToCart = () => {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setName(response.data.name);
        setPrice(response.data.price);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const saveCart = async (e) => {
    e.preventDefault();
    if (qty > 30) {
      setMsg("Quantity cannot exceed 30");
      return;
    }
    try {
      await axios.post(`http://localhost:5000/carts`, {
        name: name,
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
      <h1 className="title">{name}</h1>
      <h2 className="subtitle">Add Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveCart}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Quantity</label>
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
                    Add
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
export default FormAddToCart;
