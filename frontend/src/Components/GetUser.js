import '../App.css';
import axios from "axios";
import React, { Component } from "react";

//http://127.0.0.1:8000/user/1
//https://joakimjlsv.pythonanywhere.com/user/1/

export function GetUser() {
  const [get, setGet] = React.useState(null);
  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/user/1')
      .then((response) => {
        setGet(response.data)
      });
  }, []);

  if (!get) return null;
  return (
    <div className='h-fit pl-6 pr-3 bg-orange-700 pt-4'>
      <p>Hello {get.name}!</p>
      <p className='pt-3'>Your "Nothings": {get.currency}</p>
    </div>
  )
}

export default GetUser;