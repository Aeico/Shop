import './App.css';
import GetUser from './Components/GetUser';

function NavBar() {
  return (
    <div className='bg-orange-800 shadow-lg'>
      <ul className='flex h-16 w-50  justify-center  items-center 
      shadow-lg'>
        <div className='ml-3 fixed left-0'>
          <NavText text="Nothing Shop" />
        </div>
        <div className='flex items-center justify-center space-x-6 w-50'>
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
    <div className='bg-gray-200 h-10 flex items-center justify-center'>About</div>
  )
}

function App() {
  return (
    <div className='font-sans text-black font-bold text-2xl'>
      <header>
        <NavBar></NavBar>
      </header>
      <body className='w-screen h-screen'>
        <GetUser />
        <Footer />
      </body>
    </div>
  );
}


export default App;
