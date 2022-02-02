import React, { useEffect, useState, useRef, Suspense } from 'react';
import './App.css';
import GetUser from './Components/GetUser';
import Items from './Components/Items';
import PostUser from './Components/PostUser';
import ItemForm from './Components/ItemForm';
import axios from "axios";

/* Working frontend shop application that sends information to the
backend located on pythonanywhere.com using the selfmade Python Django Restframwork API

*/

//the navigation bar at the top of the window
function NavBar({ postClick, selfItems, createItem }) {
  return (
    <div className='bg-orange-800 shadow-lg'>
      <ul className='flex h-16 w-screen justify-center items-center shadow-lg'>
        <div className='ml-3 fixed left-0'>
          <NavText text="Nothing Shop" />
        </div>
        <div className='flex items-center justify-center space-x-6'>
          <NavText buttonPressed={postClick} text="Get Currency" />
          <CreateItem buttonPressed={createItem} />
          <NavText buttonPressed={selfItems} text="Order History" />
          <NavText buttonPressed={selfItems} text="Your Items" />
        </div>
      </ul>
    </div>
  )
}

//the create item button ( sends to createItem which reveals form which posts to api )
function CreateItem({ createItem }) {
  return (
    <div>
      <button onClick={createItem} className='nav-text'>Create Item</button>
      <ItemForm />
    </div>
  )
}

//generic button which recieves text and onclick and has uses tailwind from index.css
function NavText({ text, buttonPressed }) {
  return (
    <button onClick={buttonPressed} className='nav-text'>{text}</button>
  )
}

//the footer currently needs work
function Footer() {
  return (
    <div className='bg-gray-500 h-16 p-5 absolute inline-flex items-center justify-center inset-x-0 bottom-0'>About</div>
  )
}

function App() {
  //should open up form (currently on all the time)
  const createItem = () => {
    
  }

  //state of cart (currently only allows 1 fake item)
  const [cartInfo, setCartInfo] = useState({name: "Item Name",
  quantity: 10})

  //runs on change of cartInfo currently doesn't do anything
  useEffect(() => {

  }, [cartInfo]);

  //initial width of item grid depending on screensize ( has a tendency to break as of now )
  //the issue happends when intial state hasn't been set to that amount of columns
  var preWidth = Math.round((window.innerWidth)/300)
  if (preWidth >= 9) {
    preWidth = 8
  }
  const [itemsWindowTailwind, setItemsWindowTailwind] = useState('grid grid-cols-2')

  //recalculates grid of items when ran (runs from eventListener below) 
  const checkWindow = () => {
    var width = Math.round((window.innerWidth)/300)
    if (width >= 9) {
      width = 8
    }
    var height = Math.round((window.innerHeight-100)/300)
    setItemsWindowTailwind('h-fit w-6/6 grid grid-flow-row-dense grid-cols-'+ width +' grid-rows-' + height + ' justify-center')
  }

  //adds event listener to check resize onComponentMount(but as useEffect with empty checking array)
  useEffect(() => {
    window.addEventListener('resize', checkWindow)
  }, []);

  //state of userItems which is a toggle if user only wants to see their own items (boolean)
  const [userItems, setUserItems] = useState(false)

  //toggling to only see own items
  const selfItems = () => {
    if (userItems ? setUserItems(false) : setUserItems(true));
  }

  //gets all items, if selfItems boolean is on only gets user's items
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

  //gets current user information
  const [getCur, setGetCur] = React.useState(null);
  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/user/1/')
      .then((response) => {
        setGetCur(response.data)
      });
  }, []);

  //counter of how many puts have been sent to get more currency
  const [postCount, setPostCount] = useState(0)

  //useEffect that checks if user pressed to get more currency
  React.useEffect(() => {
    if (getCur) {
      axios.put("http://127.0.0.1:8000/user/1/", getCur)
        .then((response) => {
          setGetCur(response.data)
        });
    }
  }, [postCount]);

  //pressed get currency button
  const postClick = () => {
    setPostCount(postCount+1);
    setGetCur({ user_id: getCur.user_id, name: getCur.name, currency: getCur.currency + 100 });
  }

  //maps all items to the Component items to put on screen
  if (get) {
    var items = get.map(item => <Items key={item.item_id} className='col-span-1 grid-rows-1'
      name={item.name} description={item.description} price={item.price}>
    </Items>)
  }

  //if cart should be shown when pressing cart button
  const [cartToggled, setcartToggled] = useState(false);

  //cart button was pressed so change state of boolean
  const cartClicked = () => {
    cartToggled ? setcartToggled(false) : setcartToggled(true)
  }

  //the return of the entire app suspense is there for the 3d object(s) 
  return (
    <div className='h-screen w-screen font-sans text-black font-bold text-2xl bg-gray-800'>
      <Suspense fallback={null}>
        <div className='h-fit w-full mt-16 top-0 absolute flex items-center justify-center'>
          <div className={itemsWindowTailwind}>{/* the resizing part of the window that contains cols and rows of items */}
            <div className='col-span-1 grid-rows-2'>
              <GetUser getCur={getCur} className='col-span-1 grid-rows-1' cartClicked={cartClicked} cartToggled={cartToggled} cartInfo={cartInfo} setCartInfo={setCartInfo} />
              {/* GetUser contains the user info and cart info */}
            </div>
            {items}{/* contains all items that should be shown */}
          </div>
        </div>
        <NavBar postClick={postClick} selfItems={selfItems} createItem={createItem}></NavBar>{/* the navbar with all it's button presses */}
        <Footer />
      </Suspense>
    </div>
  );
}


export default App;
