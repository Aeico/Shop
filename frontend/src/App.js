import React, { useEffect, useState, useRef, Suspense } from 'react';
import './App.css';
import UserInfo from './Components/UserInfo';
import Items from './Components/Items';
import PostUser from './Components/PostUser';
import { Canvas } from '@react-three/fiber'
import ItemForm from './Components/ItemForm';
import axios from "axios";
import FiberBackground from './Components/FiberBackground';
import OrderHistory from './Components/OrderHistory';

/* Working frontend shop application that sends information to the
backend located on pythonanywhere.com using the selfmade Python Django Restframwork API

*/

//the navigation bar at the top of the window
function NavBar({ postCurrencyClick, selfItems, createItem, formClassName, user, itemsBoolean, itemBooleanPress }) {
  

  return (
    <div className='bg-gradient-to-r from-grey-100 to-blue-500 shadow-lg'>
      <ul className='flex h-16 w-screen justify-center items-center shadow-lg'>
        <div className='ml-3 fixed left-0'>
          <h1 className='nav-text text-3xl'>Nothing Shop</h1>
        </div>
        <div className='flex items-center justify-center space-x-6'>
          <NavText buttonPressed={postCurrencyClick} text="Get Currency" />
          <CreateItem buttonPressed={createItem} formClassName={formClassName} user={user} />
          <NavText buttonPressed={itemBooleanPress} text={itemsBoolean ? "Order History" :  "Items"} />
          <NavText buttonPressed={selfItems} text="Your Items" />
        </div>
      </ul>
    </div>
  )
}

//the create item button ( sends to createItem which reveals form which posts to api )
function CreateItem({ buttonPressed, formClassName, user }) {
  return (
    <div>
      <button onClick={buttonPressed} className='nav-text'>Create Item</button>
      <ItemForm formClassName={formClassName} user={user} />
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
    <div className='backdrop-brightness-90 h-16 p-5 absolute inline-flex items-center justify-center inset-x-0 bottom-0'>About</div>
  )
}

function App() {
  //initial user state = 0 since aka no user
  const [user, setUser] = useState(1)

  //reload when user changed
  useEffect(() => {

  }, [user])

  //boolean for showing form
  const [itemFormVisible, setItemFormVisible] = useState(false);

  //sets form to visible or not
  const createItem = () => {
    if (itemFormVisible ? setItemFormVisible(false) : setItemFormVisible(true));
  }

  //classname String for form
  var formClassName = itemFormVisible ? 'z-30 relative transition-all scale-100' : 'z-30 relative transition-all  scale-0';

  //changes the classname string when itemFormVisible has been changed
  useEffect(() => {
    formClassName = itemFormVisible ? 'z-30 relative transition-all scale-100' : 'z-30 relative transition-all  scale-0';
  }, [itemFormVisible]);

  //state of cart (currently only allows 1 fake item)
  const [cartInfo, setCartInfo] = useState([])

  //force refresh when cartInfo changed
  useEffect(() => { }, [cartInfo]);

  //initial width of item grid depending on screensize ( has a tendency to break as of now )
  //the issue happends when intial state hasn't been set to that amount of columns
  var preWidth = Math.round((window.innerWidth) / 300)
  if (preWidth >= 9) {
    preWidth = 8
  }
  // + preWidth
  const [itemsWindowTailwind, setItemsWindowTailwind] = useState('right-0 w-5/6 h-full grid grid-cols-5 relative')

  //recalculates grid of items when ran (runs from eventListener below) 
  const checkWindow = () => {
    var width = Math.round((window.innerWidth) / 300)
    if (width >= 9) {
      width = 8
    }
    var height = Math.round((window.innerHeight - 100) / 300)
    setItemsWindowTailwind('right-0 h-fit w-5/6 grid grid-flow-row-dense grid-cols-' + width + ' grid-rows-' + height + ' justify-center')
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

  //gets all items, if selfItems boolean is true only gets user's own items
  const [get, setGet] = React.useState(null);
  React.useEffect(() => {
    if (!userItems) {
      axios.get('http://127.0.0.1:8000/item')
        .then((response) => {
          setGet(response.data)
        });
    } else {
      axios.get('http://127.0.0.1:8000/item/' + getCur.user_id + '/')
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
  const postCurrencyClick = () => {
    setPostCount(postCount + 1);
    setGetCur({ user_id: getCur.user_id, name: getCur.name, currency: getCur.currency + 1000 });
  }

  //pressed to buy item ignore if same as other
  const buyClicked = (props) => {
    var wasIn = false;
    cartInfo.map(element => {
      if (props.item_id === element.item_id) {
        wasIn = true;
        var notBoughtItem = element.item_id
      }
      return notBoughtItem;
    });
    if (!wasIn) {//If it wasn't found add it
      setCartInfo(cartInfo => [...cartInfo, {
        item_id: props.item_id,
        name: props.name,
        quantity: 1,
        price: props.price,
      }]);
    }
  }

  //maps all items to the Component items to put on screen
  if (get) {
    var items = get.map(item => <Items key={item.item_id} buyClicked={buyClicked} item_id={item.item_id} className='col-span-1 grid-rows-1'
      name={item.name} description={item.description} price={item.price}>
    </Items>)
  }


  //if cart should be shown when pressing cart button
  const [cartToggled, setcartToggled] = useState(false);

  //cart button was pressed so change state of boolean
  const cartClicked = () => {
    cartToggled ? setcartToggled(false) : setcartToggled(true)
  }

  const [orderHistActive, setOrderHistActive] = useState(false);
  var orderHist = <OrderHistory orderHistActive={orderHistActive}></OrderHistory>
  const [itemsBoolean, setItemsBoolean] = useState(false) 
  const itemBooleanPress = () => {
    itemsBoolean ? setItemsBoolean(false) : setItemsBoolean(true)
  }

  //the return of the entire app suspense is there for the 3d object(s) 
  return (
    <div className='h-screen w-screen font-sans text-black text-2xl bg-gray-800'>
      <div className='h-screen w-screen absolute bg-gradient-to-r from-cyan-500 to-blue-300'>
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 2] }}>
            <ambientLight intensity={0.2} />
            <directionalLight color="white" position={[0, 0, 5]} />
            <FiberBackground></FiberBackground>
          </Canvas>
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <div className='h-fit w-full mt-16 top-0 absolute flex'>
          <UserInfo getCur={getCur} className='h-full w-1/6 relative left-0'
            cartClicked={cartClicked} cartToggled={cartToggled} cartInfo={cartInfo} setCartInfo={setCartInfo} user={user} />
          <div className={itemsWindowTailwind}>{/* the resizing part of the window that contains cols and rows of items */}
            <div className='col-span-1 grid-rows-2'>
              {/* GetUser contains the user info and cart info */}
            </div>
            {itemsBoolean ? items : orderHist}{/* contains all items that should be shown */}
          </div>
          
        </div>
        <NavBar itemsBoolean={itemsBoolean} itemBooleanPress={itemBooleanPress}
          postCurrencyClick={postCurrencyClick} selfItems={selfItems} createItem={createItem} 
          formClassName={formClassName} user={user}></NavBar>{/* the navbar with all it's button presses */}
        <Footer />
      </Suspense>
    </div>
  );
}


export default App;
