import axios from 'axios';
import React, { useEffect, useState } from 'react';


export function OrderHistory({orderHistActive}) {
  const [orderData, setOrderData] = useState([])
  var user = 1
  useEffect (() => {
    axios.get("http://127.0.0.1:8000/boughtitems/" + user + "/")
      .then((res) => {
        setOrderData(res.data);
      });
  }, [orderHistActive])

  if (orderData != undefined) {
    var orderDataInside = orderData.map(
      item => item.item_name  +", amount:"+ item.quantity +"  "+ item.order_fk_id +'\n'
      );
  }

  return (
    <div className='col-span-5 row-span-auto'>
      <p className='mx-5  text-base'>here: {orderDataInside}</p>
    </div>
  )
}

export default OrderHistory