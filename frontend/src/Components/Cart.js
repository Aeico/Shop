import '../App.css';
import React from "react";

// provides a cart that as of now can have one item and increase and decrease quantity

export function Cart({ cartInfo, setCartInfo }) {
  const lowerQuantity = () => {
    setCartInfo({ name: cartInfo.name, quantity: cartInfo.quantity - 1 })
  }

  const increaseQuantity = () => {
    setCartInfo({ name: cartInfo.name, quantity: cartInfo.quantity + 1 })
  }

  var cartItems = cartInfo.map(item =>
    <div key={item.item_id}>
      <h2>{item.name}</h2>
      <div className='justify-center'> <button onClick={lowerQuantity}>-</button>{item.quantity}<button onClick={increaseQuantity}>+</button></div>
    </div>)
  return (
    cartItems
  )
}

export default Cart