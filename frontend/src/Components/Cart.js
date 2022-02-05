import '../App.css';
import React from "react";

// provides a cart that as of now can have one item and increase and decrease quantity

export function Cart({ cartInfo, setCartInfo }) {
  const lowerQuantity = (item) => {
    var newCart = cartInfo
    newCart.map(mapItem => {
      if (mapItem.item_id == item.item_id) {
        mapItem.quantity -= 1;
      }
    })
    setCartInfo(newCart)
  }

  const increaseQuantity = (item) => {
    var newCart = cartInfo
    newCart.map(mapItem => {
      if (mapItem.item_id == item.item_id) {
        mapItem.quantity += 1;
      }
    })
    setCartInfo(newCart)
  }

  var cartItems = cartInfo.map(item =>
    <div key={item.item_id}>
      <h2>{item.name}</h2>
      <div className='justify-center'> <button onClick={(e) => lowerQuantity(item, e)}>-</button>{item.quantity}<button onClick={(e) => increaseQuantity(item, e)}>+</button></div>
    </div>)
  return (
    cartItems
  )
}

export default Cart