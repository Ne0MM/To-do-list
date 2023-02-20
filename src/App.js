import './App.css';
import Header from './Components/Header';
import MainBody from './Components/MainBody';
import SideNav from './Components/SideNav';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='bodyContainer'>
        <SideNav/>
        <MainBody/>
      </div>
    </div>
  );
}

export default App;
