import '../App.css';
import axios from "axios";
import React, { Component, useState, useRef, Suspense } from "react";


//http://127.0.0.1:8000/user/1
//https://joakimjlsv.pythonanywhere.com/user/1/

export function GetItem() {
  const [get, setGet] = React.useState(null);
  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/item')
      .then((response) => {
        setGet(response.data)
      });
  }, []);

  console.log(get)
  if (!get) return <p>Loading</p>;
  var first = get[0];

  return (
    <div>
      <p>id {first.item_id}</p>
      <p>author {first.author_fk}</p>
      <p>name {first.name}</p>
      <p>desc {first.description}</p>
      <p>price {first.price}</p>
    </div>
  )
}

export default GetItem;