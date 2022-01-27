import '../App.css';
import React from "react";

export function Items({ name, description, price}) {
  return( <div className='h-40 w-64 border-4 rounded-xl my-3 m-2.5 shadow-xl text-white text-lg border-orange-500 border-solid 
      hover:border-green-700 bg-gray-900 transition-all duration-300 ease-linear px-2 group'>
        <div>
          <p>{name}</p>
          <p>{description}</p>
          <div>Cost: {price}</div>
          <button className='buy-popup group-hover:scale-100'>Buy</button>
        </div>
      </div>
      ) 
}

export default Items;