import '../App.css';
import axios from "axios";
import React from "react";
import { Canvas } from '@react-three/fiber'
import Currency from './Currency';
import Cart from './Cart';

//http://127.0.0.1:8000/user/1
//https://joakimjlsv.pythonanywhere.com/user/1/

/*the main class for user interface such as name, how much currency and the cart interface( defined in Cart.js )

*/

export function GetUser({ cartClicked, cartToggled, cartInfo, getCur, setCartInfo, user }) {
  var cartClassName = cartToggled ? 'cart-popup scale-100' : 'cart-popup scale-0'

  var cart = <Cart cartInfo={cartInfo} cartClassName={cartClassName} setCartInfo={setCartInfo} user={user}></Cart>

  if (!getCur) return <p>Loading</p>;
  return (
    <div className='left-0 h-full w-1/6 p-6 bg-inherit items-center text-3xl font-normal'>
      <p>Hello {getCur.name}!</p>
      <div className='pt-5 inline-flex items-center'>Your
        <div className='w-20 h-20 inline-flex pt-1'>
          <Canvas camera={{ position: [0, 0, 2] }}>
            <ambientLight intensity={0.2} />
            <directionalLight color="white" position={[0, 0, 5]} />
            <Currency />
          </Canvas>
        </div>
        : {getCur.currency}
      </div>
      <div className='group z-30 relative'>
        <button onClick={cartClicked} key={cartToggled} className='bg-gray-300 rounded-3xl p-2 font-bold'>Your cart</button>
        <div className={cartClassName}>
          {cart}
        </div>
      </div>
    </div>
  )
}

export default GetUser;