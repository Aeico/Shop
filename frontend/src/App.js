import React, { useEffect, useState } from 'react';
import './App.css';
import GetUser from './Components/GetUser';
import Items from './Components/Items';

function NavBar() {
  return (
    <div className='bg-orange-800 shadow-lg'>
      <ul className='flex h-16 w-screen justify-center items-center shadow-lg'>
        <div className='ml-3 fixed left-0'>
          <NavText text="Nothing Shop" />
        </div>
        <div className='flex items-center justify-center space-x-6'>
          <NavText text="Buy" />
          <NavText text="Create Item" />
          <NavText text="Order History" />
          <NavText text="Your Items" />
        </div>
      </ul>
    </div>
  )
}

function NavText({ text }) {
  return (
    <li className='nav-text'>{text}</li>
  )
}

function Footer() {
  return (
    <div className='bg-gray-500 h-16 p-5 absolute inline-flex items-center justify-center inset-x-0 bottom-0'>About</div>
  )
}

function App() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = window.innerWidth;
  });

  return (
    <div className='h-screen w-screen font-sans text-black font-bold text-2xl bg-gray-800'>
      <div className='h-fit w-full mt-16 top-0 absolute'>
        <div className='h-fit w-6/6 grid grid-flow-row-dense grid-cols-8 grid-rows-6'>
          <div className='col-span-1 grid-rows-2'>
          <GetUser className='col-span-1' />
          </div>
          <Items className='col-span-1'></Items>
          <Items className='col-span-1'></Items>
          <Items className='col-span-1'></Items>
          <Items className='col-span-1'></Items>
          <Items className='col-span-1'></Items>
          <Items className='col-span-1'></Items>
          <Items className='col-span-1'></Items>
          <Items className='col-span-1'></Items>
        </div>
      </div>
      <NavBar></NavBar>
      <Footer />
    </div>
  );
}


export default App;
