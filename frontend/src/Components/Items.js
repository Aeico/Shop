import '../App.css';
import axios from "axios";
import React from "react";
import GetItem from './GetItem';

class Items extends React.Component {
    render() {
      return <div className='h-40 w-64 border-4 rounded-xl my-3 m-2.5 shadow-xl text-white text-lg border-orange-500 border-solid 
      hover:border-green-700 transition-all duration-300 ease-linear px-2'><GetItem></GetItem></div>
    }
}

export default Items;