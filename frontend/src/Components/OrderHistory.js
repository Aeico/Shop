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
        <div className='grid w-96 grid-cols-5 '>
          <p className='col-span-3 border-black border-2'>{data.item_name}</p>
          <p className='border-black border-2'>{data.quantity}</p>
          <p className='border-black border-2'>{data.item_fk_id}</p>
        </div>
      count++;
    });
  }

  return (
    <div className='col-span-5 grid-cols-5 justify-center row-span-1 text-base '>
      <div className='col-span-5 grid w-96 grid-cols-5'>
        <p className='px-5 col-span-3 border-black border-2'>Name</p>
        <p className='px-5 col-span-1 border-black border-2'>Quantity</p>
        <p className='px-5 col-span-1 border-black border-2'>Item id</p>
      </div>
      <br></br>
      <p className='mx-5 col-span-1'>{order_id} {newOrderData}</p>

    </div>

  )
}

export default OrderHistory