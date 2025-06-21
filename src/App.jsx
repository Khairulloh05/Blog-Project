import { Routes, Route } from 'react-router-dom';

import './App.css';
import LoginForm from './Pages/LoginForm/LoginForm'
import Home from './Pages/Home/Home'
import AddPost from './Pages/AddPost/AddPost'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path='/Home' element={<Home/>}/>
      <Route path='/AddPost' element={<AddPost/>}/>
    </Routes>
  );
}

export default App;
