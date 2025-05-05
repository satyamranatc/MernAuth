import React,{useState,useEffect} from 'react'
import axios from "axios"

export default function LogIn() {

  async function handleSubmit(e) {
    e.preventDefault();
    let Data = {
      username: e.target[0].value,
      password: e.target[1].value
    }
    let res = await axios.post("http://localhost:5500/api/login",Data)
    
    if(res.data.message == true)
    {
      localStorage.setItem("isLoggedIn",true)
      localStorage.setItem("user",JSON.stringify(res.data.user))
    }
    else
    {
      localStorage.setItem("isLoggedIn",false)
      localStorage.setItem("user",null)
    }
  }


  return (
    <div>

     <br />
     <br />

     <fieldset>
      <legend>Login Form</legend>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='UserName' name="" id="" />
        <input type="text" placeholder='Password' name="" id="" />
        <button>Login</button>
      </form>
     </fieldset>



    </div>
  )
}
