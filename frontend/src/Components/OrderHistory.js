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

  var order_id;

  if (orderData !== undefined) {
    //order_id = orderData[0].order_fk_id;
    var orderDataInside = orderData.map(
      item => item.item_name  +", amount:"+ item.quantity +"  "+ item.item_fk_id 
      );
  }

  return (
    <div className='col-span-5 row-span-auto'>
      <p className='mx-5  text-base'>Name     Quantity     Item id     Order:{order_id} {orderDataInside}</p>
      
    </div>
  )
}

export default OrderHistory