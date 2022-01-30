import React, { useEffect, useState, useRef, Suspense } from 'react';
import './App.css';
import GetUser from './Components/GetUser';
import Items from './Components/Items';
import PostUser from './Components/PostUser';
import axios from "axios";

function NavBar({ postClick, selfItems }) {
  return (
    <div className='bg-orange-800 shadow-lg'>
      <ul className='flex h-16 w-screen justify-center items-center shadow-lg'>
        <div className='ml-3 fixed left-0'>
          <NavText text="Nothing Shop" />
        </div>
        <div className='flex items-center justify-center space-x-6'>
          <NavText postClick={postClick} text="Get Currency" />
          <NavText text="Create Item" />
          <NavText text="Order History" />
          <button onClick={selfItems} className='nav-text font-bold'>Your Items</button>
        </div>
      </ul>
    </div>
  )
}

function NavText({ text, postClick }) {
  return (
    <button onClick={postClick} className='nav-text font-bold'>{text}</button>
  )
}

function Footer() {
  return (
    <div className='bg-gray-500 h-16 p-5 absolute inline-flex items-center justify-center inset-x-0 bottom-0'>About</div>
  )
}

var cartInfo = {
  name: "Item Name",
  quantity: 1
}

function App() {
  const [userItems, setUserItems] = useState(false)

  const selfItems = () => {
    if (userItems ? setUserItems(false) : setUserItems(true));
  }

  const [get, setGet] = React.useState(null);
  React.useEffect(() => {
    if (!userItems) {
    axios.get('http://127.0.0.1:8000/item')
      .then((response) => {
        setGet(response.data)
      });
    } else {
      axios.get('http://127.0.0.1:8000/item/'+getCur.user_id+'/')
      .then((response) => {
        setGet(response.data)
      });
    }
  }, [userItems]);

  const [getCur, setGetCur] = React.useState(null);
  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/user/1/')
      .then((response) => {
        setGetCur(response.data)
      });
  }, []);

  const [postCount, setPostCount] = useState(0)

  React.useEffect(() => {
    if (getCur) {
      axios.put("http://127.0.0.1:8000/user/1/", getCur)
        .then((response) => {
          setGetCur(response.data)
        });
    }
  }, [postCount]);

  const postClick = () => {
    setPostCount(postCount+1);
    setGetCur({ user_id: getCur.user_id, name: getCur.name, currency: getCur.currency + 100 });
  }

  if (get) {
    var items = get.map(item => <Items key={item.item_id} className='col-span-1 grid-rows-1'
      name={item.name} description={item.description} price={item.price}>
    </Items>)
  }

  const [cartToggled, setcartToggled] = useState(false);

  const cartClicked = () => {
    cartToggled ? setcartToggled(false) : setcartToggled(true)
  }

  return (
    <div className='h-screen w-screen font-sans text-black font-bold text-2xl bg-gray-800'>
      <Suspense fallback={null}>
        <div className='h-fit w-full mt-16 top-0 absolute'>
          <div className='h-fit w-6/6 grid grid-flow-row-dense grid-cols-5 grid-rows-4 justify-center '> {/* Needs to dynamically adjust grids */}
            <div className='col-span-1 grid-rows-2'>
              <GetUser getCur={getCur} className='col-span-1 grid-rows-1' cartClicked={cartClicked} cartToggled={cartToggled} cartInfo={cartInfo} />
            </div>
            {items}
          </div>
        </div>
        <NavBar postClick={postClick} selfItems={selfItems}></NavBar>
        <Footer />
      </Suspense>
    </div>
  );
}


export default App;
