import React from 'react';
import Login from './screen/Login'
import Edit from './screen/Edit';
// import SignUp from './screen/SignUp';
import Sinhvien from './screen/Sinhvien';
import Add from './screen/Add';
import Profile from './screen/Profile';
import Form from './screen/Com/Form';
import Home from './screen/Home';
import View from './screen/View';
import Gridview from './screen/Gridview';
// import {UserAuthContextProvider  } from './UserAuthContext';
import {  Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    // <UserAuthContextProvider>
     <Routes>
          <Route path='/gridview' element={<Gridview/>} />
          <Route path='/form' element ={<Form/>}/>
          <Route path='/profile' element ={<Profile/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path='/sinhvien' element={<Sinhvien/>}/>
          <Route path = '/view/:id' element ={<View/>} />
          <Route path='/edit/:id' element={<Edit/>}/>
          <Route path="/" exact element={<Login accesstoken={true} />} />
          <Route path='/home' element={<Home/>} />
      </Routes>
    // </UserAuthContextProvider>  
  )
}
export default App;

