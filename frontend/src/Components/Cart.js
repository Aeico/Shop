import '../App.css';
import React from "react";

// provides a cart that as of now can have one item and increase and decrease quantity

export function Cart({ cartInfo, setCartInfo, cartClassName }) {

  const lowerQuantity = () => {
    setCartInfo({name: cartInfo.name, quantity: cartInfo.quantity -1})
  }

  const increaseQuantity = () => {
    setCartInfo({name: cartInfo.name, quantity: cartInfo.quantity +1})
  }
  return (
    <div className={cartClassName}>
      {cartInfo.name}
      <div className='justify-center'> <button onClick={lowerQuantity}>-</button>{cartInfo.quantity}<button onClick={increaseQuantity}>+</button></div>
    </div>
  )
}

export default Cart