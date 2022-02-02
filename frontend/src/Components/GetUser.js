import '../App.css';
import axios from "axios";
import React from "react";
import { Canvas} from '@react-three/fiber'
import Currency from './Currency';
import Cart from './Cart';

//http://127.0.0.1:8000/user/1
//https://joakimjlsv.pythonanywhere.com/user/1/

/*the main class for user interface such as name, how much currency and the cart interface( defined in Cart.js )

*/

export function GetUser({ cartClicked, cartToggled, cartInfo, getCur, setCartInfo }) {
  var cartClassName = cartToggled ? 'cart-popup scale-100':'cart-popup scale-0'

  var cart = <Cart cartInfo={cartInfo} cartClassName={cartClassName} setCartInfo={setCartInfo}></Cart>

  if (!getCur) return <p>Loading</p>;
  return (
    <div className='h-full w-full p-6 bg-orange-700 items-center text-3xl shadow-lg'>
      <p>Hello {getCur.name}!</p>
      <div className='pt-5 inline-flex items-center'>Your
        <div className='w-20 h-20 inline-flex pt-1'>
          <Canvas camera={{ position: [0, 0, 2] }}>
            <ambientLight intensity={0.2} />
            <directionalLight color="white" position={[0, 0, 5]}  />
            <Currency />
          </Canvas>
        </div>
        : {getCur.currency}
      </div>
      <div className='group'>
        <button onClick={cartClicked} key={cartToggled} className='bg-gray-300 rounded-3xl p-2 font-bold'>Your cart</button>
        {cart}
      </div>
    </div>
  )
}

export default GetUser;