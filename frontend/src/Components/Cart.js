import '../App.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';

// provides a cart that as of now can have one item and increase and decrease quantity

export function Cart({ cartInfo, setCartInfo, user }) {
  const lowerQuantity = (item) => {
    const newCart = [...cartInfo]
    newCart.map(mapItem => {
      if (mapItem.quantity > 1) {
        if (mapItem.item_id === item.item_id) {
          mapItem.quantity -= 1;
        }
      }
    })
    setCartInfo(newCart);
  }

  const increaseQuantity = (item) => {
    const newCart = [...cartInfo]
    newCart.map(mapItem => {
      if (mapItem.item_id === item.item_id) {
        mapItem.quantity += 1;
      }
    })
    setCartInfo(newCart);
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

  const [totalCost, setTotalCost] = useState(0)

  useEffect (() => {
    var cost = 0;
    cartInfo.map(mapItem => {
      cost += mapItem.price * mapItem.quantity;
    })
    setTotalCost(cost);
  },[cartInfo])

  const buyClicked = () => {
    axios.post("http://127.0.0.1:8000/buy/" + user +"/", cartInfo)
    .then(res => {
    });
  }

  var cartItems = cartInfo.map(item =>
    <div key={item.item_id}>
      {item.name}
      <div className='text-lg justify-center flex font-lg font-bold'>
        <div>
        <button onClick={(e) => lowerQuantity(item, e)}>-</button>
        {item.quantity}
        <button onClick={(e) => increaseQuantity(item, e)}>+</button>
        </div>
        <button className='absolute right-0 mr-3' title={'Remove ' + item.name} onClick={(e) => remove(item, e)}>X</button></div>
    </div>)
  return (
    <div className='h-fit w-fit'>
      {cartItems}
      <button onClick={buyClicked}>Purchase for: {totalCost}</button>
    </div>
  )
}

export default Cart