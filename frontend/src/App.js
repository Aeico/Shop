import React, { useEffect, useLayoutEffect, useState, useRef, Suspense } from 'react';
import './App.css';
import GetUser from './Components/GetUser';
import Items from './Components/Items';
import PostUser from './Components/PostUser';
import axios from "axios";

function NavBar() {
  return (
    <div className='bg-orange-800 shadow-lg'>
      <ul className='flex h-16 w-screen justify-center items-center shadow-lg'>
        <div className='ml-3 fixed left-0'>
          <NavText text="Nothing Shop" />
        </div>
        <div className='flex items-center justify-center space-x-6'>
          <NavText text="Get Currency" />
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
    //onClick={(e) => PostUser(GetUser.get.user_id, GetUser.get.name, GetUser.get.currency)}
    <button  className='nav-text font-bold'>{text}</button>
  )
}

function Footer() {
  return (
    <div className='bg-gray-500 h-16 p-5 absolute inline-flex items-center justify-center inset-x-0 bottom-0'>About</div>
  )
}

function App() {

  const [get, setGet] = React.useState(null);
  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/item')
      .then((response) => {
        setGet(response.data)
      });
  }, []);
  const itemIndex = 0;

  if (get) {
  var items = get.map(item => <Items key={item.item_id} className='col-span-1 grid-rows-1'
  name={item.name} description={item.description} price={item.price}>
  </Items>)
  }

  useEffect(() => {
    document.title = window.innerWidth;
    console.log(window.innerWidth);
  });

  return (
    <div className='h-screen w-screen font-sans text-black font-bold text-2xl bg-gray-800'>
      <Suspense fallback={null}>
        <div className='h-fit w-full mt-16 top-0 absolute'>
          <div className='h-fit w-6/6 grid grid-flow-row-dense grid-cols-5 grid-rows-4 justify-center '> {/* Needs to dynamically adjust grids */}
            <div className='col-span-1 grid-rows-2'>
              <GetUser className='col-span-1 grid-rows-1' />
            </div>
            {items}
          </div>
        </div>
        <NavBar></NavBar>
        <Footer />
      </Suspense>
    </div>
  );
}


export default App;
