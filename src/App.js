import React from 'react';
import Login from './screen/Login'
import Edit from './screen/Edit';
import SignUp from './screen/SignUp';
import Sinhvien from './screen/Sinhvien';
import Add from './screen/Add';
import Profile from './screen/Profile';
// import multilform from './screen/multilform';
import View from './screen/View';

// import {UserAuthContextProvider  } from './UserAuthContext';
import {  Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    // <UserAuthContextProvider>
     <Routes>
          {/* <Route path='/searchpage' element={<SearchPage/>}/>
          <Route path='/search' element={<Search/>}/> */}
          <Route path='/profile' element ={<Profile/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path='/sinhvien' element={<Sinhvien/>}/>
          <Route path = '/view/:id' element ={<View/>} />
          <Route path='/edit/:id' element={<Edit/>}/>
          <Route path="/" exact element={<Login accesstoken={true} />} />
          {/* <Route path='/' element={<Login/>} /> */}
          <Route path='/signup' element={<SignUp/>} />
          {/* <Route path='/multi' element={<multilform/>} /> */}
      </Routes>
    // </UserAuthContextProvider>  
  )
}
export default App;

