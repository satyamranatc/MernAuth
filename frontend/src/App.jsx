import React, { useEffect,useState } from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"



import NavBar from "./Components/NavBar.jsx"

import Home from "./Pages/Home.jsx"
import Blog from "./Pages/Blog.jsx"

import Login from "./Components/LogIn.jsx"
import SignUp from "./Components/SignUp.jsx"


export default function App() {

  let[IsLoggedIn,setIsLoggedIn] = useState(false)


  useEffect(()=>{
    setIsLoggedIn(localStorage.getItem("isLoggedIn"))

  })
  return (
    <div>

      <BrowserRouter>
      <NavBar/>

        <Routes>
          <Route path='/' element = {<Home/>} />
          <Route path='/Blog' element = {
            IsLoggedIn?<Blog/>:<Login/>
          } />
          <Route path='/Login' element = {<Login/>} />
          <Route path='/Signup' element = {<SignUp/>} />

        </Routes>
      </BrowserRouter>

    </div>
  )
}
