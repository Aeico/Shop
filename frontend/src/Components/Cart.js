import '../App.css';
import React from "react";

export function Cart({ cartInfo, cartClassName }) {
    return (
      <div className={cartClassName}>
       <h1>{cartInfo.name}</h1>
       <p>{cartInfo.quantity}</p>
      </div>
    )
  }

export default Cart