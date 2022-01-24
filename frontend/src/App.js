import './App.css';
import GetUser from './Components/GetUser';

function Nav() {
 

  return (
    <span>stuff</span>
  )
}

function App() {
  return (
    <div>
      <nav className="Nav"><Nav/></nav>
      <header className="App-header">
      <GetUser/>
      </header>
      <h1 className="text-blue-500 text-ellipsis text-center">
      Hello world!
      </h1>
      <footer>
        
      </footer>
    </div>
  );
}


export default App;
