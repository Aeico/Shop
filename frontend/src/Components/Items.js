import '../App.css';
import React from "react";
import { render } from '@react-three/fiber';
import { Component } from 'react';

//returns a div with all relevant information for the information recieved
export default class Items extends Component {
  render() {
    return (
      <div className='h-40 w-64 border-4 rounded-xl my-3 m-2.5 shadow-xl text-white text-lg border-orange-500 border-solid 
      hover:border-green-700 bg-gray-900 transition-all duration-300 ease-linear px-2 group'>
        <div>
          <p>{this.props.name}</p>
          <p>{this.props.description}</p>
          <div>Cost: {this.props.price}</div>
          <button onClick={this.props.buyClicked} className='buy-popup group-hover:scale-100'>Buy</button>
        </div>
      </div>
    )
  }
}