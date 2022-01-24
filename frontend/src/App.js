import logo from './logo.svg';
import './App.css';
import GetUser from './Components/GetUser';

function Nav() {
 

  return (
    <span>stuff</span>
  )
}

function App() {
  return (
    <div className="App">
      <nav className="Nav"><Nav/></nav>
      <header className="App-header">
      <GetUser/>
      </header>
      <footer>
        
      </footer>
    </div>
  );
}


export default App;
