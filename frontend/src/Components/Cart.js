import '../App.css';
import React from "react";

export function Cart({ cartInfo, cartClassName }) {
    return (
      <div className={cartClassName + 'justify-center'}>
       {cartInfo.name} <br/> <button>-</button>{cartInfo.quantity}<button>+</button>
      </div>
    )
  }

export default Cart