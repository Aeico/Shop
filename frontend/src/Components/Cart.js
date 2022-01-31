import '../App.css';
import React from "react";

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