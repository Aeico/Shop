import '../App.css';
import axios from "axios";
import React, { Component, useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import Currency from './Currency';

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

  if (!get) return <p>Loading</p>;
  return (
    <div className='h-full w-full p-6 bg-orange-700 items-center text-3xl shadow-lg'>
      <p>Hello {get.name}!</p>
      <div className='pt-5 inline-flex'>Your
        <div className='w-16 h-16 inline-flex pb-3'>
          <Canvas camera={{ position: [0, 0, 1.5] }}>
            <ambientLight intensity={0.2} />
            <directionalLight color="blue" position={[0, 0, 5]}  />
            <Currency></Currency>
          </Canvas>
        </div>
        : {get.currency}
      </div>
    </div>
  )
}

export default GetUser;