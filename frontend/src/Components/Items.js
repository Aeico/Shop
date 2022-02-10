import '../App.css';
import React from "react";
import { render } from '@react-three/fiber';
import { Component } from 'react';

//returns a div with all relevant information for the information recieved
export default class Items extends Component {
  render() {
    return (
      <div className='h-40 w-64 relative border-2 rounded-xl my-3 m-2.5 shadow-xl text-black text-lg border-black border-solid 
      hover:border-white backdrop-blur-sm transition-all duration-300 ease-linear px-2 group z-10'>
        <div>
          <h1 className='font-semibold'>{this.props.name}</h1>
          <p className='font-normal'>{this.props.description}</p>
          <div className='font-normal'>Cost: {this.props.price}</div>
          <button onClick={(e) => this.props.buyClicked(this.props, e)} className='buy-popup group-hover:scale-100'>Buy</button>
        </div>
      </div>
    )
  }
}