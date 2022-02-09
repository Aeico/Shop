import '../App.css';
import React from "react";

// provides a cart that as of now can have one item and increase and decrease quantity

export function Cart({ cartInfo, setCartInfo }) {
  const lowerQuantity = (item) => {
    const newCart = [...cartInfo]
    newCart.map(mapItem => {
      if (mapItem.quantity > 1) {
        if (mapItem.item_id === item.item_id) {
          mapItem.quantity -= 1;
        }
      }
    })
    setCartInfo(newCart)
  }

  const increaseQuantity = (item) => {
    const newCart = [...cartInfo]
    newCart.map(mapItem => {
      if (mapItem.item_id === item.item_id) {
        mapItem.quantity += 1;
      }
    })
    setCartInfo(newCart)
  }

  const remove = (item) => {
    const newCart = [...cartInfo]
    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].item_id === item.item_id) {
        newCart.splice(i, 1)
      }
    }
    setCartInfo(newCart)
  }

  const buyClicked = () => {
    console.log("hi")
  }

  var cartItems = cartInfo.map(item =>
    <div key={item.item_id}>
      <h2>{item.name}</h2>
      <div className='justify-center font-normal'>
        <button onClick={(e) => lowerQuantity(item, e)}>-</button>{item.quantity}
        <button onClick={(e) => increaseQuantity(item, e)}>+</button>
        <button className='absolute right-0 mr-3' title={'Remove ' + item.name} onClick={(e) => remove(item, e)}>X</button></div>
        
    </div>)
  return (
    <div className='h-fit w-fit'>
      {cartItems}
      <button onClick={buyClicked}>Purchase</button>
    </div>
  )
}

export default Cart