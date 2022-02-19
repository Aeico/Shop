import axios from 'axios';
import React, { useEffect, useState } from 'react';


export function OrderHistory({orderHistActive}) {
  const [orderData, setOrderData] = useState([])
  var user = 1
  useEffect (() => {
    axios.get("http://127.0.0.1:8000/boughtitems/" + user + "/")
      .then((res) => {
        setOrderData(res.data);
        console.log(orderData)
      });
  }, [orderHistActive])

  var count = 0;
  if (orderData != undefined) {
    var orderDataInside = orderData.map(
      item =>"(item:"+ item.item_fk_id  +", quantity:"+ item.quantity +", order id:"+ item.order_fk_id + ") "
      );
  }

  return (
    <div>
      <h1 className='mx-5'>here: {orderDataInside}</h1>
    </div>
  )
}

export default OrderHistory