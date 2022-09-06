import { Routes,Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
