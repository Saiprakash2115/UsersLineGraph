import {Routes,Route,BrowserRouter } from 'react-router-dom';
import './App.css';
import Usershomepage from './components/Usershomepage';
import Loginpage from './components/Loginpage';
import Signuppage from './components/Signuppage';
import Adminhomepage from './components/Adminhomepage';
import Userviewhistory from './components/Userviewhistory';
import Linechart from './components/examplechart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path ="/Usershomepage" element={<Usershomepage/>}/>
          <Route path ="/Adminhomepage" element={<Adminhomepage/>}/>
          <Route path ="/Signuppage" element={<Signuppage/>}/>
          <Route path ="/Userviewhistory" element={<Userviewhistory/>}/>
          <Route path ="/Linechart" element={<Linechart/>}/>
          <Route path ="/" element={<Loginpage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
