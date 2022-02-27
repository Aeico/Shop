import axios from 'axios';
import React, { useEffect, useState } from 'react';


export function OrderHistory({ orderHistActive }) {
  const [orderData, setOrderData] = useState([])
  var user = 1
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/boughtitems/" + user + "/")
      .then((res) => {
        setOrderData(res.data);
      });
  }, [orderHistActive])

  var order_id;

  if (orderData !== undefined) {
    var newOrderData = [];
    var count = 0;
    orderData.forEach(data => {
      newOrderData[count] =
        <div className='grid w-96 grid-cols-5'>
          <p className='col-span-3'>{data.item_name}</p>
          <p>{data.quantity}</p>
          <p>{data.item_fk_id}</p>
        </div>
      count++;
    });
  }

  return (
    <div className='col-span-5 grid-cols-5 justify-center row-span-1 text-base '>
      <div className='col-span-5 grid w-96 grid-cols-5'>
        <p className='mx-5 col-span-3'>Name</p>
        <p className='mx-5 col-span-1'>Quantity</p>
        <p className='mx-5 col-span-1'>Item id</p>
      </div>
      <br></br>
      <p className='mx-5 col-span-1'>{order_id} {newOrderData}</p>

    </div>

  )
}

export default OrderHistory